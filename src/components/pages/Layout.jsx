import { VStack } from "@chakra-ui/react";
import React from "react";

const Layout = ({ children }) => {
  return (
    <VStack bg="#0d0714" minH={"100vh"}>
      {children}
    </VStack>
  );
};

export default Layout;
