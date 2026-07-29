# 💰 Expense Tracker

A modern and responsive **Expense Tracker** web application that helps users manage their personal finances by tracking income and expenses. The application provides a clean dashboard, real-time balance updates, transaction history, and interactive charts, making it easy to monitor spending habits and financial health.

---

## 🚀 Features

* ➕ Add income and expense transactions
* ✏️ Edit existing transactions
* 🗑️ Delete transactions
* 📊 Dashboard displaying Total Balance, Total Income, and Total Expenses
* 🔍 Search transactions by title
* 🏷️ Filter transactions by Income or Expense
* 🥧 Interactive Pie Chart using Chart.js
* 🌙 Dark Mode with theme persistence
* 💾 Data persistence using Local Storage
* 📄 Export transaction history as a CSV file
* 📱 Fully responsive design for desktop, tablet, and mobile devices

---

## 🛠️ Tech Stack

* **HTML5** – Structure and layout
* **CSS3** – Styling, responsive design, animations, and dark mode
* **JavaScript (ES6)** – Application logic, DOM manipulation, CRUD operations, Local Storage, search, filtering, and CSV export
* **Chart.js** – Interactive pie chart visualization
* **Font Awesome** – Icons

---

## 📂 Project Structure

```text
expense-tracker/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
```

---

## ▶️ How to Run

1. Download or clone this repository.

```bash
git clone https://github.com/your-username/expense-tracker.git
```

2. Open the project folder.

3. Double-click **index.html** or open it with a web browser.

**OR**

Use the VS Code **Live Server** extension:

* Open the project in Visual Studio Code.
* Install the **Live Server** extension (if not already installed).
* Right-click **index.html**.
* Select **Open with Live Server**.

The application will launch in your default web browser.

---

## 📖 How It Works

1. Enter the transaction title.
2. Enter the amount.
3. Select a category.
4. Choose whether it is **Income** or **Expense**.
5. Click **Add Transaction**.
6. The dashboard automatically updates the balance, income, expense totals, and pie chart.
7. Use the search and filter options to quickly find transactions.
8. Edit or delete any transaction as needed.
9. Export all transactions as a CSV file for record keeping.

---

## 💾 Data Storage

All transaction data is stored in the browser using **Local Storage**, allowing information to persist even after refreshing or reopening the browser. No external database or backend server is required.
