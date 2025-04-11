import React, { useState } from 'react'

function StatementLandingOptions() {

    const [dateStart, setDateStart] = useState()
    const [dateEnd, setDateEnd] = useState()

    const handleNavigation = (option) => {

    }

  return (
    <div>
        <div className="account-landing-options-container">
            <div className="account-option Create" onClick={handleNavigation("trial")}>
                <div className="option-text-container">
                    <p>Trial Balance</p>
                </div>
            </div>
            <div className="account-option View" onClick={handleNavigation("income")}>
                <div className="option-text-container">
                    <p>Income Statement</p>
                </div>
            </div>
            <div className="account-option Create" onClick={handleNavigation("balance")}>
                <div className="option-text-container">
                    <p>Balance Sheet</p>
                </div>
            </div>
            <div className="account-option View" onClick={handleNavigation("earnings")}>
                <div className="option-text-container">
                    <p>Retained Earnings</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StatementLandingOptions