import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import AddExpenseForm from "./components/AddExpenseForm";
import Header from "./components/Header";
import ExpenseChart from "./components/ExpenseChart";
import Loader from "./components/Loader";
import AllExpensesList from "./components/AllExpensesList";
const App = () => {
  return (
    <ChakraProvider>
      <Header />
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={5}
        height={"100vh"}
        width={"100%"}
      >
        <Box
          w={"90%"}
          mx={"auto"}
          py={5}
          display={"flex"}
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent={{ base: "center", lg: "space-evenly" }}
          alignItems={"center"}
          gap={5}
        >
          <ExpenseChart />
          <AddExpenseForm />
        </Box>
        <Box w={"90%"} mx={"auto"} py={5}>
          <AllExpensesList />
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;
