
import React, { useContext, useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "../styles/PieChart.css";
import { MyContext } from "../context/MyContext";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieCharts = () => {
  const { listOfExpenses } = useContext(MyContext);
  const [chartDimensions, setChartDimensions] = useState({
    width: 400,
    height: 300,
  });

  const updateDimensions = () => {
    const screenWidth = window.innerWidth;
    const width = screenWidth > 950 ? 300 : screenWidth * 0.8;
    const height = screenWidth > 950 ? 200 : screenWidth * 0.6;
    setChartDimensions({ width, height });
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Predefined categories and colors
  const categories = ["Food", "Travel","Health","Entertainment" ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const categoryColors = {
    Food: "#0088FE",
    Travel: "#00C49F",
    Health: "#FFBB28",
    Entertainment: "#FF8042"
  }

  const categoryNames = Object.keys(categoryColors)
  // Consolidate expenses into 4 main categories

  const data = categoryNames
    .map((categoryName) => {
      const total = listOfExpenses
        .filter((expense) => expense.category === categoryName)
        .reduce((sum, expense) => sum + expense.price, 0);
      return { name: categoryName, value: total };
    })
    .filter((entry) => entry.value > 0); // Exclude categories with 0 value from the pie chart


  return (
    <div className="piechart-container">
      <PieChart width={chartDimensions.width} height={chartDimensions.height}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={chartDimensions.width * 0.3}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((item) => (
            <Cell key={`cell-${item.name}`} fill={categoryColors[item.name]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      <div
        className="legend-container"
      >
        {categories.map((category, index) => (
          <div
            key={`legend-${index}`}
            className="legend-tag"
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: COLORS[index],
                marginRight: "5px",
              }}
            />
            <span style={{ fontSize: "14px", color: "#fff" }}>{category}</span>
          </div>
        ))}


        


      </div>
    </div>
  );
};

export default PieCharts;
