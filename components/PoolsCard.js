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

const PoolsCard = () => {
  const { data, isLoading, isError } = SwrData("/api/tvl");
  if (isLoading) return (
    <>
      <Text>Asset Pools</Text>
      <Skeleton height="20px" />
    </>
  );
  if (isError) return <Skeleton height="20px" />;
  return (
    <>
      <Text>Asset Pools</Text>
      <Wrap>
        <WrapItem>
          <Text fontSize="3xl" fontWeight={"bold"}>
            {data.pools.length}
          </Text>
        </WrapItem>
      </Wrap>
      <Wrap>
        {data.pools.map((entry) => (
          <WrapItem key={entry.symbol}>
            <Image
              src={"/icons/" + entry.symbol.toLowerCase() + ".svg"}
              width={30}
              height={30}
            />
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};

export default PoolsCard;
