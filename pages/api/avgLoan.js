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
  let total = BigInt(0);
  for (let loan of loansInfo.loans) {
    total += loan.collateralBalance;
  }
  console.log(total);
  res.status(200).json({ message: JSON.stringify(loansInfo) });
}
