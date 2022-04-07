import {
  getPoolInfo,
  getTokenPairInfo,
  TestnetTokenPairs,
  TestnetPools,
} from "folks-finance-js-sdk/src";
import { algodClient, indexerClient, sender } from "@/utils/config";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export default async function handler(req, res) {
  let allPoolsInfo = [];
  for (let poolName in TestnetPools) {
    console.log(poolName);
    let info = await getPoolInfo(indexerClient, TestnetPools[poolName]);
    allPoolsInfo.push({ symbol: poolName, ...info });
  }

  res.status(200).json([...allPoolsInfo]);
}
