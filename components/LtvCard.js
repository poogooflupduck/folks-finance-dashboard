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
  Spacer,
  Tooltip,
  Square,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
let nf = new Intl.NumberFormat("en-US");

const LtvCard = () => {
  const { data, isLoading, isError } = SwrData("/api/tvl");
  if (isLoading)
    return (
      <>
        <Text>Overall Utilization Ratio</Text>
        <Skeleton height="20px" />
      </>
    );
  if (isError) return <Skeleton height="20px" />;
  return (
    <>
      <Text>Overall Utilization Ratio</Text>
      <Wrap>
        <WrapItem>
          <div>
            <Text fontSize="3xl" fontWeight={"bold"}>
              {((data.tvb * 100) / data.tvd).toFixed(2) + "%"}
            </Text>
            <Box mt={6} mb={2} mr={6}>
              <Flex gap={2} align="baseline">
                <Square size={2} bg={"blue"} />
                <div>
                  <Text color="darkgrey">Borrowed</Text>
                  <Text>{nf.format(data.tvb) + " USD"}</Text>
                </div>
              </Flex>
            </Box>
            <Box>
              <Flex gap={2} align="baseline">
                <Square size={2} bg={"lightgrey"} />
                <div>
                  <Text color="grey">Deposited</Text>
                  <Text>{nf.format(data.tvd) + " USD"}</Text>
                </div>
              </Flex>
            </Box>
          </div>
          <Spacer />
          <CircularProgress
            value={(data.tvb * 100) / data.tvd}
            size="100%"
            thickness="4px"
          />
        </WrapItem>
        <WrapItem></WrapItem>
      </Wrap>
    </>
  );
};

export default LtvCard;
