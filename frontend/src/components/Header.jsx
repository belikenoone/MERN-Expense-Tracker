import React from "react";
import { Box, Text } from "@chakra-ui/react";
const Header = () => {
  return (
    <Box
      as="header"
      position={"sticky"}
      inset={0}
      w={"full"}
      bgColor={"twitter.700"}
      zIndex={"500"}
    >
      <Box as="nav" w={"90%"} mx={"auto"}>
        <Text align={"center"} fontSize={"3xl"} fontWeight={"bold"} py={2}>
          Expense Tracker
        </Text>
      </Box>
    </Box>
  );
};

export default Header;
