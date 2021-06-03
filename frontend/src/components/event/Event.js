import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import './Event.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faThumbtack } from "@fortawesome/free-solid-svg-icons";

function Event( {title, description, date, location, display} ) {
    console.log("Event function: " + {title});
    if(display === "thum") {
        return (
            <div className="event-thum">
                <div className="event-thum-detail">
                    <p className="event-date">{date}</p>
                    <p className="event-title">{title}</p>
                    <p className="event-description">{description}</p>
                    <p className="event-location">
                        <FontAwesomeIcon icon={faThumbtack} /> {location}
                    </p>
                </div>
            </div>
        )
    } else if(display === "detail") {
        return (
            <div className="event-detail">
                <div className="content-hd">
                    <p>{date}</p>
                    <h1>[{title}]</h1>
                    <div className="event-host">
                        <div className="event-host-image">
                            <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"></img>
                        </div>
                        <div className="event-host-name">
                            <p style={{color:"grey"}}>Hosted by</p>
                            <p>Gunho K. and 4 others</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>???</div>
        )
    }
}

Event.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired
}

export default Event;