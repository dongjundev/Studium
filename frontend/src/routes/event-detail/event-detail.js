import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Event from "../../components/event/Event"
import './event-detail.css'

class EventDetail extends React.Component{
    componentDidMount() {
        const { location, history } = this.props;
        if (location.state === undefined) {
            history.push("/");
        }
        console.log(location);
        console.log(history);
    }
    render() {
        const { location } = this.props;

        if(location.state){
            return (
                <Event
                title = {location.state.title}
                description = {location.state.description}
                date = {location.state.date}
                location = {location.state.location}
                display = {location.state.display}
                />
            )
        } else {
            return null;
        }
    }
}

export default EventDetail;