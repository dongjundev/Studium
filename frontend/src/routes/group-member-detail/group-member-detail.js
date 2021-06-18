import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
// import './group-detail.css'
import Group from '../../components/group/Group'
import Member from "../../components/member/Member";

class GroupMemberDetail extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        const { location, history } = this.props;
        if (location.state === undefined) {
            history.push("/");
        }
    }
    
    render() {
        const { location } = this.props;
        return (
            <Member
                image = {location.state.image}
                name = {location.state.name}
                city = {location.state.city}
                gender = {location.state.gender}
                display = {location.state.display}
            />
        )
        // if(study !== undefined){
        //     return (
        //         <div className="group-detail" key={study.studyId}>
        //             <Group
        //                 id = {study.studyId}
        //                 image = {study.studyImage}
        //                 name = {study.studyName}
        //                 description = {study.studyDescription}
        //                 memberCnt = {study.memberCnt}
        //                 tag = {study.studyTag}
        //                 display = {location.state.display}
        //                 members = {members}
        //             />
        //         </div>
        //     )
        // } else {
        //     return null;
        // }
    }
}

export default GroupMemberDetail;