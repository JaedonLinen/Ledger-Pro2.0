import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {Chart} from "chart.js/auto";
import './homePageDash.css'
import { BiSolidUser, BiBookBookmark, BiSpreadsheet, BiSolidBank, BiChevronDown } from "react-icons/bi";

function homePageDash({currentUser}) {

    const navigate = useNavigate(); 

    const [events, setEvents] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchEverything()
    }, [])

    useEffect(() => {
        console.log("accounts: ", accounts)
    }, [accounts])
    
    const fetchEverything = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/get_dashboard");
            const data = await response.json();
            setEvents(data.events);
            setAccounts(data.accounts);
            setUsers(data.users);
        } catch (error) {
            console.error("Failed to fetch information:", error);
            setEvents([]);
            setAccounts([]);
            setUsers([]);
        }
    };

    const formatCurrency = (num) => {
        num = num.toString(); // Ensure it's a string for processing
    
        let isNegative = num.toString().startsWith("-") ? true : false; // Check if the number is negative
        if (isNegative) num = num.slice(1); // Remove the negative sign for formatting
    
        let parts = num.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas
    
        // Limit to two decimal places
        if (parts.length > 1) {
            parts[1] = parts[1].slice(0, 2);
        }

        let formatted = `$${parts.join(".")}`;
        return isNegative ? `-${formatted}` : formatted; // Re-add negative sign if needed
    };

    const formatPercentage = (value) => {
        if (typeof value !== "number") return "0%"; // Ensure value is a number
        return `${(value * 100).toFixed(2)}%`; // Multiplies by 100 and formats to 2 decimal places
      };



    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Finacial Overview~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    const inventory = accounts.filter(account =>
        (account.account_name.toLowerCase().includes("inventory") && account.category === "Assets") ||
        (account.account_name.toLowerCase().includes("goods") && account.category === "Assets") ||
        (account.account_name.toLowerCase().includes("stock") && account.category === "Assets")
    );
    const cash = accounts.filter(account =>
        (account.account_name.toLowerCase().includes("cash") && account.category === "Assets") ||
        (account.account_name.toLowerCase().includes("checking") && account.category === "Assets") ||
        (account.account_name.toLowerCase().includes("savings") && account.category === "Assets") ||
        (account.account_name.toLowerCase().includes("operating") && account.category === "Assets") ||
        (account.account_name.toLowerCase().includes("bank") && account.category === "Assets")
    );
    const incomes = accounts.filter(account => 
        (account.account_name.toLowerCase().includes("income") && account.category === "Revenue") ||
        (account.account_name.toLowerCase().includes("gains") && account.category === "Revenue") ||
        (account.account_name.toLowerCase().includes("revenue") && account.category === "Revenue")
    );
    const expenses = accounts.filter(account => account.category === "Expenses");
    const revenues = accounts.filter(account => account.category === "Revenue");

    const getBalance = (accounts) => {
        return accounts.reduce((total, account) => total + account.balance, 0);
    }

    const profit_loss = getBalance(revenues) - getBalance(expenses)
    const profit_margin = ((getBalance(revenues) - getBalance(expenses)) / getBalance(revenues))




    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Notifications~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    const getFirstTenNonAuthEvents = (events) => {
        
        // Exclude events that are 'login' or 'logout'
        const nonAuthEvents = events.filter(event => event.action !== 'added transaction entry to database' && event.action !== 'login' && event.action !== 'logout');
        
        // Sort the events with the newest first.
        nonAuthEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        // Return the first 10 events from the sorted array.
        return nonAuthEvents.slice(0, 10);
    };

    const recentActivity = getFirstTenNonAuthEvents(events, currentUser.id)

    const GetUserById = ({ id }) => {
        const user = users.find(user => user.user_id === id);
        return (user.firstName + " " + user.lastName)
    }

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const then = new Date(timestamp);
        const diffInSeconds = Math.floor((now - then) / 1000);
    
        if (diffInSeconds < 60) {
            return `${diffInSeconds}s ago`;
        }
    
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes}m ago`;
        }
    
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours}h ago`;
        }
    
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 365) {
            return `${diffInDays}d ago`;
        }
    
        const diffInYears = Math.floor(diffInDays / 365);
        return `${diffInYears}y ago`;
    }





   // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Breakdowns~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    const totalExpenses = expenses.reduce((total, account) => total + account.balance, 0);
    const totalIncomes = incomes.reduce((total, account) => total + account.balance, 0);

    const generateColors = (count) => {
        const colors = [];
        const saturation = 70; // percentage
        const lightness = 60; // percentage

        for (let i = 0; i < count; i++) {
            const hue = Math.floor((360 / count) * i); // evenly spaced around the color wheel
            colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
        }

        return colors;
    };

    const chartRefIncome = useRef(null);
    const chartInstanceIncome = useRef(null);

    const chartRefExpenses = useRef(null);
    const chartInstanceExpenses = useRef(null);

    useEffect(() => {
        // Only proceed if the canvas ref is available
        if (chartRefIncome.current && incomes.length > 0) {
            if (chartInstanceIncome.current) {
                chartInstanceIncome.current.destroy();
            }
            const myChartRef = chartRefIncome.current.getContext("2d");
    
            const incomeLabels = incomes.map(account => account.account_name);
            const incomeData = incomes.map(account => account.balance);
            const incomeColors = generateColors(incomeLabels.length);
    
            chartInstanceIncome.current = new Chart(myChartRef, {
                type: 'doughnut',
                data: {
                    labels: incomeLabels,
                    datasets: [{
                        data: incomeData,
                        backgroundColor: incomeColors,
                        hoverOffset: 4,
                        borderColor: 'rgba(255, 204, 86, 0)',
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,  // Allows full control via CSS
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            });
        }
        return () => {
            if (chartInstanceIncome.current) {
                chartInstanceIncome.current.destroy();
            }
        };
    }, [incomes]);  // Dependencies are updated only when 'incomes' changes
    
    useEffect(() => {
        // Only proceed if the canvas ref is available
        if (chartRefExpenses.current && expenses.length > 0) {
            if (chartInstanceExpenses.current) {
                chartInstanceExpenses.current.destroy();
            }
            const myChartRef = chartRefExpenses.current.getContext("2d");
    
            const expensesLabels = expenses.map(account => account.account_name);
            const expensesData = expenses.map(account => account.balance);
            const expensesColors = generateColors(expensesLabels.length);
    
            chartInstanceExpenses.current = new Chart(myChartRef, {
                type: 'doughnut',
                data: {
                    labels: expensesLabels,
                    datasets: [{
                        data: expensesData,
                        backgroundColor: expensesColors,
                        hoverOffset: 4,
                        borderColor: 'rgba(255, 204, 86, 0)',
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,  // Allows full control via CSS
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            });
        }
        return () => {
            if (chartInstanceExpenses.current) {
                chartInstanceExpenses.current.destroy();
            }
        };
    }, [expenses]);





    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Ratios~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const currentAssets = accounts.filter(account => account.subcategory === "Current Assets");
    const currentLiabilities = accounts.filter(account => account.subcategory === "Current Liabilites");
    const totalCurrentAssets = currentAssets.reduce((total, account) => total + account.balance, 0);
    const totalCurrentLiabilites = currentLiabilities.reduce((total, account) => total + account.balance, 0);

    const chartRefCurrentAsset = useRef(null);
    const chartInstanceCurrentLiabilties = useRef(null);
   
    useEffect(() => {
        // Only proceed if the canvas ref is available
        if (chartRefCurrentAsset.current && currentAssets.length > 0) {
            if (chartInstanceCurrentLiabilties.current) {
                chartInstanceCurrentLiabilties.current.destroy();
            }
            const myChartRef = chartRefCurrentAsset.current.getContext("2d");
    
            chartInstanceCurrentLiabilties.current = new Chart(myChartRef, {
                type: 'doughnut',
                data: {
                    labels: ["Liabilities", "Assets"],
                    datasets: [{
                        data: [totalCurrentLiabilites, totalCurrentAssets],
                        backgroundColor: [
                            'rgb(167, 65, 49)',
                            'rgb(67, 117, 39)'
                        ],
                        hoverOffset: 4,
                        borderColor: 'rgba(255, 204, 86, 0)',
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,  // Allows full control via CSS
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            });
        }
        return () => {
            if (chartInstanceCurrentLiabilties.current) {
                chartInstanceCurrentLiabilties.current.destroy();
            }
        };
    }, [currentAssets]);

    const debt = accounts.filter(account => account.category === "Liabilites");
    const equity = accounts.filter(account => account.category === "Equity");
    const totalDebt = debt.reduce((total, account) => total + account.balance, 0);
    const totalEquity = equity.reduce((total, account) => total + account.balance, 0);

    const chartRefDebtEquity = useRef(null);
    const chartInstanceDebtEquity = useRef(null);
    

    useEffect(() => {
        // Only proceed if the canvas ref is available
        if (chartRefDebtEquity.current && debt.length > 0) {
            if (chartInstanceDebtEquity.current) {
                chartInstanceDebtEquity.current.destroy();
            }
            const myChartRef = chartRefDebtEquity.current.getContext("2d");
    
            chartInstanceDebtEquity.current = new Chart(myChartRef, {
                type: 'doughnut',
                data: {
                    labels: ["Equity", "Debt"],
                    datasets: [{
                        data: [totalEquity, totalDebt],
                        backgroundColor: [
                            'rgb(67, 117, 39)',
                            'rgb(167, 65, 49)'
                        ],
                        hoverOffset: 4,
                        borderColor: 'rgba(255, 204, 86, 0)',
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,  // Allows full control via CSS
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            });
        }
        return () => {
            if (chartInstanceDebtEquity.current) {
                chartInstanceDebtEquity.current.destroy();
            }
        };
    }, [debt]);



    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Bottom Buttons~~~~~~~~~~~~~~~~~~~~~~~~~~~~`

    const handleNavigateAccounts = () => {
        if(currentUser.role === "Admin") {
            navigate("/Accounts_Landing", {state: { currentUser } })
        } else {
            navigate("/Accounts_List", {state: {currentUser} })  
        }  
    };

    const handleJournal = () => {
        navigate("/JournalLanding", {state: { currentUser } })  
    };

    const handleNavigateUsers = () => {
        navigate("/Users", { state: { currentUser } });
    };

    const handleNavigateStatements = () => {
        navigate("/Statements_menu", { state: { currentUser } });
    };




  return (
    <div className='homepage-dash-con'>
        <div className="homepage-dash-content">
            <div className="homepage-dash-welcome-text">
                <h3>Welcome back {currentUser.firstName} {currentUser.lastName}!</h3>
            </div>
            <div className="panels-con">

                <div className="panel finacial-overview">
                     <p className="panel-titles">Finacial Overview</p>
                     <div className="overview-container">
                        <div className="overview-section cash-avail">
                            <p className='overview-section-header'>Inventory</p>
                            <p className='overview-section-value'>{formatCurrency(getBalance(inventory))}</p>
                            <p className='overview-section-extra'>Worth of goods</p>
                        </div>
                        <div className="overview-section cash-avail">
                            <p className='overview-section-header'>Cash Availiable</p>
                            <p className='overview-section-value'>{formatCurrency(getBalance(cash))}</p>
                            <p className='overview-section-extra'>Cash and Bank</p>
                        </div>
                        <div className="overview-section profit-margin">
                            <p className='overview-section-header'>Profit Margin</p>
                            <p className={`overview-section-value margin ${profit_margin < 0 ? 'active' : ''}`}>{formatPercentage(profit_margin)}</p>
                        </div>
                        <div className="overview-section profit-loss">
                            <p className='overview-section-header main'>Profit/Loss</p>
                            <p className={`overview-section-value main ${profit_loss < 0 ? 'active' : ''}`}>{formatCurrency(profit_loss)}</p>
                        </div>
                     </div>
                </div>  

                <div className="panel recent-activity">
                    <p className="panel-titles">Recent Activity</p>
                    <div className="noti-container">
                    {recentActivity.map((event) => (
                        <div className="notification" key={event.event_id}>
                            <p>
                                {GetUserById(event.user_id)} {event.action}
                            </p>
                            <h1>{getTimeAgo(event.timestamp)}</h1>
                        </div>
                    ))}
                    </div>
                </div>  

                <div className="panel performance-ratios">
                    <p className="panel-titles">Current Ratios</p>
                    <div className="pie-charts">
                        <div className="chart income">
                            <p>Assets : Liabilites</p>
                            {incomes.length === 0 ? (
                                <p>No data, add tables to continue</p>  // Message when there is no data
                            ) : (
                                <div className="pie-chart">
                                    <p className='pie-chart-totals'>{formatCurrency(totalCurrentAssets)} : {formatCurrency(totalCurrentLiabilites)}</p>
                                    <canvas ref={chartRefCurrentAsset} />
                                </div>
                            )}
                        </div>
                        <div className="chart expense">
                            <p>Debit : Equity</p>
                            {expenses.length === 0 ? (
                                <p>No data, add tables to continue</p>  // Message when there is no data
                            ) : (
                                <div className="pie-chart">
                                    <p className='pie-chart-totals'>{formatCurrency(totalDebt)} : {formatCurrency(totalEquity)}</p>
                                    <canvas ref={chartRefDebtEquity} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="panel pie-breakdown">
                    <p className="panel-titles">Current Breakdowns</p>
                    <div className="pie-charts">
                        <div className="chart income">
                            <p>Incomes</p>
                            {incomes.length === 0 ? (
                                <p>No data, add tables to continue</p>  // Message when there is no data
                            ) : (
                                <div className="pie-chart">
                                    <p className='pie-chart-totals'>Total: {formatCurrency(totalIncomes)}</p>
                                    <canvas ref={chartRefIncome} />
                                </div>
                            )}
                        </div>
                        <div className="chart expense">
                            <p>Expenses</p>
                            {expenses.length === 0 ? (
                                <p>No data, add tables to continue</p>  // Message when there is no data
                            ) : (
                                <div className="pie-chart">
                                    <p className='pie-chart-totals'>Total: {formatCurrency(totalExpenses)}</p>
                                    <canvas ref={chartRefExpenses} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="panel view-more">
                    <p className="panel-titles">View More</p>
                    <div className="view-more-buttons">
                        <div className="view-more-button accounts" onClick={handleNavigateAccounts}>
                            <BiSolidBank size={40}/>
                            <p>View accounts</p>
                        </div>
                        <div className="view-more-button users" onClick={handleNavigateUsers}>
                            <BiSolidUser size={40}/>
                            <p>View users</p>
                        </div>
                        <div className="view-more-button journals" onClick={handleJournal}>
                            <BiBookBookmark size={40}/>
                            <p>View journals</p>
                        </div>
                        <div className="view-more-button events" onClick={handleNavigateStatements}>
                            <BiSpreadsheet size={40}/>
                            <p>View Statements</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default homePageDash