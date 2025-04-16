import React, { useEffect, useState, useRef } from 'react'
import './statementDoc.css'
import EmailModal from '../emailModal/EmailModal';
import html2pdf from 'html2pdf.js';


function statementDoc({option, dateStart, dateEnd}) {

  const pdfRef = useRef();

  const handleDownloadPDF = () => {
    const element = pdfRef.current;
    html2pdf().from(element).save();
  };



  const [accounts, setAccounts] = useState([]);
  const [openEmailModal, setOpenEmailtModal] = useState(false)

  useEffect(() => {
      fetchEverything()
  }, [])
  
  const fetchEverything = async () => {
    try {
        const response = await fetch("https://render-flask-deployment-ivut.onrender.com/get_dashboard");
        const data = await response.json();
        setAccounts(data.accounts);
    } catch (error) {
        console.error("Failed to fetch information:", error);
        setAccounts([]);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return "All";
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  const fromStatement = () => {
    if (dateStart == "" || dateEnd == "") {
      return "All"
    } else {
      return `${formatDate(dateStart)} - ${formatDate(dateEnd)}`
    }
  }

  const [trial, setTrial] = useState(false)
  const [income, setIncome] = useState(false)
  const [balance, setBalance] = useState(false)
  const [earnings, setEarnings] = useState(false)

  useEffect(() => {
    const setRest = () => {
      setTrial(false);
      setIncome(false);
      setBalance(false);
      setEarnings(false);
    };
  
    if (option === "trial") {
      setRest();
      setTrial(true);
    } else if (option === "income") {
      setRest();
      setIncome(true);
    } else if (option === "balance") {
      setRest();
      setBalance(true);
    } else if (option === "earnings") {
      setRest();
      setEarnings(true);
    }
  }, [option]); // only runs when `option` changes

  const capitalizeFirst = (word) => {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
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

  const getBalance = (accounts) => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  }


  //~~~~~~~~~~~~~~~~~~~~~~~~~~~Income Statement~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const expenses = accounts.filter(account => account.category === "Expenses");
  const taxesExpenses = accounts.filter(account => (account.account_name.toLowerCase().includes("tax") && account.category === "Expenses"));
  const revenues = accounts.filter(account => account.category === "Revenue");

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~Trial Balance~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const debitAccounts = accounts.filter(account => account.normal_side === "Debit");
  const creditAccounts = accounts.filter(account => account.normal_side === "Credit");

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~Retained Earnings~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const dividends = accounts.filter(account => (account.account_name.toLowerCase().includes("dividend") && account.category === "Equity"));

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~Balance Sheet~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const assets = accounts.filter(account => account.category === "Assets");
  const liabilties = accounts.filter(account => account.category === "Liabilites");
  const equity = accounts.filter(account => account.category === "Equity");

  return (
    <div>
      <div>
        { 
          openEmailModal &&
          <EmailModal 
            closeModal={() => setOpenEmailtModal(false)}
          />
        }
        <div className="top-right-buttons" id="tooltip">
          <button title="Send a email here" className="addUserModalOpen-btn" id="tooltiptext" onClick={() => handleDownloadPDF()}>
            Save
          </button>
          <button title="Send a email here" className="addUserModalOpen-btn send" id="tooltiptext" onClick={() => setOpenEmailtModal(true)}>
            Send Email
          </button>
        </div>
      </div>

      { trial &&
        <div ref={trial ? pdfRef : null} className='statement-container'>
          <div className="statement-title">
            <h1>{capitalizeFirst(option)} Balance</h1>
            <p>({fromStatement()})</p>
          </div>

          <div className="trial-table-titles">
            <div className="trial-table-titles-start">
              <p>Account Name</p>
            </div>
            <div className="trial-table-titles-others">
              <p>Debit</p>
              <p>Credit</p>
            </div>
          </div>
          <div className="underline space"></div>

          {
            accounts.map((acc) =>(
            <div key={acc.account_id || acc.account_name} className="statement-account-container trail">
              <p>{acc.account_name}</p>
              <div className={`debit-credit-side ${acc.normal_side === 'Debit' ? 'active' : ''}`}>
                <p>{formatCurrency(acc.balance)}</p>
              </div>
            </div>
          ))}
          <div className="underline"></div>

          <div className="trial-table-titles">
            <div className="trial-table-titles-start">
              <h3>Totals:</h3>
            </div>
            <div className="trial-table-titles-others">
              <h3>{formatCurrency(getBalance(debitAccounts))}</h3>
              <h3>{formatCurrency(getBalance(creditAccounts))}</h3>
            </div>
          </div>

          <div className="trial-balance">
            <h3>Balance: </h3>
            <h2>{formatCurrency( getBalance(debitAccounts) - getBalance(creditAccounts))}</h2>
          </div>
        </div>
      }

      { balance &&
        <div ref={balance ? pdfRef : null} className='statement-container'>
        <div className="statement-title">
          <h1>{capitalizeFirst(option)} Sheet</h1>
          <p>({fromStatement()})</p>
        </div>

        <div className="section revenue">
          <h3>Assets</h3>
          {
            assets.map((acc) =>(
              <div key={acc.account_id || acc.account_name} className="statement-account-container">
                <p>{acc.account_name}</p>
                <p>{formatCurrency(acc.balance)}</p>
              </div>
          ))}
        </div>

        <div className="underline"></div>
          <div className="total revenue">
            <h3>Total Assets:</h3>
            <h3>{formatCurrency(getBalance(assets))}</h3>
          </div>
        <div className="underline"></div>

        <div className="section expenses">
          <h3>Liabilties</h3>
          {
            liabilties.map((acc) =>(
              <div key={acc.account_id || acc.account_name} className="statement-account-container">
                <p>{acc.account_name}</p>
                <p>{formatCurrency(acc.balance)}</p>
              </div>
          ))}
        </div>

        <div className="underline"></div>
          <div className="total revenue">
            <h3>Total Liablities:</h3>
            <h3>{formatCurrency(getBalance(liabilties))}</h3>
          </div>
        <div className="underline"></div>

        <div className="section expenses">
          <h3>Equity</h3>
          {
            equity.map((acc) =>(
              <div key={acc.account_id || acc.account_name} className="statement-account-container">
                <p>{acc.account_name}</p>
                <p>{formatCurrency(acc.balance)}</p>
              </div>
          ))}
        </div>

        <div className="underline"></div>
          <div className="total revenue">
            <h3>Total Equity:</h3>
            <h3>{formatCurrency(getBalance(equity))}</h3>
          </div>
        <div className="underline"></div>

        <div className="statement-ending"></div>
      </div>
      }

      { earnings &&
        <div ref={earnings ? pdfRef : null} className='statement-container'>
          <div className="statement-title">
            <h1>Retained {capitalizeFirst(option)}</h1>
            <p>({fromStatement()})</p>
          </div>

          <div className="section revenue">
            <div className="incomes">
              <p>Revenue:</p>
              <p>{formatCurrency(getBalance(revenues))}</p>
            </div>
            <div className="incomes">
              <p>Expenses:</p>
              <p>{formatCurrency(getBalance(expenses))}</p>
            </div>
            <div className="incomes">
              <p>Income tax expenses:</p>
              <p>{formatCurrency(getBalance(taxesExpenses))}</p>
            </div>
          </div>
          <div className="underline"></div>

          <div className="total revenue">
            <h3>Net Income:</h3>
            <h3>{formatCurrency((getBalance(revenues) - getBalance(expenses)) - getBalance(taxesExpenses))}</h3>
          </div>
          <div className="underline"></div>

          <div className="section revenue">
            <div className="incomes">
              <p>Dividends:</p>
              <p>{formatCurrency(getBalance(dividends))}</p>
            </div>
          </div>
          <div className="underline"></div>

          <div className="total revenue">
            <h3>Retained Earnings:</h3>
            <h3>{formatCurrency(((getBalance(revenues) - getBalance(expenses)) - getBalance(taxesExpenses)) - getBalance(dividends))}</h3>
          </div>

        </div>
      }

      { income &&
        <div ref={income ? pdfRef : null} className='statement-container'>
          <div className="statement-title">
            <h1>{capitalizeFirst(option)} Statement</h1>
            <p>({fromStatement()})</p>
          </div>

          <div className="section revenue">
            <h3>Revenue</h3>
            {
              revenues.map((acc) =>(
                <div key={acc.account_id || acc.account_name} className="statement-account-container">
                  <p>{acc.account_name}</p>
                  <p>{formatCurrency(acc.balance)}</p>
                </div>
            ))}
          </div>

          <div className="underline"></div>
            <div className="total revenue">
              <h3>Total Revenue:</h3>
              <h3>{formatCurrency(getBalance(revenues))}</h3>
            </div>
          <div className="underline"></div>

          <div className="section expenses">
            <h3>Expenses</h3>
            {
              expenses.map((acc) =>(
                <div key={acc.account_id || acc.account_name} className="statement-account-container">
                  <p>{acc.account_name}</p>
                  <p>{formatCurrency(acc.balance)}</p>
                </div>
            ))}
          </div>

          <div className="underline"></div>
            <div className="total revenue">
              <h3>Total Expenses:</h3>
              <h3>{formatCurrency(getBalance(expenses))}</h3>
            </div>
          <div className="underline"></div>

            <div className="incomes first">
              <h3 className='h3-title'>Income before taxes:</h3>
              <h3 className='h3-value'>{formatCurrency(getBalance(revenues) - getBalance(expenses))}</h3>
            </div>
            <div className="incomes">
              <h3>Income tax expenses:</h3>
              <h3>{formatCurrency(getBalance(taxesExpenses))}</h3>
            </div>

            <div className="underline"></div>
              <div className="total revenue">
                <h3>Net Income:</h3>
                <h3>{formatCurrency((getBalance(revenues) - getBalance(expenses)) - getBalance(taxesExpenses))}</h3>
              </div>
            <div className="underline"></div>

            <div className="statement-ending"></div>
        </div>
      }


    </div>
  )
}

export default statementDoc