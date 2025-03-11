import React from 'react'
import { useEffect, useState } from "react";

function EventsTable() {

    const [events, setEvents] = useState([])

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/get_events");
            const data = await response.json();
            setEvents(data.allEvents);
        } catch (error) {
            console.error("Failed to fetch Events:", error);
            setEvents([]);  // Ensure events is always an array
        }
    };


  return (
    <div className="table-master-container">    
        <table>
            <caption>
                List of all events in system
            </caption>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Timestamp</th>
                    <th>User ID</th>
                    <th>Table</th>
                    <th>Column Name</th>
                    <th>Old value</th>
                    <th>New Value</th>
                    <th>Action</th>
                    <th>Comment</th>
                </tr>
            </thead>
            <tbody>
                {events.map((event) => (
                    <tr key={event.event_id}>
                        <td data-cell="ID"    >{event.event_id}</td>
                        <td data-cell="Timestamp"    >{event.timestamp}</td>
                        <td data-cell="User ID"    >{event.user_id}</td>
                        <td data-cell="Table"        >{event.table_name}</td>
                        <td data-cell="Column Name"        >{event.column_name}</td>
                        <td data-cell="Old Value"     >{event.old_value}</td>
                        <td data-cell="New Value"        >{event.new_value}</td>
                        <td data-cell="Action"        >{event.action}</td>
                        <td data-cell="Comment"        >{event.comment}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default EventsTable