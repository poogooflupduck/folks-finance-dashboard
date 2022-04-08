import Head from "next/head";
import Link from "next/link";

import {
  Box,
  Grid,
  GridItem,
  Stack,
  Text,
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";

import NavBar from "@/components/NavBar";
import TvlBar from "@/components/TvlBar";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Folks Finance Dashboard</title>
        <meta name="description" content="Folks Finance live analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <Grid templateColumns={"repeat(5, 1fr)"} gap={2} p={2}>
        <GridItem
          colSpan={{ base: 5, sm: 5, md: 5, lg: 3 }}
          p={6}
          borderWidth={1}
          borderRadius="md"
        >
          <TvlBar />
        </GridItem>
      </Grid>

      <main p={2}>
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
