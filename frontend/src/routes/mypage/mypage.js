import React from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import Member from '../../components/member/Member'
import Calendar from '../../components/calendar/Calendar'

class Mypage extends React.Component{
    constructor(){
        super();
        this.state = { 
            member: {
                    image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_400,h_400/http://1bang.kr/wp-content/uploads/2020/09/slFhH.jpg",
                    name: "죠르디",
                    gender: "남",
                    city: "서울"
            }, 
            studies: [],
            events: [
                {
                            id: 1,
                            title: "Meet up for learning English",
                            description: "This meeting is about...",
                            date: "2021-06-21",
                            location: "대구 혁신도시"
                        },
                        {
                            id: 2,
                            title: "Awesome language exchange and make good friends in Daegu",
                            description: "Awesome party with international friends, join us and learn languages and make friends!",
                            date: "2021-06-23",
                            location: "대구 율하역"
                        },
                        {
                            id: 3,
                            title: "Learning AWS",
                            description: "This meeting is about...",
                            date: "2021-06-30",
                            location: "대구 동성로"
                        }
            ]
        } 
    }
    getUserInfo = async () => {
        const url = "http://localhost:8080/mypage";
        // console.log(url);
        const data = await axios.get(url);
        console.log("mypage data1: " + JSON.stringify(data.data[0]));
        console.log("mypage data2: " + JSON.stringify(data.data[1]));
        console.log("mypage data3: " + JSON.stringify(data.data[2]));
        this.setState({
            member: data.data[0], 
            study: data.data[1],
            events: data.data[2]
        });
    }

    componentDidMount() {
        this.getUserInfo();
    }
    
    render() {
        
        const { studies, member, events } = this.state;

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
                            <p>{study.studyName}</p>
                        ))}
                    </div>
                    <Calendar events={events} />
                </div>
            )
        } else {
            return null;
        }
    }
}

export default Mypage;