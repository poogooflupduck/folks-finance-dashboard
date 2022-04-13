import SwrData from "@/components/SwrData";

import {
  Text,
  Flex,
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import Image from "next/image";

const PairsCard = () => {
  const { data, isLoading, isError } = SwrData("/api/allPairs");
  if (isLoading) return <Skeleton height="20px" />;
  if (isError) return <Skeleton height="20px" />;
  return (
    <>
      <Text>Asset Pairs</Text>
      <Wrap>
        <WrapItem>
          <Text fontSize="3xl" fontWeight={"bold"}>
            {data.pairs.length}
          </Text>
        </WrapItem>
      </Wrap>
      <Wrap>
        {data.pairs.slice(0, 6).map((entry) => (
          <WrapItem key={entry.collateralSymbol+entry.borrowSymbol}>
            <Image
              src={"/icons/" + entry.collateralSymbol.toLowerCase() + ".svg"}
              width={30}
              height={30}
            />
            <Box ml={-2} zIndex={-1}>
              <Image
                src={"/icons/" + entry.borrowSymbol.toLowerCase() + ".svg"}
                width={30}
                height={30}
              />
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};

export default PairsCard;
