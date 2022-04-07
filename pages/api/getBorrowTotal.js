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

export default async function handler(req, res) {
  const oracle = TestnetOracle;
  const tokenPair = TestnetTokenPairs["ALGO-USDC"];
  const reserveAddress = TestnetReserveAddress;
  const { collateralPool, borrowPool } = tokenPair;

  // get conversion rate
  const oraclePrices = await getOraclePrices(indexerClient, oracle, [
    collateralPool.assetId,
    borrowPool.assetId,
  ]);

  console.log(oraclePrices);

  console.log(TestnetPools);
  const conversionRate = getConversionRate(
    oraclePrices.prices[collateralPool.assetId].price,
    oraclePrices.prices[borrowPool.assetId].price
  );

  // get collateral pool and token pair info
  const collateralPoolInfo = await getPoolInfo(indexerClient, collateralPool);
  const borrowPoolInfo = await getPoolInfo(indexerClient, borrowPool);
  const tokenPairInfo = await getTokenPairInfo(indexerClient, tokenPair);

  // retrieve params
  const params = await algodClient.getTransactionParams().do();

  // loop through escrows
  let loansInfo = await getLoansInfo(
    indexerClient,
    tokenPair,
    tokenPairInfo,
    collateralPoolInfo,
    borrowPoolInfo,
    conversionRate
  );
  let loans = loansInfo.loans;
  let nextToken = loansInfo.nextToken;
  console.log(collateralPoolInfo);
  res.status(200).json({ message: collateralPoolInfo });
}
