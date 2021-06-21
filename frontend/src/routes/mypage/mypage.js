import React from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import Member from '../../components/member/Member'
import Calendar from '../../components/calendar/Calendar'
import './mypage.css'

class Mypage extends React.Component{
    constructor(){
        super();
        this.state = { 
            member: "", 
            studies: [],
            events: []
        } 
    }
    getUserInfo = async () => {
        const url = "http://localhost:8080/mypage";
        // console.log(url);
        const data = await axios.get(url);
        // console.log("mypage data1: " + JSON.stringify(data.data[0]));
        // console.log("mypage data2: " + JSON.stringify(data.data[1]));
        // console.log("mypage data3: " + JSON.stringify(data.data[2]));
        this.setState({
            member: data.data[0], 
            studies: data.data[1],
            events: data.data[2]
        });
    }

    componentDidMount() {
        this.getUserInfo();
    }
    
    render() {
        const { studies, member, events } = this.state;
        //console.log("mypage events: " + JSON.stringify(events));
        let eventDates = events.map(event => event.eventDate);
        let eventSorted = events.sort((a,b) => Date.parse(a.eventDate) - Date.parse(b.eventDate));
        //console.log("sort!!" + JSON.stringify(eventSorted));
        if(member !== undefined){
            return (
                <div>
                    <Member
                        image = {member.memberImage}
                        name = {member.memberName}
                        gender = {member.memberGender}
                        city = {member.memberAddress}
                        display = "mypage"
                    />
                    <div className="mypage-studies">
                        <h3>가입한 스터디</h3>
                        {studies.map(study => (
                            <div className="mypage-study">
                                <Link to={{
                                    pathname:'/study/' + study.studyId,
                                    state:{
                                        isLoggedIn: false,
                                        display: "group-detail"
                                    }
                                }}>
                                    {study.studyName}
                                </Link>
                            </div>
                        ))}
                    </div>
                    <Calendar eventDates={eventDates} />
                    <div className="mypage-events">
                        <h3>참여 이벤트</h3>
                        {eventSorted.map(event => (
                            <div className="mypage-event">
                                <Link to={{
                                    pathname: '/event/' + event.eventId,
                                    state: { display: "event-detail" }
                                }}>
                                    <p className="myevent-date">{event.eventDate}</p>
                                    <p className="myevent-name">{event.eventName}</p>
                                    {(event.eventDescription).length > 30 ? 
                                        <p className="myevent-description">{(event.eventDescription).substring(0,30)}...</p> :
                                        <p className="myevent-description">{(event.eventDescription)}</p>
                                    }
                                    <p className="myevent-location">{event.eventLocation}</p>
                                    <p className="myevent-count">
                                        {(event.eventAttandentId.split(",")).length}명 참석 예정
                                    </p>
                                </Link>
                              </div>
                        ))}
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default Mypage;