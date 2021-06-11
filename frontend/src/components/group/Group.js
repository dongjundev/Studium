import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTags, faUsers } from "@fortawesome/free-solid-svg-icons";
import './Group.css'

function Group( {image, name, numOfMembers, tags, display} ) {
    if(display === "thum-main") {
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
    } else if(display === "thum-event") {
        return (
            <div className="group-thum-event">
                <div className="group-thum-event-image">
                    <img src={image}></img>
                </div>
                <div className="group-thum-event-detail">
                    <p className="group-name">{name}</p>
                    <p className="group-numbers">{numOfMembers} 명의 회원이 있습니다.</p>
                    <p>가입하고 함께 공부해보세요!</p>
                </div>
            </div>
        )
    } else if(display === "group-detail") {
        return (
            <div className="group-detail">
                <div className="group-detail-content-head">
                    <div className="content-head-image">
                        <img src={image}></img>
                    </div>
                    <div className="content-head-summary">
                        <h1>{name}</h1>
                        <p><FontAwesomeIcon icon={faTags} /> {tags}</p>
                        <p><FontAwesomeIcon icon={faUsers} /> 회원 {numOfMembers}명</p>
                    </div>
                </div>
                <div className="group-detail-tabs">
                    <ul>
                        <li className="on"><a href="#none">정보</a></li>
                        <li><a href="#none">이벤트</a></li>
                        <li><a href="#none">회원</a></li>
                        <li><a href="#none">사진</a></li>
                    </ul>
                    <button>이 그룹에 가입하기</button>
                </div>
                <div className="group-detail-content-body">
                    <div className="group-detail-overview">
                        <h3>활동 계획</h3>
                        <p>본 그룹은 AWS한국사용자모임의 정기 모임 및 소모임 운영 사이트로서 최신 활동 소식 및 행사를 올려드릴 예정입니다.</p>
                    </div>
                    <div className="group-detail-upcomingEvents">
                        <h3>예정된 이벤트</h3>
                    </div>
                    <div className="group-detail-passedEvents">
                        <h3>지난 이벤트</h3>
                    </div>
                    <div className="group-detail-photos">
                        <h3>사진</h3>
                    </div>
                </div>
            </div>
        )
    } else{
        return null;
    }
}

Group.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    numOfMembers: PropTypes.number,
    tags: PropTypes.string
}

export default Group;