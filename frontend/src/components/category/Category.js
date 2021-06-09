import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import './Category.css'

function Category( {thumbnail, name} ) {
    return (
        <div className="category-thum">
            <div className="category-thumbnail">
                <img src={thumbnail} alt="category-thumnail"></img>
            </div>
            <p>{name}</p>
        </div>
    )
}

Category.propTypes = {
    thumbnail: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default Category;