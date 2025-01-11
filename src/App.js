import React, { useContext } from "react";
import Wallet from "./components/Wallet.jsx";
import Expense from "./components/Expense.jsx";
import RecentTransactions from "./components/RecentTransactions.jsx";
import PieCharts from "./components/PieCharts.jsx";
import BarCharts from "./components/BarCharts.jsx";
import './App.css'

const App = () => {
  // Consume the context

  return (
    <div className="expense-container">
      <h1>Expense Tracker</h1>
      <div className="top-container">
        <Wallet />
        <Expense />
        <PieCharts />
      </div>
      <div className="bottom-container">
        <RecentTransactions />
        <BarCharts />
      </div>
    </div>
  );
};

export default App;
