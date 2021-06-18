import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Event from "../../components/event/Event"
import './event-detail.css'

class EventDetail extends React.Component{
    constructor(){
        super();
        this.state = {event: [], attendants: [], study: []}
    }

    getEventDetail = async () => {
        const url = "http://localhost:8080" + this.props.match.url;
        console.log(url);
        const data = await axios.get(url);
        console.log("이벤트 내용: " + JSON.stringify(data.data[0]));
        console.log("스터디 내용: " + JSON.stringify(data.data[1]));
        console.log("참석자 내용: " + JSON.stringify(data.data[2]));
        this.setState({
            event: data.data[0],
            study: data.data[1],
            attendants: data.data[2]
        });
    }
    componentDidMount() {
        const { location, history } = this.props;
        if (location.state === undefined) {
            history.push("/");
        }
        this.getEventDetail();
    }
    render() {
        const { location } = this.props;
        const { event, study, attendants } = this.state;
        if(event !== undefined){
            return (
                <div className="event-detail" key={event.eventId}>
                    <Event
                        image = {event.eventImage}
                        title = {event.eventName}
                        description = {event.eventDescription}
                        date = {event.eventDate}
                        location = {event.eventLocation}
                        display = {location.state.display}
                        study = {study}
                        attendants = {attendants}
                    />
                </div>
            )
        } else {
            return null;
        }
    }
}

export default EventDetail;