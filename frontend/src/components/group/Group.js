import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTags, faUsers } from "@fortawesome/free-solid-svg-icons";
import Member from '../member/Member'
import Event from '../event/Event'
import './Group.css'

function Group ( {id, image, name, description, memberCnt, tag, display, members, events} ) {
    if(display === "thum-main") {
        return (
            <div>
                <div className="group-image">
                    <img src={image}></img>
                </div>
                <div className="group-detail">
                    <p className="group-tags">{tag}</p>
                    <p className="group-name">{name}</p>
                    <p className="group-numbers">{memberCnt} 명의 회원이 있습니다.</p>
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
                    <p className="group-numbers">{memberCnt} 명의 회원이 있습니다.</p>
                    <p>가입하고 함께 공부해보세요!</p>
                </div>
            </div>
        )
    } else if(display === "group-detail") {
        return (
            <div>
                <div className="group-detail-content-head">
                    <div className="content-head-image">
                        <img src={image}></img>
                    </div>
                    <div className="content-head-summary">
                        <h1>{name}</h1>
                        <p><FontAwesomeIcon icon={faTags} /> {tag}</p>
                        <p><FontAwesomeIcon icon={faUsers} /> 회원 {memberCnt}명</p>
                        {members.some(member => (
                            member.memberId === "test"
                        )) ? <button id="create-event">이벤트 만들기</button> : <button id="join">스터디 가입하기</button>}
                    </div>
                </div>
                {/* <div className="group-detail-tabs">
                    <ul>
                        <li id="inof" className="on" onClick={this.showInfo}><a href="#">정보</a></li>
                        <li id="events"><Link to={id+"/events"}>이벤트</Link></li>
                        <li id="photos"><Link to={id+"/photos"}>사진</Link></li>
                    </ul>
                    <button>이 그룹에 가입하기</button>
                </div> */}
                <div className="group-detail-content-body">
                    <div className="group-detail-overview">
                        <h3>스터디 소개</h3>
                        <p>{description}</p>
                    </div>
                    <div className="group-members">
                        <h3>스터디 멤버</h3>
                        <div className="members-thum">
                            {members.map(member => (
                                <div className="thum-group-member" key={member.memberId}>
                                    <Link to={{
                                        pathname: '/member/' + member.memberId,
                                        state: {
                                            image: member.memberImage,
                                            name: member.memberName,
                                            gender: member.memberGender,
                                            city: member.memberAddress,
                                            display: "detail-inGroup"
                                        }
                                    }}>
                                        <Member
                                            image = {member.memberImage}
                                            name = {member.memberName}
                                            display = "thum-group"
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="group-detail-upcomingEvents">
                        <h3>이벤트</h3>
                        {events.map(event => (
                                <div className="thum-group-wrap" key={event.eventId}>
                                <Link to={{
                                    pathname: '/event/' + event.eventId,
                                    state: {
                                        display: "event-detail"
                                    }
                                }}>
                                    <Event
                                        title = {event.eventName}
                                        date = {event.eventDate}
                                        location = {event.eventLocation}
                                        description = {event.description}
                                        display = "thum-group"
                                    />
                                </Link>
                            </div>
                            ))}
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
    name: PropTypes.string,
    memberCnt: PropTypes.number,
    tag: PropTypes.string,
    display: PropTypes.string,
    members: PropTypes.array
}

export default Group;