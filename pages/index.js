import Head from "next/head";
import Link from "next/link";
import SwrData from "@/components/SwrData";

import {
  Box,
  Grid,
  GridItem,
  Stack,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";

import NavBar from "@/components/NavBar";

const Home = () => {
  const { data, isLoading, isError } = SwrData("/api/getBorrowTotal");
  return (
    <div>
      <Head>
        <title>Folks Finance Dashboard</title>
        <meta name="description" content="Folks Finance live analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main p={2}>
        <h1>{data && JSON.stringify(data)}</h1>

        {/* 
        <Grid templateColumns={"repeat(5, 1fr)"} gap={2}>
          <GridItem
            colSpan={{ base: 2, sm: 2, md: 2, lg: 1 }}
            p={6}
            borderWidth={1}
            borderRadius="md"
          >
            <Stack>
              {links.map((entry) => (
                <Link href={entry[1]}>
                  <a>
                    <Box
                      align={"left"}
                      p={1}
                      borderRadius="lg"
                      _hover={{
                        background: "lightgrey",
                        color: "#0069c5",
                      }}
                    >
                      <Text>{entry[0]}</Text>
                    </Box>
                  </a>
                </Link>
              ))}
            </Stack>
          </GridItem>
          <GridItem colSpan={{ base: 2, sm: 2, md: 2, lg: 4 }}></GridItem>
        </Grid> */}
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  return {
    props: {},
  };
}
