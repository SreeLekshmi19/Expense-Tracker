// ===============================
// DOM ELEMENTS
// ===============================

const expenseForm = document.getElementById("expenseForm");
const transactionList = document.getElementById("transactionList");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const title = document.getElementById("title");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const type = document.getElementById("type");

const search = document.getElementById("search");
const filter = document.getElementById("filter");

const exportCSV = document.getElementById("exportCSV");
const themeBtn = document.getElementById("themeBtn");


// ===============================
// LOCAL STORAGE
// ===============================

let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

let editIndex = null;

let chart;


// ===============================
// SAVE TO LOCAL STORAGE
// ===============================

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}


// ===============================
// FORMAT CURRENCY
// ===============================

function formatMoney(value) {

    return "$" + Number(value).toFixed(2);

}


// ===============================
// UPDATE SUMMARY
// ===============================

function updateSummary() {

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(item => {

        if (item.type === "income") {

            totalIncome += Number(item.amount);

        } else {

            totalExpense += Number(item.amount);

        }

    });

    income.textContent = formatMoney(totalIncome);

    expense.textContent = formatMoney(totalExpense);

    balance.textContent =
        formatMoney(totalIncome - totalExpense);

}


// ===============================
// RENDER TRANSACTIONS
// ===============================

function renderTransactions() {

    transactionList.innerHTML = "";

    const keyword = search.value.toLowerCase();
    const filterValue = filter.value;

    const filtered = transactions
        .map((item, index) => ({ ...item, originalIndex: index }))
        .filter(item => {

            const matchTitle = item.title
                .toLowerCase()
                .includes(keyword);

            const matchType =
                filterValue === "all" ||
                item.type === filterValue;

            return matchTitle && matchType;
        });

    if (filtered.length === 0) {

        transactionList.innerHTML = `
            <div class="empty">
                <i class="fa-solid fa-wallet"></i>
                <p>No Transactions Found</p>
            </div>
        `;

        updateChart();
        return;
    }

    filtered.forEach(item => {

        const li = document.createElement("li");

        li.innerHTML = `

<div class="transaction-left">

<div class="transaction-title">
${item.title}
</div>

<div class="transaction-category">
${item.category}
</div>

</div>

<div class="transaction-right">

<div class="amount ${item.type}">
${item.type === "income" ? "+" : "-"}${formatMoney(item.amount)}
</div>

<span class="badge ${item.type}">
${item.type}
</span>

<div class="actions">

<button
class="edit-btn"
onclick="editTransaction(${item.originalIndex})">

<i class="fa-solid fa-pen"></i>

</button>

<button
class="delete-btn"
onclick="deleteTransaction(${item.originalIndex})">

<i class="fa-solid fa-trash"></i>

</button>

</div>

</div>

        `;

        li.style.borderLeftColor =
            item.type === "income"
                ? "#22c55e"
                : "#ef4444";

        transactionList.appendChild(li);

    });

    updateChart();
}


// ===============================
// ADD / UPDATE TRANSACTION
// ===============================

expenseForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const data = {

        title: title.value,

        amount: Number(amount.value),

        category: category.value,

        type: type.value

    };


    if (editIndex === null) {

        transactions.push(data);

    } else {

        transactions[editIndex] = data;

        editIndex = null;

        expenseForm.querySelector("button")
            .textContent = "Add Transaction";

    }

    saveTransactions();

    updateSummary();

    renderTransactions();

    expenseForm.reset();

});


// ===============================
// DELETE
// ===============================

function deleteTransaction(index) {

    if (confirm("Delete this transaction?")) {

        transactions.splice(index, 1);

        saveTransactions();

        updateSummary();

        renderTransactions();

    }

}


// ===============================
// EDIT
// ===============================

function editTransaction(index) {

    const item = transactions[index];

    title.value = item.title;

    amount.value = item.amount;

    category.value = item.category;

    type.value = item.type;

    editIndex = index;

    expenseForm.querySelector("button")
        .textContent = "Update Transaction";

}


// ===============================
// CHART.JS
// ===============================

function updateChart() {

    const totalIncome = transactions
        .filter(item => item.type === "income")
        .reduce((sum, item) => sum + Number(item.amount), 0);

    const totalExpense = transactions
        .filter(item => item.type === "expense")
        .reduce((sum, item) => sum + Number(item.amount), 0);

    const ctx = document
        .getElementById("expenseChart")
        .getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {

        type: "pie",

        data: {

            labels: ["Income", "Expense"],

            datasets: [{

                data: [totalIncome, totalExpense],

                backgroundColor: [
                    "#22c55e",
                    "#ef4444"
                ],

                borderWidth: 2

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {
                    position: "bottom"
                }

            }

        }

    });

}



// ===============================
// SEARCH
// ===============================

search.addEventListener("input", () => {

    renderTransactions();

});



// ===============================
// FILTER
// ===============================

filter.addEventListener("change", () => {

    renderTransactions();

});



// ===============================
// DARK MODE
// ===============================

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem(
            "theme",
            "dark"
        );

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem(
            "theme",
            "light"
        );

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});



// ===============================
// EXPORT CSV
// ===============================

exportCSV.addEventListener("click", () => {

    if (transactions.length === 0) {

        alert("No data available.");

        return;

    }

    let csv =
        "Title,Amount,Category,Type\n";

    transactions.forEach(item => {

        csv +=
            `${item.title},${item.amount},${item.category},${item.type}\n`;

    });

    const blob =
        new Blob([csv], {

            type: "text/csv"

        });

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download = "expenses.csv";

    a.click();

    URL.revokeObjectURL(url);

});



// ===============================
// INITIALIZE
// ===============================

updateSummary();

renderTransactions();



// ===============================
// SAMPLE DATA (OPTIONAL)
// Uncomment if you want demo data
// ===============================

/*

if(transactions.length===0){

transactions=[

{
title:"Salary",
amount:3000,
category:"Salary",
type:"income"
},

{
title:"Groceries",
amount:250,
category:"Food",
type:"expense"
},

{
title:"Netflix",
amount:15,
category:"Entertainment",
type:"expense"
}

];

saveTransactions();

updateSummary();

renderTransactions();

}

*/