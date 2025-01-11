import { MyContext } from "../context/MyContext";
import Modal from "react-modal";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
// import '../../src/App.css'
import "../styles/Wallet.css";

const Wallet = () => {
  const { walletBalance, setWalletBalance, customStyles } =
    useContext(MyContext);
  const [balanceIncrease, setBalanceIncrease] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    setWalletBalance((prevBalance) => prevBalance + Number(balanceIncrease));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setBalanceIncrease(0);
    setIsModalOpen(false);
  };

  useEffect(() => {
    try {
      const storedBalance =
        JSON.parse(localStorage.getItem("walletBalance")) || 0;
      setWalletBalance(storedBalance);
    } catch (error) {
      console.error("Error parsing wallet balance:", error);
      setWalletBalance((prevBalance) => prevBalance); // Fallback to default value
    }
  }, [setWalletBalance]);

  useEffect(() => {
    localStorage.setItem("walletBalance", JSON.stringify(walletBalance));
    if (walletBalance < 0) {
      enqueueSnackbar("You have spent more than your limit", {
        variant: "error",
      });
    }
  }, [walletBalance, enqueueSnackbar]);

  return (
    <div className="wallet-container">
      <h2>
        Wallet Balance: <span className="walletBalance">₹{walletBalance}</span>
      </h2>
      <button className="adding-balance" onClick={() => setIsModalOpen(true)}>
        Add Income
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
      >
        <h1>Add Balance</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="input-balance">
          <input
            type="number"
            placeholder="Income Amount"
            value={balanceIncrease}
            onChange={(e) => setBalanceIncrease(e.target.value)}
            className="setBalance"
          />
          <button id="submitButton" type="submit">
            Add Balance
          </button>
          <button id="cancelButton" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Wallet;
