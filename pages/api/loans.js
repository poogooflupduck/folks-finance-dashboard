import { SuggestedParams, waitForConfirmation } from "algosdk";
import {
  getConversionRate,
  getLoansInfo,
  getOraclePrices,
  getPoolInfo,
  getTokenPairInfo,
  LoanInfo,
  Oracle,
  prepareLiquidateTransactions,
  ReserveAddress,
  TestnetOracle,
  TestnetReserveAddress,
  TestnetTokenPairs,
  TestnetPools,
  TokenPair,
} from "folks-finance-js-sdk/src";
import { algodClient, indexerClient, sender } from "@/utils/config";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default async function handler(req, res) {
  const oracle = TestnetOracle;

  let pairLoans = [];
  let loanUsers = [];
  let totalLoanCount = 0;
  for (let pairName in TestnetTokenPairs) {
    console.log(pairName);
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

    let totalBorrows = BigInt(0);
    let loanCount = 0;
    for (let loan of loansInfo.loans) {
      totalBorrows += loan.borrowBalance;
      loanCount += 1;
      loanUsers.findIndex((entry) => entry == loan.userAddress) === -1 &&
        loanUsers.push(loan.userAddress);
    }

    console.log(loansInfo.loans[0]);

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
        totalBorrows += loan.borrowBalance;
        loanCount += 1;
      }
    }
    let avgPosition = Number(totalBorrows) / loanCount;
    totalLoanCount += loanCount;
    pairLoans.push({
      pairName,
      totalBorrows,
      loanCount,
      avgPosition,
    });
  }
  res
    .status(200)
    .json({
      totalBorrowers: loanUsers.length,
      totalLoanCount,
      pairs: pairLoans,
    });
}
