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

export default async function handler(req, res) {
  const oracle = TestnetOracle;
  let pairLoans = [];
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

    let loanCount = 0;
    loanCount += loansInfo.loans.length;

    while (nextToken !== undefined) {
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
      nextToken = loansInfo.nextToken;
      loanCount += loansInfo.loans.length;
    }
    totalLoanCount += loanCount;
    pairLoans.push({
      pairName,
      loanCount,
    });
  }
  res.status(200).json({
    totalLoanCount,
    pairs: pairLoans,
  });
}
