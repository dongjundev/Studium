import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import './Event.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMapMarkedAlt, faSearch, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import Group from '../group/Group'
import Member from '../member/Member'

function Event( {title, description, date, location, display} ) {
    if(display === "thum-main") {
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
    } else if(display === "event-detail") {
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
                <div className="content-bd">
                    <div className="content-bd-main">
                        <div className="main-image">
                            <img src="https://kung.kr/files/attach/images/3830964/814/596/007/bec42d29f1665ebc059ea81ada6b4611.jpg"></img>
                        </div>
                        <div className="main-description">
                            <h3>세부사항</h3>
                            <p>
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
                            </p>
                        </div>
                        <div className="main-attendants">
                            <h3>참석자</h3>
                            <div className="attendants-member">
                                <Member
                                    image = {"https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png"}
                                    name = {"주단태"}
                                    city = {"Daegu"}
                                    display = {"thum-event"}
                                />
                                <Member
                                    image = {"http://forums2.cubiccastles.com/uploads/imageupload/162/1DP35AMQYX8F.jpg"}
                                    name = {"조비서"}
                                    city = {"Seoul"}
                                    display = {"thum-event"}
                                />
                                <Member
                                    image = {"http://forums2.cubiccastles.com/uploads/imageupload/432/6PFWTE73ZOV5.jpg"}
                                    name = {"나애교"}
                                    city = {"Busan"}
                                    display = {"thum-event"}
                                />
                                <Member
                                    image = {"https://i1.sndcdn.com/artworks-000641856217-0kq1oc-t500x500.jpg"}
                                    name = {"오윤희"}
                                    city = {"Seoul"}
                                    display = {"thum-event"}
                                />
                                <Member
                                    image = {"https://is5-ssl.mzstatic.com/image/thumb/Purple114/v4/f6/19/72/f61972c9-e38b-230c-2709-c8653778b8c0/source/512x512bb.jpg"}
                                    name = {"이규진"}
                                    city = {"Ulsan"}
                                    display = {"thum-event"}
                                />
                            </div>
                        </div>
                        <div className="main-join">
                            <div className="main-join-left">
                                <p>{date}</p>
                                <h3>{title}</h3>
                            </div>
                            <div className="main-join-right">
                                <button>참석하기</button>
                            </div>
                        </div>
                    </div>
                    <div className="content-bd-side">
                        <div className="side-group">
                            <Group
                                image = {"https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1200,h_630,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/xfarkb2lvobut3c5jugs/%20Language%20Exchange%20Experience%20in%20Seoul.jpg"}
                                name = {"영어회화 배우기"}
                                numOfMembers = {338}
                                tags = {"외국어"}
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
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired
}

// Need these API calls to fetch data 
// 1. host's info -> content head
// 2. group's info -> content body / side
// 3. members who will be attend -> content body / main

export default Event;