import { TestnetTokenPairs, getTokenPairInfo } from "folks-finance-js-sdk/src";
import { indexerClient } from "@/utils/config";

export default async function handler(req, res) {
  let allPairs = [];

  for (let pairName in TestnetTokenPairs) {
    const tokenPair = TestnetTokenPairs[pairName];
    const tokenPairInfo = await getTokenPairInfo(indexerClient, tokenPair);

    allPairs.push({
      symbol: pairName,
      borrowSymbol: pairName.split("-")[0],
      collateralSymbol: pairName.split("-")[1],
      ...tokenPair,
      ...tokenPairInfo,
    });
  }
  res.status(200).json({ pairs: allPairs });
}
