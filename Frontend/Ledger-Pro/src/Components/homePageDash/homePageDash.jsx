import React from 'react'
import './homePageDash.css'
import { BiSolidUser, BiBookBookmark, BiSpreadsheet, BiSolidBank } from "react-icons/bi";

function homePageDash({currentUser}) {
  return (
    <div className='homepage-dash-con'>
        <div className="homepage-dash-content">
            <div className="homepage-dash-welcome-text">
                <h3>Welcome back {currentUser.firstName} {currentUser.lastName}!</h3>
            </div>
            <div className="panels-con">

                <div className="panel finacial-overview">
                    <p className="panel-titles">Finacial Overview</p>
                </div>  

                <div className="panel recent-activity">
                    <p className="panel-titles">Recent Activity</p>
                </div>  

                <div className="panel performance-ratios">
                    <p className="panel-titles">Performance/Ratios</p>
                </div>

                <div className="panel pie-breakdown">
                    <p className="panel-titles">Breakdowns</p>
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