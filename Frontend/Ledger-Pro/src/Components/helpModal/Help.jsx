import React from 'react'
import { BiX, BiLabel} from "react-icons/bi";
import './help.css'

export default function help({closeModal}) {
  return (
    <div className="modal-container" >
        <div className="modal-help">
            <div className="exit-btn-container">
                <BiX className="userModal-exit-btn" size='35' onClick={closeModal}/>
            </div>
            <div className="help-info-container">
                <div className="help-title">
                    <h1>Help</h1>
                </div>
                <div className="nav">
                    <div className="section-title-help">
                        <BiLabel />
                        <h2 className="page">Navigation Menu</h2>  
                    </div>
                    <h3>Logo</h3>
                    <p className="help-text">- Click the logo to naviagate to Home page</p>
                    <h3>Accounts option</h3>
                    <p className="help-text">- Click the 'Accounts' button to naviagate to accounts landing page where you will be prompted to either create or view account</p>
                    <h3>Users option</h3>
                    <p className="help-text">- Click the 'Users' button to naviagate to accounts landing page where you will be prompted to either create or view account</p>
                    <h3>Events option (Admin Only)</h3>
                    <p className="help-text">- Click the 'Events' button to naviagate to events page where you can view all events that have happened in database</p>
                    <h3>Metrics option</h3>
                    <p className="help-text">- Click the 'Metrics' button to naviagate to page to view overall metrics</p>
                </div>
                <div className="home">
                    <div className="section-title-help">
                        <BiLabel />
                        <h2 className="page">Home Page</h2>  
                    </div>
                    <p className="help-text">- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores facere amet error? Eveniet, veritatis totam eaque incidunt est, voluptas sequi nulla optio odio error ipsum dolorum nesciunt aliquid? Aperiam, reprehenderit.</p>
                </div>
                <div className="Accounts">
                    <div className="section-title-help">
                        <BiLabel />
                        <h2 className="page">Accounts Landing Page</h2>  
                    </div>
                    <p className="help-text">- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores facere amet error? Eveniet, veritatis totam eaque incidunt est, voluptas sequi nulla optio odio error ipsum dolorum nesciunt aliquid? Aperiam, reprehenderit.</p>
                </div>
                <div className="Create Accounts">
                    <div className="section-title-help">
                        <BiLabel />
                        <h2 className="page">Create Accounts Page</h2>  
                    </div>
                    <p className="help-text">- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores facere amet error? Eveniet, veritatis totam eaque incidunt est, voluptas sequi nulla optio odio error ipsum dolorum nesciunt aliquid? Aperiam, reprehenderit.</p>
                </div>
                <div className="Accounts Table">
                    <div className="section-title-help">
                        <BiLabel />
                        <h2 className="page">Accounts Table Page</h2>  
                    </div>
                    <p className="help-text">- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores facere amet error? Eveniet, veritatis totam eaque incidunt est, voluptas sequi nulla optio odio error ipsum dolorum nesciunt aliquid? Aperiam, reprehenderit.</p>
                </div>
            </div>
        </div>
    </div>
  )
}
