import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import './Group.css'

function Group( {image, name, numOfMembers, tags} ) {
    return (
        <div className="group-thum">
            <div className="group-image">
                <img src={image}></img>
            </div>
            <div className="group-detail">
                <p className="group-tags">{tags}</p>
                <p className="group-name">{name}</p>
                <p className="group-numbers">{numOfMembers} 명의 회원이 있습니다.</p>
            </div>
        </div>
    )
}

Group.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    numOfMembers: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired
}

export default Group;