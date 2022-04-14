import {
  getConversionRate,
  getLoansInfo,
  getOraclePrices,
  getPoolInfo,
  getTokenPairInfo,
  TestnetOracle,
  TestnetTokenPairs,
} from "folks-finance-js-sdk/src";
import { indexerClient } from "@/utils/config";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default async function handler(req, res) {
  const oracle = TestnetOracle;
  let pairUsers = [];
  let loanUsers = [];
  for (let pairName in TestnetTokenPairs) {
    console.log(pairName);
    let pairUserList = [];
    const tokenPair = TestnetTokenPairs[pairName];
    const { collateralPool, borrowPool } = tokenPair;

    // get conversion rate
    const oraclePrices = await getOraclePrices(indexerClient, oracle, [
      collateralPool.assetId,
      borrowPool.assetId,
    ]);
    const conversionRate = getConversionRate(
      oraclePrices.prices[collateralPool.assetId].price,
      oraclePrices.prices[borrowPool.assetId].price
    );
    // get collateral pool and token pair info
    const collateralPoolInfo = await getPoolInfo(indexerClient, collateralPool);
    const borrowPoolInfo = await getPoolInfo(indexerClient, borrowPool);
    const tokenPairInfo = await getTokenPairInfo(indexerClient, tokenPair);

    // loop through escrows
    let loansInfo = await getLoansInfo(
      indexerClient,
      tokenPair,
      tokenPairInfo,
      collateralPoolInfo,
      borrowPoolInfo,
      conversionRate
    );
    let nextToken = loansInfo.nextToken;

    for (let loan of loansInfo.loans) {
      loanUsers.findIndex((entry) => entry == loan.userAddress) === -1 &&
        loanUsers.push(loan.userAddress);
      pairUserList.findIndex((entry) => entry == loan.userAddress) === -1 &&
        pairUserList.push(loan.userAddress);
    }

    while (nextToken !== undefined) {
      // sleep for 0.1 seconds to prevent hitting request limit
      await sleep(100);

      // next loop of escrows
      loansInfo = await getLoansInfo(
        indexerClient,
        tokenPair,
        tokenPairInfo,
        collateralPoolInfo,
        borrowPoolInfo,
        conversionRate,
        nextToken
      );
      // loans = loansInfo.loans;
      nextToken = loansInfo.nextToken;

      for (let loan of loansInfo.loans) {
        loanUsers.findIndex((entry) => entry == loan.userAddress) === -1 &&
          loanUsers.push(loan.userAddress);
        pairUserList.findIndex((entry) => entry == loan.userAddress) === -1 &&
          pairUserList.push(loan.userAddress);
      }
    }
    pairUsers.push({ pairName, borrowers: pairUserList.length });
  }
  res.status(200).json({
    totalBorrowers: loanUsers.length,
    pairs: pairUsers,
  });
}
