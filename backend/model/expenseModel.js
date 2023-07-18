import mongoose from "mongoose";
const Schema = mongoose.Schema;
const expenseSchema = new Schema(
  {
    expenseTitle: {
      type: String,
      required: true,
    },
    expenseCost: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Expense = mongoose.model("expense", expenseSchema);
export default Expense;
