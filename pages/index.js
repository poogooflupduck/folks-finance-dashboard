import Head from "next/head";

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
import LtvCard from "@/components/LtvCard";
import PoolsCard from "@/components/PoolsCard";
import PairsCard from "@/components/PairsCard";
import MetricCard from "@/components/MetricCard";

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
          <GridItem
            colSpan={{ base: 5, sm: 5, md: 5, lg: 2 }}
            p={6}
            borderWidth={1}
            borderRadius="md"
          >
            <LtvCard />
          </GridItem>
          <GridItem
            colSpan={{ base: 5, sm: 5, md: 5, lg: 1 }}
            p={6}
            borderWidth={1}
            borderRadius="md"
          >
            <PoolsCard />
          </GridItem>
          <GridItem
            colSpan={{ base: 5, sm: 5, md: 5, lg: 1 }}
            p={6}
            borderWidth={1}
            borderRadius="md"
          >
            <PairsCard />
          </GridItem>
          <GridItem
            colSpan={{ base: 5, sm: 5, md: 5, lg: 1 }}
            p={6}
            borderWidth={1}
            borderRadius="md"
          >
            <MetricCard
              endpoint="api/loanCount"
              dataKey="totalLoanCount"
              label="Total loans"
            />
          </GridItem>
          <GridItem
            colSpan={{ base: 5, sm: 5, md: 5, lg: 1 }}
            p={6}
            borderWidth={1}
            borderRadius="md"
          >
            <MetricCard
              endpoint="api/borrowersCount"
              dataKey="totalBorrowers"
              label="Total borrowers"
            />
          </GridItem>
          <GridItem
            colSpan={{ base: 5, sm: 5, md: 5, lg: 1 }}
            p={6}
            borderWidth={1}
            borderRadius="md"
          >
            <MetricCard
              endpoint="api/rewardsValue"
              dataKey="totalRewardsValue"
              label="Total Rewards Aggregator rewards available"
              unit="USD"
            />
          </GridItem>
        </Grid>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  return {
    props: {},
  };
}
