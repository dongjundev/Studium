import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import './Event.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faThumbtack } from "@fortawesome/free-solid-svg-icons";

function Event( {title, description, date, location } ) {
    console.log("Event function: " + {title});
    return (
        <div className="event-thum">
            <div className="event-detail">
                <p className="event-date">{date}</p>
                <p className="event-title">{title}</p>
                <p className="event-description">{description}</p>
                
                <p className="event-location">
                <FontAwesomeIcon icon={faThumbtack} /> {location}
                </p>
            </div>
        </div>
    )
}

Event.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
}

export default Event;