import React, { useContext } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import AppContext from "../context/context";
import { Box, Text } from "@chakra-ui/react";

const ExpenseChart = () => {
  const { allExpenses } = useContext(AppContext);

  const totalExpenseCost = allExpenses.reduce((acc, curr) => {
    return acc + curr.expenseCost;
  }, 0);
  Chart.register(ArcElement, Tooltip, Legend);
  // const categoryColors = {
  //   Food: "rgb(255, 99, 132)",
  //   Travel: "rgb(255, 205, 86)",
  //   Rent: "rgb(54, 162, 235)",
  //   Bills: "rgb(75, 192, 192)",
  //   Miscellanous: "rgb(55, 375, 192)",
  // };
  const categoryColors = {
    Food: "#FF4081",
    Travel: "#FFC107",
    Rent: "#2196F3",
    Bills: "#4CAF50",
    Miscellaneous: "#9C27B0",
  };

  const aggregatedData = {};
  allExpenses.forEach((expense) => {
    const { category, expenseCost } = expense;
    if (aggregatedData.hasOwnProperty(category)) {
      aggregatedData[category] += expenseCost;
    } else {
      aggregatedData[category] = expenseCost;
    }
  });
  const categories = Object.keys(aggregatedData);
  const expensesTotal = Object.values(aggregatedData);
  const percentages = expensesTotal.map((expense) =>
    ((expense / totalExpenseCost) * 100).toFixed(0)
  );

  const config = {
    data: {
      labels: categories,
      datasets: [
        {
          label: "Total Expenses",
          data: expensesTotal,
          backgroundColor: categories.map(
            (category) => categoryColors[category]
          ),
          hoverOffset: 2,
          borderRadius: 10,
          spacing: 5,
        },
      ],
    },
    options: {
      cutout: 80,
      plugins: {
        tooltip: {
          enabled: true,
        },
        legend: {
          enabled: true,
        },
      },
    },
  };
  return (
    <>
      {allExpenses.length > 0 ? (
        <Box py={2} position={"relative"}>
          <Doughnut {...config}></Doughnut>
          <Box
            position={"absolute"}
            top={"50%"}
            left={"50%"}
            transform={"translate(-50%,-50%)"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              Total:
            </Text>
            <Text fontSize={"4xl"} fontWeight={"bold"}>
              {totalExpenseCost}
            </Text>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default ExpenseChart;
