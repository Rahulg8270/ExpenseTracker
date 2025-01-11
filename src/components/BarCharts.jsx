
import React, { useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { MyContext } from "../context/MyContext";
import '../../src/App.css'


const BarCharts = () => {
  const { listOfExpenses, walletBalance } = useContext(MyContext);

  // Consolidate expenses by category and calculate percentage
    const categoryTotals = listOfExpenses.reduce((acc, expense) => {
    const category = expense.category;
    const price = Number(expense.price);

    if (acc[category]) {
      acc[category] += price; // Add to existing category total
    } else {
      acc[category] = price; // Initialize new category
    }

    return acc;
  }, {});

  // Convert consolidated data to an array of objects
  const data = Object.keys(categoryTotals).map((category) => ({
    name: category,
    percentage: ((categoryTotals[category] / walletBalance) * 100).toFixed(2),
  }));

  // Sort data by percentage (descending order)
  data.sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="bar-component">
      <h2>Top Expenses</h2>
      <div className="bar-container">
      <ResponsiveContainer width={'100%'} height={"90%"}>
      <BarChart
        // height={data.length * 50} // Dynamically adjust height based on the number of categories
        layout="vertical"
        data={data}
        // margin={{ top: 10, right: 20, left: 100, bottom: 10 }}
        barCategoryGap={"25%"}
        barSize={Math.min(30, 150 / data.length)}
      >
        {/* Tooltip for hover functionality */}
        <Tooltip
          cursor={{ fill: "#f0f0f0" }}
          formatter={(value) => `${value}%`} // Show percentage in tooltip
          contentStyle={{ backgroundColor: "#ffffff", borderRadius: 5, padding: 5 }}
        />
        {/* Y-Axis for categories */}
        <YAxis
          type="category"
          dataKey="name"
          width={100} // Adjust width for category names
          tick={{ fill: "#000", fontSize: 14 }} // Customize text color and size
          axisLine={false}
          tickLine={false}
        />
        {/* X-Axis hidden */}
        <XAxis type="number" hide />
        {/* Bars for percentages */}
        <Bar
          dataKey="percentage"
          fill="#8884d8"
          barSize={30}
          radius={[0,50,50,0]}
          label={false}
        />
      </BarChart>
      </ResponsiveContainer>
      
    </div>
    </div>
  );
};

export default BarCharts;
