import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import './Category.css'

function Category( {image, name} ) {
    return (
        <div className="category-thum">
            <div className="category-image">
                <Link to="none">
                    <img src={image}></img>
                </Link>
            </div>
            <p>{name}</p>
        </div>
    )
}

Category.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default Category;