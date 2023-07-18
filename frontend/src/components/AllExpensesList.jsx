import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/context";
import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Tfoot,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  useToast,
  Text,
  Tooltip,
} from "@chakra-ui/react";

const AllExpensesList = () => {
  const { allExpenses, getAllExpenses, deleteExpense } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState("");
  const toast = useToast();
  useEffect(() => {
    getAllExpenses();
  }, []);
  return (
    <>
      <Box>
        {allExpenses.length > 0 ? (
          <TableContainer>
            <Table variant={"striped"}>
              <TableCaption fontSize={"2rem"}>
                All Expenses So Far..
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>Cost</Th>
                </Tr>
              </Thead>
              <Tbody>
                {allExpenses.map((expense) => (
                  <Tooltip
                    hasArrow
                    placement="auto"
                    label="Click To Delete"
                    aria-label="A-Tooltip"
                    key={expense._id}
                  >
                    <Tr
                      key={expense._id}
                      onClick={() => {
                        setId(expense._id);
                        onOpen();
                      }}
                    >
                      <Td>{expense.expenseTitle}</Td>
                      <Td>{expense.category}</Td>
                      <Td>{expense.expenseCost}</Td>
                    </Tr>
                  </Tooltip>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>Cost</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        ) : null}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Do You Want To Delete This Expense?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>This Action is Irreversible</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                deleteExpense(id);
                onClose();
                toast({
                  title: "Expense Deleted",
                  description: "This expense was deleted",
                  status: "info",
                  duration: 4000,
                  isClosable: true,
                });
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AllExpensesList;
