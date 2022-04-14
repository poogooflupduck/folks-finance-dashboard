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
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import SwrData from "@/components/SwrData";

const fetcher = (url) => fetch(url).then((r) => r.json());
let nf = new Intl.NumberFormat("en-US");

const PairCardGrid = () => {
  const { data: info } = SwrData("/api/allPairs", fetcher);
  const { data: counts } = SwrData("/api/loanCount", fetcher);
  if (!info)
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
  if (info)
    return (
      <>
        {info.pairs.map((pair) => (
          <GridItem
            key={pair.symbol}
            colSpan={{ base: 2, sm: 2, md: 2, lg: 1 }}
            borderWidth={1}
            borderRadius="md"
          >
            <Flex align="center" p={6}>
              <WrapItem key={pair.collateralSymbol + pair.borrowSymbol}>
                <Image
                  src={"/icons/" + pair.collateralSymbol.toLowerCase() + ".svg"}
                  width={30}
                  height={30}
                />
                <Box ml={-2} zIndex={-1}>
                  <Image
                    src={"/icons/" + pair.borrowSymbol.toLowerCase() + ".svg"}
                    width={30}
                    height={30}
                  />
                </Box>
              </WrapItem>

              <Text ml={2}>{pair.symbol}</Text>
              <Spacer />
              <Text ml={2} color="grey">
                {/* {nf.format(pair.totalLocked)} */}
              </Text>
            </Flex>
            <Box px={6} pt={2} pb={6} align="center">
              <CircularProgress
                value={(pair.loanToValueRatio * 100) / 1e14}
                color="green.400"
                size={"80%"}
              >
                <CircularProgressLabel fontSize={"lg"}>
                  {((pair.loanToValueRatio * 100) / 1e14).toFixed(2) + "%"}
                  <br />
                  <Text fontSize="sm">LTV</Text>
                </CircularProgressLabel>
              </CircularProgress>
            </Box>
            <Box borderTopWidth={1} w="full" px={6} py={3}>
              <Flex align="center">
                <Text>Number of loans</Text>
                <Spacer />
                {!counts ? (
                  <Box w={10}>
                    <Skeleton height="20px" />
                  </Box>
                ) : (
                  <Text ml={2} color="grey">
                    {
                      counts.pairs.filter((e) => e.pairName == pair.symbol)[0]
                        .loanCount
                    }
                  </Text>
                )}
              </Flex>
            </Box>
          </GridItem>
        ))}
      </>
    );
};

const Pairs = () => {
  return (
    <div>
      <Head>
        <title>Pairs - Folks Finance Dashboard</title>
        <meta name="description" content="Folks Finance live analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Grid templateColumns={"repeat(5, 1fr)"} gap={2} p={2}>
        <PairCardGrid />
      </Grid>
    </div>
  );
};

export default Pairs;
