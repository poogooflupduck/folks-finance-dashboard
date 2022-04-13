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
  Tooltip,
  Square,
} from "@chakra-ui/react";

const colors = [
  "#f0f6ff",
  "#addcff",
  "#268bff",
  "#082dc2",
  "#3a51d6",
  "#05076b",
];

let nf = new Intl.NumberFormat("en-US");
let compactf = Intl.NumberFormat("en", { notation: "compact" });

const TvlBar = () => {
  const { data, isLoading, isError } = SwrData("/api/tvl");
  if (isLoading)
    return (
      <>
        <Text>Total value locked</Text>
        <Skeleton height="20px" />
      </>
    );
  if (isError) return <Skeleton height="20px" />;
  return (
    <>
      <Text>Total value locked</Text>
      <Wrap align="baseline">
        <Text fontSize="3xl" fontWeight={"bold"}>
          {nf.format(data.tvl)}
        </Text>
        <Text fontSize="2xl" fontWeight={"bold"}>
          USD
        </Text>
      </Wrap>
      <Flex w={"100%"} h={"0.75rem"} mt={12} borderRadius="4px">
        {data.pools.map((entry, index) => (
          <Tooltip
            label={
              entry.symbol +
              " (" +
              ((entry.totalLockedValue * 100) / data.tvl).toFixed(2) +
              "%)"
            }
            key={entry.symbol}
          >
            <Box
              bg={colors[index]}
              w={(entry.totalLockedValue * 100) / data.tvl + "%"}
            ></Box>
          </Tooltip>
        ))}
      </Flex>
      <Wrap mt={14} spacing={"2%"}>
        {data.pools.map((entry, index) => (
          <WrapItem key={entry.symbol}>
            <Flex gap={2} align="baseline">
              <Square size={2} bg={colors[index]} />
              <div>
                <Text color="darkgrey">{entry.symbol}</Text>
                <Text>{nf.format(entry.totalLockedValue) + " USD"}</Text>
                <Text fontSize={"sm"} color="grey">
                  {compactf.format(entry.totalLocked) + " " + entry.symbol}
                </Text>
              </div>
            </Flex>
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};

export default TvlBar;
