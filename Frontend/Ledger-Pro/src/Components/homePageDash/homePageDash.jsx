import React, { useEffect, useState, useRef } from 'react'
import {Chart} from "chart.js/auto";
import './homePageDash.css'
import { BiSolidUser, BiBookBookmark, BiSpreadsheet, BiSolidBank, BiChevronDown } from "react-icons/bi";

function homePageDash({currentUser}) {

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




    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Finacial Overview~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    const [changeQueryValue, setChangeQueryValue] = useState(false)
    const [queryValue, setQueryValue] = useState("All")
    const queryOptions = ["All", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];





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
        return `${diffInDays}d ago`;
    }





   // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Breakdowns~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    const expenses = accounts.filter(account => account.category === "Expenses");
    const incomes = accounts.filter(account => account.category === "Equity");
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


  return (
    <div className='homepage-dash-con'>
        <div className="homepage-dash-content">
            <div className="homepage-dash-welcome-text">
                <h3>Welcome back {currentUser.firstName} {currentUser.lastName}!</h3>
            </div>
            <div className="panels-con">

                <div className="panel finacial-overview">
                    <div className="breakdown-title">
                        <p className="panel-titles">Finacial Overview</p>
                        <div className="query-selector" onClick={() => setChangeQueryValue(!changeQueryValue)}>
                            <BiChevronDown size={20}/>
                            <p>{queryValue}</p>
                            { changeQueryValue &&
                                <div className="query-options">
                                    {queryOptions.map((option, index) => (
                                        <p key={index} onClick={() => setQueryValue(option)}>{option}</p>
                                    ))}
                                </div>
                            }
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
                    <p className="panel-titles">Performance/Ratios</p>
                </div>

                <div className="panel pie-breakdown">
                    <p className="panel-titles">Breakdowns</p>
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
                        <div className="view-more-button accounts">
                            <BiSolidBank size={40}/>
                            <p>View accounts</p>
                        </div>
                        <div className="view-more-button users">
                            <BiSolidUser size={40}/>
                            <p>View users</p>
                        </div>
                        <div className="view-more-button journals">
                            <BiBookBookmark size={40}/>
                            <p>View journals</p>
                        </div>
                        <div className="view-more-button events">
                            <BiSpreadsheet size={40}/>
                            <p>View events log</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default homePageDash