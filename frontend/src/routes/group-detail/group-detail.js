import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import './group-detail.css'
import Group from '../../components/group/Group'

class GroupDetail extends React.Component{
    constructor(){
        super();
        this.state = { study: [] , members: [], events: []}
    }
    getStudyDetail = async () => {
        const url = "http://localhost:8080" + this.props.match.url;
        console.log(url);
        const data = await axios.get(url);
        console.log(JSON.stringify(data.data[2]));
        this.setState({
            study: data.data[0], 
            members: data.data[1],
            events: data.data[2]
        });
    }

    componentDidMount() {
        const { location, history } = this.props;
        if (location.state === undefined) {
            history.push("/");
        }

        this.getStudyDetail();
    }
    
    render() {
        const { location } = this.props;
        const { study, members, events } = this.state;
        if(study !== undefined){
            return (
                <div className="group-detail" key={study.studyId}>
                    <Group
                        id = {study.studyId}
                        image = {study.studyImage}
                        name = {study.studyName}
                        description = {study.studyDescription}
                        memberCnt = {study.memberCnt}
                        tag = {study.studyTag}
                        display = {location.state.display}
                        members = {members}
                        events = {events}
                    />
                </div>
            )
        } else {
            return null;
        }
    }
}

export default GroupDetail;