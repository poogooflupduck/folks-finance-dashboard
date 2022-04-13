import { TestnetTokenPairs } from "folks-finance-js-sdk/src";

export default async function handler(req, res) {
  let allPairs = [];

  for (let pairName in TestnetTokenPairs) {
    const tokenPair = TestnetTokenPairs[pairName];
    allPairs.push({
      symbol: pairName,
      borrowSymbol: pairName.split("-")[0],
      collateralSymbol: pairName.split("-")[1],
      ...tokenPair,
    });
  }
  res.status(200).json({ pairs: allPairs });
}
