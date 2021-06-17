import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Event from "../../components/event/Event";
import Group from "../../components/group/Group";
import Category from "../../components/category/Category";
import './main.css';

class Main extends React.Component{
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            isEventsLoading: false,
            isGroupsLoading: false,
            isCategoriesLoading: false,
            events: [
                {
                    id: 1,
                    title: "Meet up for learning English",
                    description: "This meeting is about...",
                    date: "2021.06.21 FRI 10:00 - 12:00",
                    location: "대구 혁신도시"
                },
                {
                    id: 2,
                    title: "Awesome language exchange and make good friends in Daegu",
                    description: "Awesome party with international friends, join us and learn languages and make friends!",
                    date: "2021.06.23 SAT 11:00 - 13:00",
                    location: "대구 율하역"
                },
                {
                    id: 3,
                    title: "Learning AWS",
                    description: "This meeting is about...",
                    date: "2021.06.30 MON 13:00 - 16:00",
                    location: "대구 동성로"
                    }
            ],
            groups: [
                {
                    id: 999,
                    image: "https://awssofia.com/wp-content/uploads/2020/01/cropped-AWS-Website-Banner.jpg",
                    name: "AWS Korea Community dfsdfffe",
                    numOfMembers: 240,
                    tags: "기술"
                },
                {
                    id: 998,
                    image: "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1200,h_630,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/xfarkb2lvobut3c5jugs/%20Language%20Exchange%20Experience%20in%20Seoul.jpg",
                    name: "영어회화 배우기",
                    numOfMembers: 338,
                    tags: "외국어"
                },
                {
                    id: 997,
                    image: "https://pacificenglishschool.com/wp-content/uploads/2020/06/banner_study-scaled.jpg",
                    name: "정보처리기사 필기",
                    numOfMembers: 102,
                    tags: "자격증"
                }
            ],
            categories: [
                {
                    id: "100",
                    thumbnail: "https://cdn.dribbble.com/users/879147/screenshots/7906715/media/1b1d2ef35dab525ed63b8b5816813132.jpg?compress=1&resize=400x300",
                    name: "기술"
                },
                {
                    id: "101",
                    thumbnail: "https://t1.daumcdn.net/liveboard/bookclub/93ff3a3b875349dda49bb3c9581a4532.jpeg",
                    name: "외국어"
                },
                {
                    id: "102",
                    thumbnail: "https://image.freepik.com/free-vector/online-certification-illustration_23-2148575512.jpg",
                    name: "자격증"
                }
            ]
        }
    }

    render() {
        const {
            isLoggedIn,
            isEventsLoading,
            isGroupsLoading,
            isCategoriesLoading,
            events, 
            groups,
            categories
        } = this.state;

        return (
            <div className="container">
                <div className="main-image">
                    <video autoPlay muted loop id="myVideo">
                        <source src="/images/video.mp4" type="video/mp4" />
                        <source src="/images/video.webm" type="video/webm" />
                        <strong>Your browser does not support the video tag.</strong>
                    </video>
                    <div className="main-letter">
                        <h3>저희가 도와드릴게요.</h3>
                        <p>원하는 스터디 그룹을 찾아 함께 공부하는 경험을 즐겨보세요.</p>
                        <Link to="/register">
                            <button>STUDIUM 가입하기</button>
                        </Link>
                    </div>
                </div>
                <div className="content-area">
                    <div className="events-wrap">
                        <p className="section-title">내 주변 이벤트</p>
                        <p className="section-detail">근처에서 곧 진행될 이벤트를 확인해보세요</p>
                        <div className="event">
                            {isEventsLoading ? "Loading..." : events.map(event => (
                                <Link to={{
                                    pathname: '/event-detail',
                                    state: {
                                        isLoggedIn: isLoggedIn,
                                        title: event.title,
                                        description: event.description,
                                        date: event.date,
                                        location: event.location,
                                        display: "event-detail"
                                    }
                                }}>
                                    <Event
                                        key = {event.id}
                                        title = {event.title}
                                        description = {event.description}
                                        date = {event.date}
                                        location = {event.location}
                                        display = "thum-main"
                                    />
                                </Link>      
                            ))}
                        </div>
                    </div>
                    <div className="groups-wrap">
                        <p className="section-title">내 주변 그룹</p>
                        <p className="section-detail">나랑 같이 공부할 그룹 찾기</p>
                        <div className="group">
                            {isGroupsLoading ? "Loading.." : groups.map(group => (
                                <Link to={{
                                    pathname: '/group-detail',
                                    state: {
                                        isLoggedIn: this.state.isLoggedIn,
                                        image: group.image,
                                        name: group.studyName,
                                        numOfMembers: group.numOfMembers,
                                        tags: group.tags,
                                        display : "group-detail"
                                    }
                                }}>
                                    <Group
                                        key = {group.id}
                                        image = {group.image}
                                        name = {group.studyName}
                                        numOfMembers = {group.numOfMembers}
                                        tags = {group.tags}
                                        display = "thum-main"
                                    />    
                                </Link>    
                            ))}
                        </div>
                    </div>
                    <div className="category-wrap">
                        <p className="section-title">카테고리</p>
                        <p className="section-detail">관심 있는 주제로 그룹을 찾아보세요.</p>
                        <div className="category">
                            {isCategoriesLoading ? "Loading.." : categories.map(category => (
                                <Link to={{
                                    pathname: '/search',
                                    state: {
                                        isLoggedIn: this.state.isLoggedIn,
                                        keyword: category.name
                                    }
                                }}>
                                    <Category
                                        key = {category.id}
                                        thumbnail = {category.thumbnail}
                                        name = {category.name}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentWillUnmount(){
        this.setState( {isEventsLoading: true } );
        this.setState( {isGroupsLoading: true } );
        this.setState( {isCategoriesLoading: true} );
    }
    //Methods below are not fully implemented yet

    //Get events from DB
    //getEvents = async () => {
    getEvents(){
        /*
        const {
            data : {
                data : {events}
            }
        } = await axios.get("request url")
        this.setState( {events: events, isEventsLoading: false} )
        */
        setTimeout(() => this.setState( {isEventsLoading: false} ), 3000);
        //this.setState( {isEventsLoading: false} )
    }

    //Get groups from DB
    getGroups = async () => {
    //getGroups(){
        const url = "http://localhost:8080/api/home.do";
        // const {
        //     data : {
        //         data : {groups}
        //     }
        const data = await axios.get(url);
        //const data = await axios.get(url);
        console.log("data : " + JSON.stringify(data));
        this.setState( {groups: data.data, isGroupsLoading: false} );
        //this.setState( {isGroupsLoading: false} )
    }

    //Get categories from server
    //getCategories = async () => {
    getCategories(){
        this.setState( {isCategoriesLoading: false} )
    }

     componentDidMount() {
    //     this.getEvents();
         this.getGroups();
    //     this.getCategories();
    }
    
}

export default Main;