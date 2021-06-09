import React from "react"
import PropTypes from "prop-types"
import './Member.css'

function Member( {image, name, city, display} ){
    if(display === "thum-event"){
        return (
            <div className="thum-event-member">
                <div className="thum-event-member-image">
                        <img src={image}></img>
                </div>
                <div className="thum-event-member-name">
                        <p className="member-name">{name}</p>
                        <p className="member-city">From {city}</p>
                </div>
            </div>
        )
    }
}

Member.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired
}

export default Member;