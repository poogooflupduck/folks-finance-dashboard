import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
