import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Event from "../../components/event/Event"
import './event-detail.css'

class EventDetail extends React.Component{
    constructor(){
        super();
        this.state = {event: [], attendents: [], study: []}
    }

    getEventDetail = async () => {
        console.log(this.props);
        const url = "http://localhost:8080" + this.props.match.url;
        console.log(url);
        const data = await axios.get(url);
        console.log(JSON.stringify(data.data));
        this.setState({
            
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