import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/MyContext";
import Modal from "react-modal";
import { useSnackbar } from "notistack";
// import "../../src/App.css";
import '../styles/Expense.css'



const Expense = () => {
  const {
    walletBalance,
    setWalletBalance,
    expense,
    setExpense,
    listOfExpenses,
    setlistOfExpenses,
    title,
    setTitle,
    price,
    setPrice,
    category,
    setCategory,
    date,
    setDate,
    customStyles
  } = useContext(MyContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // here

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBalance = walletBalance - Number(price);

    if (newBalance < 0) {
      enqueueSnackbar("Insufficient funds! Cannot add this expense.", {
        variant: "error",
      });
      return;
    }

    setWalletBalance(newBalance);
    // expense changing
    setExpense((prevExpense) => prevExpense + Number(price));
    const newExpense = {
      title,
      price: Number(price),
      category,
      date,
    };
    // here
    setlistOfExpenses((prevList) => {
      const updatedList = [...prevList, newExpense];
      localStorage.setItem("listOfExpenses", JSON.stringify(updatedList));
      return updatedList;
    });
    handleCancel();
  };

  const handleCancel = () => {
    setTitle("");
    setPrice(0);
    setCategory("");
    setDate("");
    setIsModalOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("listOfExpenses", JSON.stringify(listOfExpenses));

    const totalExpense = listOfExpenses.reduce(
      (total, item) => total + Number(item.price),
      0
    );
    setExpense(totalExpense);
  }, [listOfExpenses, setExpense]);

  // useEffect(() => {
  //   localStorage.setItem("expense", JSON.stringify(expense));
  // }, [expense]);

  // useEffect(()=>{

  // },[walletBalance,enqueueSnackbar])
  return (
    <div className="expense-component">
      <h2>
        Expenses: <span className="expense">₹{expense}</span>
      </h2>
      <button
        onClick={() => {
          if (walletBalance <= 0) {
            enqueueSnackbar("Insufficient funds! Cannot add an expense.", {
              variant: "error",
            });
          } else {
            setIsModalOpen(true);
          }
        }}
        disabled={walletBalance <= 0}
      >
        Add Expenses
      </button>

      {/* make a separate component and import it to improve readability and reuse when clicking on the edit button*/}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={customStyles}>
        <h1>Add Expenses</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="input-expenses">
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Health">Health</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <button className="expenseSubmit" type="submit">Add Expense</button>
          <button className="expenseCanceled" onClick={handleCancel} type="button">
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Expense;
