import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import './Event.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMapMarkedAlt, faSearch, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import Group from '../group/Group'
import Member from '../member/Member'
import axios from "axios";

function Event( {image, title, description, date, location, attendants, study, display} ) {

    let isMemberInEvent = false;
    if(attendants !== undefined){
        attendants.some(attendant => (attendant.memberId === sessionStorage.getItem('memberId'))) ?
        isMemberInEvent = true :
        isMemberInEvent = false;
    }

    async function joinEvent(){
        if(study.memberId.split(",").some(memberId => memberId === sessionStorage.getItem('memberId'))){
            const url = "http://localhost:8080" + window.location.pathname + "/join.do";
            if(window.confirm("참석하시겠습니까?")){
                const data = await axios.get(url)
                data.data === "ok" ? alert("참석이 완료되었습니다.") : alert("로그인이 필요합니다.") ;
                data.data === "ok" ?  isMemberInEvent = true : isMemberInEvent = false ;
                window.location.replace(window.location.pathname);
            }
        } else {
            if(window.confirm("참석전 스터디 가입이 필요합니다")){
                console.log("가입할래요");
            } else{
                console.log("싫어요");
            }
        }
    }
    if(display === "thum-main") {
        return (
            <div>
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
    } else if(display === "thum-group"){
        return (
            <div>
                <div className="thum-group">
                    <p className="event-date">{date}</p>
                    <p className="event-title">{title}</p>
                    <p className="event-location">
                        <FontAwesomeIcon icon={faThumbtack} /> {location}
                    </p>
                </div>
            </div>
        )
    } else if(display === "event-detail") {
        return (
            <div className="event-detail">
                <div className="content-hd">
                    <p>{date}</p>
                    <h1>[{title}]</h1>
                    <div className="event-host">
                        <div className="event-host-image">
                            {attendants[0] === undefined ? "Loading.." : <img src={attendants[0].memberImage}></img>}
                        </div>
                        <div className="event-host-name">
                            <p style={{color:"grey"}}>Hosted by</p>
                            {attendants[0] === undefined ? "Loading.." : <p>{attendants[0].memberName}</p>}
                        </div>
                    </div>
                </div>
                <div className="content-bd">
                    <div className="content-bd-main">
                        <div className="main-image">
                            <img src="https://kung.kr/files/attach/images/3830964/814/596/007/bec42d29f1665ebc059ea81ada6b4611.jpg"></img>
                        </div>
                        <div className="main-description">
                            <h3>세부사항</h3>
                            <p>{description}</p>
                            {/* <p>
                                Saturday Morning English Talk Time at Hongdae<br />
                                <br />
                                Location?: Hongdae Terrace 서교동[masked] Floor<br />
                                When?: 11:00 ~ 13:00 on Saturdays<br />
                                <br />
                                Inclusions:<br />
                                2 drinks on the menu *Some drinks can’t be available in the morning<br />
                                2 hours of meetup on Saturday morning hosted by Seohee<br />
                                Chance to speak daily conversation to social issues<br />
                                Get some information about go-to restaurants and places from locals<br />
                                2 hours of social meetup following this event<br />
                                <br />
                                Event Description:<br />
                                Short summary / hook of the meetup:<br />
                                Good morning! GSM Hongdae opens a brand-new morning English speaking group finally.<br />
                                Come and join us and share your opinions on various topics from real-life topics to current issues.<br />
                            </p> */}
                        </div>
                        <div className="main-attendants">
                            <h3>참석자</h3>
                            <div className="attendants-member">
                                {attendants.map(attendant => (
                                    <div className="thum-event-member" key={attendant.memberId}>
                                        <Link to={{
                                            pathname: '/member/' + attendant.memberId,
                                            state: {
                                                image: attendant.memberImage,
                                                name: attendant.memberName,
                                                gender: attendant.memberGender,
                                                city: attendant.memberAddress,
                                                display: "detail-inGroup"
                                            }
                                        }}>
                                            <Member
                                                image = {attendant.memberImage}
                                                name = {attendant.memberName}
                                                city = {attendant.memberAddress}
                                                display = "thum-event"
                                            />
                                        </Link>
                                    </div>
                                ))} 
                            </div>
                        </div>
                        <div className="main-join">
                            <div className="main-join-left">
                                <p>{date}</p>
                                <h3>{title}</h3>
                            </div>
                            <div className="main-join-right">
                                {isMemberInEvent ? "" : <button onClick={joinEvent}>참석하기</button>}
                            </div>
                        </div>
                    </div>
                    <div className="content-bd-side">
                        <div className="side-group">
                            <Group
                                image = {study.studyImage}
                                name = {study.studyName}
                                memberCnt = {study.memberCnt}
                                tags = {study.studyTag}
                                display = {"thum-event"}
                            />
                        </div>
                        <div className="side-summary">
                            <div className="summary-date">
                                <p><FontAwesomeIcon icon={faClock} /> {date}</p>
                            </div>
                            <div className="summary-location">
                                <p><FontAwesomeIcon icon={faMapMarkedAlt} /> {location}</p>
                            </div>
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
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
    attendents: PropTypes.array,
    group: PropTypes.array,
    display: PropTypes.string,
}

// Need these API calls to fetch data 
// 1. host's info -> content head
// 2. group's info -> content body / side
// 3. members who will be attend -> content body / main

export default Event;