import React from "react";
import { Box, Spinner } from "@chakra-ui/react";
const Loader = () => {
  return (
    <Box
      height={"100vh"}
      w={"100%"}
      display={"grid"}
      placeItems={"center"}
      bg={"rgba(0,0,0,0.75)"}
      inset={0}
      position={"fixed"}
    >
      <Spinner thickness="5px" size={"xl"} />
    </Box>
  );
};

export default Loader;
