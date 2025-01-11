import React, { createContext, useEffect, useState } from "react";

// Create the context
export const MyContext = createContext();

// Create the Context provider component
const Context = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState(() => {
    try {
      const storedBalance = localStorage.getItem("walletBalance");
      return storedBalance ? Number(JSON.parse(storedBalance)) : 5000;
    } catch (error) {
      console.error("error parsing walletBalance from localStorage:", error);
      return 5000;
    }
  });

  const [listOfExpenses, setlistOfExpenses] = useState(() => {
    try {
      const storedExpense = localStorage.getItem("listOfExpenses");
      return storedExpense ? JSON.parse(storedExpense) : [];
    } catch (error) {
      console.error("Error parsing listOfExpenses from localStorage:", error);
      return []; // Fallback to an empty array if parsing fails
    }
  });

  const [expense, setExpense] = useState(() => {
    return listOfExpenses.reduce(
      (total, item) => total + Number(item.price),
      0
    );
  });
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  
  const [currentEditIndex,setCurrentEditIndex] = useState(null)

  const handleDeletingExpense = (id) => {
    setlistOfExpenses(() => {
      const updatedExpenseList = listOfExpenses.filter(
        (item, index) => index !== id
      );
      localStorage.setItem(
        "listOfExpenses",
        JSON.stringify(updatedExpenseList)
      );
      return updatedExpenseList;
    });
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.46)',  // Dark overlay
      zIndex: 1000  // Ensure modal is on top
    },
    content: {
      color: 'black',  // Text color
      backgroundColor: '#EFEFEF',  // Modal background
      borderRadius: '10px',  // Rounded corners
      padding: '45px',  // Padding inside the modal
      display: 'flex',
      flexDirection:'column',
      justifyContent: 'center',
      alignItems:'start',
      gap: '20px',
      width: '600px',  // Modal width
      height: 'max-content',
      margin: 'auto',  // Center the modal
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)'  // Add a subtle shadow
    }
  }
  
  // we have to only know the current index when clicking on the edit button and store the index in a variable const
  // rest of the functionalities like manipulating the current listOfExpenses with the values from the input element
  // when clicking on submit button
  
  const handleExpenseSubmit = (e) => {
    e.preventDefault()
    // console.log(currentEditIndex)
    // console.log(title,category,date,price)
    setlistOfExpenses(() => {
      const updatedExpenseList = listOfExpenses.map((item,index) => {
        if(currentEditIndex === index){
          return {
            ...item,
            title:title ? title : item.title,
            category:category ? category : item.category,
            date:date ? date : item.date,
            price:price ? price  : item.price
          }
        }
        return {...item}
      })
      localStorage.setItem(
        "listOfExpenses",
        JSON.stringify(updatedExpenseList)
      );
      return updatedExpenseList
    })

  };
  const values = {
    walletBalance,
    setWalletBalance,
    listOfExpenses,
    setlistOfExpenses,
    expense,
    setExpense,
    title,
    setTitle,
    price, 
    setPrice,
    category, 
    setCategory,
    date, 
    setDate,
    handleDeletingExpense,
    currentEditIndex,
    setCurrentEditIndex,
    handleExpenseSubmit,
    customStyles
  };

  

  // useEffect(()=>{
  //   setWalletBalance(prevBalance => prevBalance)
  // },[])

  return (
    <MyContext.Provider
      value={values}
    >
      {children}
    </MyContext.Provider>
  );
};

export default Context;
