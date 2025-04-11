import React, { useEffect, useState } from 'react'
import { BiRefresh, BiChevronsUp } from "react-icons/bi";
import './StatementLandingOptions.css'
import { useNavigate } from "react-router-dom";

function StatementLandingOptions({currentUser}) {

    const navigate = useNavigate();
    const [timePeriodOption, setTimePeriodOption] = useState(false)
    const [datesSelected, setDatesSelected] = useState(false)
    const [datesError, setDatesError] = useState(false)
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")

    const reset = () => {
        setTimePeriodOption(false)
        setDatesSelected(false)
        setDatesError(false)
        setDateStart("")
        setDateEnd("")
    }

    useEffect(() => {
        if (dateStart !== "" && dateEnd !== "") {
            if (new Date(dateEnd) < new Date(dateStart)) {
                setDatesError(true);
            } else {
                setDatesError(false);
                setDatesSelected(true)
            }
        }
    }, [dateStart, dateEnd]);

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

    const handleNavigation = (option) => {
        navigate("/Statement", { state: { 
            currentUser, 
            option: option,
            dateStart: dateStart,
            dateEnd: dateEnd
        }});  
    }

  return (
    <div>
        { !timePeriodOption && !datesSelected &&
            <div className="time-options-container">
                <div>
                    <h1>Pick an option:</h1>
                    <div className="time-options">
                        <p onClick={() => setTimePeriodOption(true)}>Select a time period</p>
                        <p onClick={() => ( setDateStart(""), setDateEnd(""), setDatesSelected(true))}>View All</p>
                    </div>
                </div>
            </div>
        }

        {timePeriodOption && !datesSelected &&
            <div>
                <div className="dates-container">
                    <div className="time-periods">
                        <p>Time period start: </p>
                        <div className="date-input-container">
                            <input type="date" className={`date-input ${dateStart !== "" ? "active" : ""}`} onChange={(e) => setDateStart(e.target.value)}/>
                        </div>
                    </div>
                    <div className="dates-middle-bttns">
                        <div className="refresh-dates-container" onClick={() => (setDateStart(""), setDateEnd(""), setDatesError(false))}>
                            <BiRefresh size={30}/>
                        </div>
                        <div className="refresh-dates-container restart" onClick={() => reset()}>
                            <BiChevronsUp size={30}/>
                        </div>
                    </div>
                    
                    <div className="time-periods">
                        <p>Time period end: </p>
                        <div className="date-input-container">
                            <input type="date" className={`date-input ${dateEnd !== "" ? "active" : ""}`} onChange={(e) => setDateEnd(e.target.value)}/>
                        </div>
                    </div>
                </div>

                { datesError &&
                    <p className='dates-error'>*Error: End period must be after start period!</p>
                }
            </div>
        }
        { datesSelected &&
            <div className="reset-time-container">
                <h1>Please select a statement</h1>
                <p onClick={() => reset()}>Reset Time Period</p>
                <div className="from-to">
                    <h5>{formatDate(dateStart)} - {formatDate(dateEnd)}</h5>
                </div>
            </div>
        }
        { datesSelected && !datesError &&
            <div className="statement-landing-options-container">
                <div className="statement-option Create" onClick={() => handleNavigation("trial")}>
                    <div className="option-text-container">
                        <p>Trial Balance</p>
                    </div>
                </div>
                <div className="statement-option income" onClick={() => handleNavigation("income")}>
                    <div className="option-text-container">
                        <p>Income Statement</p>
                    </div>
                </div>
                <div className="statement-option Create" onClick={() => handleNavigation("balance")}>
                    <div className="option-text-container">
                        <p>Balance Sheet</p>
                    </div>
                </div>
                <div className="statement-option earnings" onClick={() => handleNavigation("earnings")}>
                    <div className="option-text-container">
                        <p>Retained Earnings</p>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default StatementLandingOptions