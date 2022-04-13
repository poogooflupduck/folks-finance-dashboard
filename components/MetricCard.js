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

let nf = new Intl.NumberFormat("en-US");
const MetricCard = (props) => {
  const { data, isLoading, isError } = SwrData(props.endpoint);
  if (isLoading)
    return (
      <>
        <Text>{props.label}</Text>
        <Skeleton mt={2} height="20px" />
      </>
    );
  if (isError) return <Skeleton height="20px" />;
  return (
    <>
      <Text>{props.label}</Text>
      <Wrap>
        <WrapItem>
          {props.unit ? (
            <Wrap align="baseline">
              <Text fontSize="3xl" fontWeight={"bold"}>
                {nf.format(data[props.dataKey]) + " "}
              </Text>
              <Text fontSize="2xl" fontWeight={"bold"}>
                {props.unit}
              </Text>
            </Wrap>
          ) : (
            <Text fontSize="3xl" fontWeight={"bold"}>
              {nf.format(data[props.dataKey])}
            </Text>
          )}
        </WrapItem>
      </Wrap>
    </>
  );
};

export default MetricCard;
