import { Box, Heading, Text, Wrap, WrapItem, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const links = [
  ["Overview", "/"],
  ["Pools (WIP)", "/pools"],
];

const NavBar = () => {
  return (
    <Box borderBottomWidth="1px" py={4} px={4}>
      <Wrap align="center">
        <Image src="/logo_icon.svg" width={30} height={30} />
        <Text pl={1} fontWeight="bold">
          Analytics
        </Text>
        <Spacer />
        <Wrap spacing={4}>
          {links.map((entry) => (
            <WrapItem key={entry[1]}>
              <Link href={entry[1]}>
                <a>
                  <Text>{entry[0]}</Text>
                </a>
              </Link>
            </WrapItem>
          ))}
        </Wrap>
      </Wrap>
    </Box>
  );
};

export default NavBar;
