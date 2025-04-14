import React, { useEffect, useState } from 'react'
import './statementDoc.css'
import EmailModal from '../emailModal/EmailModal';


function statementDoc({option, dateStart, dateEnd}) {

    const [accounts, setAccounts] = useState([]);
    const [openEmailModal, setOpenEmailtModal] = useState(false)

    useEffect(() => {
        fetchEverything()
    }, [])
    
    const fetchEverything = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/get_dashboard");
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
          <button title="Send a email here" className="addUserModalOpen-btn" id="tooltiptext" onClick={() => setOpenEmailtModal(true)}>
            Save
          </button>
          <button title="Send a email here" className="addUserModalOpen-btn send" id="tooltiptext" onClick={() => setOpenEmailtModal(true)}>
            Send Email
          </button>
        </div>
      </div>

      { trial &&
        <div>
          {option}
        </div>
      }

      { balance &&
        <div>
          {option}
        </div>
      }

      { earnings &&
        <div>
          {option}
        </div>
      }

      { income &&
        <div className='statement-container'>
          <div className="statement-title">
            <h1>{capitalizeFirst(option)} Statement</h1>
            <p>({fromStatement()})</p>
          </div>

          <div className="section revenue">
            <h3>Revenue</h3>
            {
              revenues.map((acc) =>(
                <div className="statement-account-container">
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
                <div className="statement-account-container">
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