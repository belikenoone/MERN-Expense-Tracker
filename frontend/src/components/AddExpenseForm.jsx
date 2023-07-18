import React, { useState, useContext } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Select,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import AppContext from "../context/context";
const AddExpenseForm = () => {
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseCost, setExpenseCost] = useState("");
  const [category, setCategory] = useState();
  const categories = ["Food", "Travel", "Rent", "Bills", "Miscellanous"];
  const { colorMode, toggleColorMode } = useColorMode();
  const { setAllExpenses, loadingBtn, setShowLoadingBtn } =
    useContext(AppContext);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const toast = useToast();
  const checkFields = () => {
    if (expenseTitle && expenseCost && category) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };
  const addExpense = async () => {
    setShowLoadingBtn(true);
    const response = await axios.post("http://localhost:8080/", {
      expenseTitle,
      expenseCost,
      category,
    });
    setAllExpenses((prev) => [...prev, response.data]);
    toast({
      title: "Expense Added",
      description: "Your expense has been added succesfully!",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    setExpenseTitle("");
    setExpenseCost("");
    setShowLoadingBtn(false);
  };
  return (
    <Box display={"flex"} flexDirection={"column"} gap={5}>
      <FormControl>
        <FormLabel>Expense Title</FormLabel>
        <Input
          type="text"
          required
          value={expenseTitle}
          onChange={(e) => {
            setExpenseTitle(e.target.value);
            checkFields();
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Expense Amount</FormLabel>
        <Input
          type="number"
          required
          value={expenseCost}
          onChange={(e) => {
            setExpenseCost(+e.target.value);
            checkFields();
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Category</FormLabel>
        <Select
          placeholder="Select Category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            checkFields();
          }}
        >
          {categories.map((c, index) => {
            return <option key={index}>{c}</option>;
          })}
        </Select>
      </FormControl>
      {loadingBtn ? (
        <Button isLoading bg={"twitter.700"} loadingText={"Adding"}>
          Adding
        </Button>
      ) : (
        <Button
          onClick={addExpense}
          bg={"twitter.700"}
          _hover={{ bg: "twitter.900" }}
          isDisabled={btnDisabled}
          _disabled={{ bg: "black", cursor: "not-allowed" }}
        >
          Add
        </Button>
      )}

      <Button onClick={toggleColorMode}>Toggle Theme</Button>
    </Box>
  );
};

export default AddExpenseForm;
