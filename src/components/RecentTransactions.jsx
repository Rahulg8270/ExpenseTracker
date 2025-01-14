import React, { useContext } from "react";
import { useState } from "react";
import { MyContext } from "../context/MyContext";
import Modal from "react-modal";
// import "../../src/App.css";
import "../styles/RecentTransactions.css";
import Pagination from "./Pagination";
import { TiDeleteOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { MdCardTravel } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { CiGift } from "react-icons/ci";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { CiPizza } from "react-icons/ci";

const RecentTransactions = () => {
  const [currentPage, setPageChange] = useState(1);
  const itemsPerPage = 3;

  const {
    listOfExpenses,
    handleDeletingExpense,
    setCurrentEditIndex,
    title,
    setTitle,
    price,
    setPrice,
    category,
    setCategory,
    date,
    setDate,
    handleExpenseSubmit,
    customStyles,
  } = useContext(MyContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPages = Math.ceil(listOfExpenses.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listOfExpenses.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setPageChange(page);
  };

  const handleInputModal = () => {
    setIsModalOpen(true);
  };

  const showCategoryIcon = (categoryName) => {
    if (categoryName === "Food") {
      return <CiPizza />;
    } else if (categoryName === "Travel") {
      return <MdCardTravel />;
    } else if (categoryName === "Health") {
      return <MdOutlineHealthAndSafety />;
    } else {
      return <CiGift />;
    }
  };

  const handleCancel = () => {
    setTitle("");
    setPrice(0);
    setCategory("");
    setDate("");
    setIsModalOpen(false);
  };

  function getMonthName(month) {
    const d = new Date();
    d.setMonth(month - 1);
    const monthName = d.toLocaleString("default", { month: "long" });
    return monthName;
  }

  return (
    <div className="transaction-component">
      <h2>Recent Transactions</h2>
      <div className="transaction-container">
        {listOfExpenses.length === 0 ? (
          <div className="transactions">
            {" "}
            <h3>No transactions</h3>
          </div>
        ) : (
          currentItems.map((item, index) => {
            return (
              <div className="transactions" key={index}>
                <div className="left-part">
                  <div>
                    <p id="category">{showCategoryIcon(item.category)}</p>
                  </div>
                  <div>
                    <p id="title">{item.title}</p>
                    <p id="date">{`${getMonthName(
                      item.date.slice(5, 7)
                    )} ${item.date.slice(8, 10)}, ${item.date.slice(0, 4)}`}</p>
                  </div>
                </div>

                <div className="right-part">
                  <div className="first-part">
                    <p id="price">₹{item.price}</p>
                  </div>
                  <div className="second-part">
                    <button
                      id="delete"
                      onClick={() => handleDeletingExpense(index)}
                    >
                      <TiDeleteOutline />
                    </button>
                    <button
                      id="edit"
                      onClick={() => {
                        setCurrentEditIndex(index);
                        handleInputModal(index);
                      }}
                    >
                      <CiEdit />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* make a separate component and import it to improve readability and reuse when clicking on the edit button*/}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={customStyles}
        >
          <h1>Add Expenses</h1>
          <form
            onSubmit={(e) => handleExpenseSubmit(e)}
            className="input-expenses"
          >
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="number"
              placeholder="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="text"
              placeholder="select category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button className="expenseSubmit" type="submit">
              Add Expense
            </button>
            <button
              onClick={handleCancel}
              className="expenseCanceled"
              type="button"
            >
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default RecentTransactions;
