import Head from "next/head";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import { Box, Grid, GridItem, Flex } from "@chakra-ui/react";
import SwrData from "@/components/SwrData";
const fetcher = (url) => fetch(url).then((r) => r.json());

const Pools = () => {
  const { data, isLoading, isError } = SwrData("/api/allPools", fetcher);
  console.log(data);

  return (
    <div>
      <Head>
        <title>Pools - Folks Finance Dashboard</title>
        <meta name="description" content="Folks Finance live analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Grid templateColumns={"repeat(5, 1fr)"} gap={2} p={2}>
        {data &&
          data.map((pool) => (
            <GridItem
              key={pool.symbol}
              colSpan={{ base: 2, sm: 2, md: 2, lg: 1 }}
              p={6}
              borderWidth={1}
              borderRadius="md"
            >
              <Flex align="center">
                <Image
                  src={"/icons/" + pool.symbol.toLowerCase() + ".svg"}
                  width={30}
                  height={30}
                />
                <Box ml={2}>{pool.symbol}</Box>
              </Flex>
            </GridItem>
          ))}
      </Grid>
    </div>
  );
};

export default Pools;
