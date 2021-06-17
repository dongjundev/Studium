import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import './group-detail.css'
import Group from '../../components/group/Group'

class GroupDetail extends React.Component{
    componentDidMount() {
        const { location, history } = this.props;
        if (location.state === undefined) {
            history.push("/");
        }
    }
    render() {
        const { location } = this.props;
        console.log(location);
        if(location.state){
            return (
                <Group
                    image = {location.state.image}
                    name = {location.state.name}
                    description = {location.state.description}
                    numOfMembers = {location.state.numOfMembers}
                    tags = {location.state.tags}
                    display = {location.state.display}
                />
            )
        } else {
            return null;
        }
    }
}

export default GroupDetail;