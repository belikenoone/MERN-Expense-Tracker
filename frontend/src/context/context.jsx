import { createContext, useState, useEffect, useReducer } from "react";
import axios from "axios";
const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const [allExpenses, setAllExpenses] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [loadingBtn, setShowLoadingBtn] = useState(false);
  const getAllExpenses = async () => {
    setShowLoader(true);
    const response = await axios.get("http://localhost:8080/");
    setAllExpenses(response.data);
    setShowLoader(false);
  };
  const deleteExpense = async (expenseId) => {
    await axios.delete("http://localhost:8080/" + expenseId);
    setAllExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense._id !== expenseId)
    );
  };
  return (
    <AppContext.Provider
      value={{
        allExpenses,
        setAllExpenses,
        getAllExpenses,
        showLoader,
        loadingBtn,
        setShowLoadingBtn,
        deleteExpense,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
