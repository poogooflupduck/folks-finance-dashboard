import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import {
  Box,
  Grid,
  GridItem,
  Flex,
  Skeleton,
  Text,
  Spacer,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import SwrData from "@/components/SwrData";

const fetcher = (url) => fetch(url).then((r) => r.json());
let nf = new Intl.NumberFormat("en-US");

const PoolCardGrid = () => {
  const { data, isLoading, isError } = SwrData("/api/tvl", fetcher);
  if (isLoading)
    return (
      <>
        {Array(6)
          .fill("")
          .map((_, i) => (
            <GridItem
              key={i}
              colSpan={{ base: 2, sm: 2, md: 2, lg: 1 }}
              p={6}
              borderWidth={1}
              borderRadius="md"
            >
              <Skeleton height="20px" />
            </GridItem>
          ))}
      </>
    );
  if (isError) return <Skeleton height="20px" />;
  return (
    <>
      {data.pools.map((pool) => (
        <GridItem
          key={pool.symbol}
          colSpan={{ base: 2, sm: 2, md: 2, lg: 1 }}
          borderWidth={1}
          borderRadius="md"
        >
          <Flex align="center" p={6}>
            <Image
              src={"/icons/" + pool.symbol.toLowerCase() + ".svg"}
              width={30}
              height={30}
            />
            <Text ml={2}>{pool.symbol}</Text>
            <Spacer />
            <Text ml={2} color="grey">
              {nf.format(pool.totalLocked)}
            </Text>
          </Flex>
          <Box px={6} pt={2} pb={6} align="center">
            <CircularProgress
              value={(pool.utilizationRatio * 100) / 1e14}
              color="green.400"
              size={"80%"}
            >
              <CircularProgressLabel fontSize={"lg"}>
                {((pool.utilizationRatio * 100) / 1e14).toFixed(2) + "%"}
                <br />
                <Text fontSize="sm">Utilization</Text>
              </CircularProgressLabel>
            </CircularProgress>
          </Box>
          <Box borderTopWidth={1} w="full" px={6} py={3}>
            <Flex align="center">
              <Text>Value locked</Text>
              <Spacer />
              <Text ml={2} color="grey">
                {nf.format(pool.totalLockedValue) + " USD"}
              </Text>
            </Flex>
          </Box>
          <Box borderTopWidth={1} w="full" px={6} py={3}>
            <Flex align="center">
              <Text>Deposit APR</Text>
              <Spacer />
              <Text ml={2} color="grey">
                {((pool.depositInterestRate * 100) / 1e14).toFixed(2) + "%"}
              </Text>
            </Flex>
          </Box>
          <Box borderTopWidth={1} w="full" px={6} py={3}>
            <Flex align="center">
              <Text>Borrow APR</Text>
              <Spacer />
              <Text ml={2} color="grey">
                {((pool.borrowInterestRate * 100) / 1e14).toFixed(2) + "%"}
              </Text>
            </Flex>
          </Box>
        </GridItem>
      ))}
    </>
  );
};

const Pools = () => {
  return (
    <div>
      <Head>
        <title>Pools - Folks Finance Dashboard</title>
        <meta name="description" content="Folks Finance live analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Grid templateColumns={"repeat(5, 1fr)"} gap={2} p={2}>
        <PoolCardGrid />
      </Grid>
    </div>
  );
};

export default Pools;
