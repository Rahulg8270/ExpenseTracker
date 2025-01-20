# Expense Tracker 💰

An intuitive and responsive web application to manage and visualize your expenses effectively. 
This project utilizes React.js, Recharts, and modern web design principles to provide a seamless user experience.


## Features 🌟

- Add, edit, update and delete existing expenses by category.
- Visualize spending with an interactive pie chart.
- Responsive design for all screen sizes.
- Dynamic category-wise color-coded expense tracking.
- Real-time data updates for efficient budgeting.


## Tech Stack 🛠️

- **Frontend:**
  - React.js
  - Recharts (for data visualization)
  - CSS (Responsive styling)
- **State Management:** Context API
- **Development Tools:** ESLint, Prettier


## Installation and Setup ⚙️

1. Clone the repository:
   git clone https://github.com/Rahulg8270/expense-tracker.git
   cd expense-tracker
2. Install dependencies:
   npm install
3. Start the development server:
   npm start
4. Open your browser and navigate to:
   http://localhost:3000
   

## Project Structure 📂

expense-tracker/
├── public/
│   └── index.html              # Root HTML file
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── BarCharts.jsx
│   │   ├── Expense.jsx
│   │   ├── Pagination.jsx
│   │   ├── PieCharts.jsx
│   │   ├── RecentTransactions.jsx
│   │   └── Wallet.jsx
│   ├── context/                # Context API for state management
│   │   └── MyContext.jsx
│   ├── styles/                 # CSS files for styling components
│   │   ├── Expense.css
│   │   ├── PieChart.css
│   │   ├── RecentTransactions.css
│   │   ├── Wallet.css
│   │   └── App.css
│   ├── App.js                  # Main app component
│   └── index.js                # ReactDOM rendering
├── .gitignore                  # Ignored files and directories
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Lock file for dependencies
└── README.md                   # Project documentation

## Usage 🚀
1. Add expenses by specifying the title, category, date and amount.
2. View the recent transactions, update edit or delete each transaction.
3. View real-time updates in the pie chart for each category.
4. View the top expenses based on category
5. Adjust the browser window to see the responsive design in action.


## Screenshots 📸

![Screenshot 2025-01-20 205653](https://github.com/user-attachments/assets/f408637a-8959-40a2-983d-d708ea6865b2)

## Future Enhancements 🔮

Integration with a backend API for persistent data storage.
User authentication for personalized expense tracking.
Enhanced analytics, such as monthly and yearly expense trends.

## Contributing 🤝
Contributions are welcome! Feel free to submit a pull request or open an issue to discuss potential changes.

## Acknowledgments 🙌
Recharts for the amazing charting library.
React.js for the powerful UI framework.

Author 👤
Rahul G

