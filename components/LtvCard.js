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
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

const LtvCard = () => {
  const { data, isLoading, isError } = SwrData("/api/tvl");
  if (isLoading) return <Skeleton height="20px" />;
  if (isError) return <Skeleton height="20px" />;
  return (
    <>
      <Text>Overall Utilization Ratio</Text>
      <Wrap>
        <WrapItem>
          <Text fontSize="3xl" fontWeight={"bold"}>
            {((data.tvb * 100) / data.tvd).toFixed(2) + "%"}
          </Text>
        </WrapItem>
        <WrapItem>
          <CircularProgress
            value={(data.tvb * 100) / data.tvd}
            size="100%"
            thickness="4px"
          />
        </WrapItem>
      </Wrap>
    </>
  );
};

export default LtvCard;
