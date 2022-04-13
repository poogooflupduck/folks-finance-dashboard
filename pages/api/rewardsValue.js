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
  getRewardsAggregatorInfo,
} from "folks-finance-js-sdk/src";
import { algodClient, indexerClient, sender } from "@/utils/config";

export default async function handler(req, res) {
  const oracle = TestnetOracle;
  let allRewardsInfo = [];
  let totalRewardsValue = 0;

  for (let poolName in TestnetPools) {
    console.log(poolName);
    try {
      let rew = await getRewardsAggregatorInfo(
        indexerClient,
        TestnetPools[poolName].appId
      );
      const oraclePrices = await getOraclePrices(indexerClient, oracle, [
        TestnetPools[poolName].assetId,
      ]);
      let price = oraclePrices.prices[TestnetPools[poolName].assetId].price;
      console.log(price);
      let limit =
        rew.assetsRewards.length && rew.assetsRewards[0].periodRewards[0].limit;
      let value = Math.round(Number(limit * price) / 1e14);
      totalRewardsValue += value;
      allRewardsInfo.push({
        assetId: TestnetPools[poolName].assetId,
        poolName,
        amount: limit,
        value,
      });
    } catch (e) {
      // console.log(e);
    }
  }

  res.status(200).json({
    totalRewardsValue,
    allRewardsInfo,
  });
}
