import {
  getPoolInfo,
  getTokenPairInfo,
  TestnetTokenPairs,
  TestnetPools,
  TestnetOracle,
  getOraclePrices,
} from "folks-finance-js-sdk/src";
import { algodClient, indexerClient, sender } from "@/utils/config";

export default async function handler(req, res) {
  const oracle = TestnetOracle;
  let tvl = 0;
  let tvd = 0;
  let tvb = 0;
  let allPoolsInfo = [];
  for (let poolName in TestnetPools) {
    let info = await getPoolInfo(indexerClient, TestnetPools[poolName]);
    const oraclePrices = await getOraclePrices(indexerClient, oracle, [
      TestnetPools[poolName].assetId,
    ]);
    let price = oraclePrices.prices[TestnetPools[poolName].assetId].price;
    let totalDepositsValue = Math.round(
      Number(info.totalDeposits * price) / 1e14
    );
    let totalBorrowsValue = Math.round(
      Number(info.totalBorrows * price) / 1e14
    );
    let totalLockedValue = totalDepositsValue - totalBorrowsValue;
    tvl += totalDepositsValue - totalBorrowsValue;
    tvd += totalDepositsValue;
    tvb += totalBorrowsValue;
    allPoolsInfo.push({
      symbol: poolName,
      price,
      totalDepositsValue,
      totalBorrowsValue,
      totalLockedValue,
      ...info,
    });
  }

  res.status(200).json({ tvl, tvd, tvb, pools: [...allPoolsInfo] });
}
