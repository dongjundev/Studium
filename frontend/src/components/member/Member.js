import React from "react"
import PropTypes from "prop-types"
import './Member.css'


function Member( {image, name, city, gender, display} ){
    let memberGender = "";
    if(gender !== undefined) {
        {gender === "F" ? memberGender="여성" : memberGender="남성"}
    }
    if(display === "thum-event"){
        return (
            <div className="container">
                <div className="thum-event-member-image">
                        <img src={image}></img>
                </div>
                <div className="thum-event-member-name">
                        <p className="member-name">{name}</p>
                        <p className="member-city">{city}</p>
                </div>
            </div>
        )
    } else if(display === "thum-group"){
        return (
            <div className="container">
                <div className="thum-group-member-image">
                        <img src={image}></img>
                </div>
                <div className="thum-group-member-name">
                        <p className="member-name">{name}</p>
                </div>
            </div>
        )
    } else if(display === "detail-inGroup"){
        return (
            <div className="detail-inGroup container">
                <h2>스터디 회원 정보</h2>
                <div className="detail-inGroup-image">
                    <img src={image} arl="" />
                </div>
                <div className="detail-inGroup-info">
                    <span>이름 : {name}</span>
                    <span>성별 : {memberGender}</span>
                    <span>지역 : {city}</span>
                </div>
            </div>
        )
    } else if(display === "mypage") {
        return (
            <div className="container">
                 <div className="detail-inGroup">
                    <h2>스터디 회원 정보</h2>
                    <div className="detail-inGroup-image">
                        <img src={image} arl="" />
                    </div>
                    <div className="detail-inGroup-info">
                        <span>이름 : {name}</span>
                        <span>성별 : {memberGender}</span>
                        <span>지역 : {city}</span>
                    </div>
                </div>
            </div>
        )
    }
}

Member.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    gender: PropTypes.string,
    city: PropTypes.string,
    display: PropTypes.string
}

export default Member;