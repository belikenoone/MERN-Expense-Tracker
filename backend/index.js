import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import Expense from "./model/expenseModel.js";
const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected To DB"))
  .catch((err) => console.log(err));
app.get("/", async (req, res) => {
  const allExpenses = await Expense.find().sort({ createdAt: -1 });
  res.json(allExpenses);
});
app.post("/", (req, res) => {
  const newExpense = new Expense({
    expenseTitle: req.body.expenseTitle,
    expenseCost: req.body.expenseCost,
    category: req.body.category,
  });
  newExpense.save();
  res.status(201).json(newExpense);
});
app.delete("/:id", async (req, res) => {
  const expense = await Expense.findByIdAndDelete(req.params.id);
  res.json(expense);
});
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
