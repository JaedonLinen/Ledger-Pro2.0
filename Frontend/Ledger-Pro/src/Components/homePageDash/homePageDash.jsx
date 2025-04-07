import React, { useEffect, useState } from 'react'
import './homePageDash.css'
import { BiSolidUser, BiBookBookmark, BiSpreadsheet, BiSolidBank } from "react-icons/bi";

function homePageDash({currentUser}) {

    const [events, setEvents] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchEverything()
    }, [])
    
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

    const getFirstTenNonAuthEvents = (events) => {
        
        // Exclude events that are 'login' or 'logout'
        const nonAuthEvents = events.filter(event => event.action !== 'added transaction entry to database' && event.action !== 'login' && event.action !== 'logout');
        
        // Sort the events with the newest first.
        nonAuthEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        // Return the first 10 events from the sorted array.
        return nonAuthEvents.slice(0, 10);
    };

    const recentActivity = getFirstTenNonAuthEvents(events, currentUser.id)

    useEffect(() => {
        console.log("recent activity:", recentActivity)
    }, [recentActivity])

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
                    <div className="noti-container">
                        {recentActivity.map((event) => (
                            <div className="notification">
                                <p key={event.event_id}>
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