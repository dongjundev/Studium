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
            groups: [],
            events: [],
            categories: [
                {
                    id: "101",
                    thumbnail: "https://t1.daumcdn.net/liveboard/bookclub/93ff3a3b875349dda49bb3c9581a4532.jpeg",
                    name: "외국어"
                },
                {
                    id: "102",
                    thumbnail: "https://image.freepik.com/free-vector/online-certification-illustration_23-2148575512.jpg",
                    name: "자격증"
                },
                {
                    id: "103",
                    thumbnail: "https://blog.kakaocdn.net/dn/FYWhq/btqEt6aAvrk/Po8oyIHB7sw4DimFU3Rlhk/img.png",
                    name: "취업"
                },
                {
                    id: "104",
                    thumbnail: "https://cdn.dribbble.com/users/879147/screenshots/7906715/media/1b1d2ef35dab525ed63b8b5816813132.jpg?compress=1&resize=400x300",
                    name: "기술"
                },
                {
                    id: "105",
                    thumbnail: "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FOH5pw%2FbtqFBY3l84K%2FfBYboXoTEY3vQIvupcyLT0%2Fimg.jpg",
                    name: "과학"
                },
                {
                    id: "106",
                    thumbnail: "https://vrthumb.clipartkorea.co.kr/2021/03/31/cm230005311.jpg",
                    name: "경제"
                },
                {
                    id: "107",
                    thumbnail: "https://cdn.dribbble.com/users/1040983/screenshots/14588186/media/88ecf3d892e527ed697d813b44b781de.png?compress=1&resize=400x300",
                    name: "독서"
                },
                {
                    id: "108",
                    thumbnail: "https://image.freepik.com/free-vector/painting-tools-elements-cartoon-colorful-set-art-supplies-easel-with-canvas-paint-tubes-brushes-pencil-watercolor-palette-drawing-creative-materials-for-workshops-designs_311563-31.jpg",
                    name: "미술"
                },
                {
                    id: "109",
                    thumbnail: "https://image.freepik.com/free-vector/music-colorful-illustration_24908-57101.jpg",
                    name: "음악"
                }
                
            ]
        }
    }

    render() {
        const {
            isGroupsLoading,
            isEventsLoading,
            isCategoriesLoading,
            groups,
            events,
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
                        {/* <Link to="/register"> */}
                            <button onClick={this.doAction}>STUDIUM 가입하기</button>
                        {/* </Link> */}
                    </div>
                </div>
                <div className="content-area">
                    <div className="groups-wrap">
                        <p className="section-title">추천 스터디</p>
                        <p className="section-detail">함께 공부할 스터디 그룹 찾기</p>
                        <div className="group">
                            {isGroupsLoading ? "Loading.." : groups.map(group => (
                                <Link to={{
                                    pathname: '/study/'+ (group.studyId),
                                     
                                    state: {
                                        isLoggedIn: this.state.isLoggedIn,
                                        display : "group-detail"
                                    }
                                }}>
                                    <div className="group-thum" key={group.studyId}>
                                        <Group
                                            image = {group.studyImage}
                                            name = {group.studyName}
                                            description = {group.studyDescription}
                                            memberCnt = {group.memberCnt}
                                            tag = {group.studyTag}
                                            display = "thum-main"
                                        />
                                    </div>    
                                </Link>    
                            ))}
                        </div>
                    </div>
                    <div className="events-wrap">
                        <p className="section-title">추천 이벤트</p>
                        <p className="section-detail">참석할 스터디 이벤트 찾기</p>
                        <div className="event">
                            {isEventsLoading ? "Loading..." : events.map(event => (
                                <div className="event-thum" key={event.eventId}>
                                <Link to={{
                                    pathname: '/event/' + event.eventId,
                                    state: {
                                        display: "event-detail"
                                    }
                                }}>
                                    <Event
                                        title = {event.eventName}
                                        date = {event.eventDate}
                                        location = {event.eventLocation}
                                        description = {event.description}
                                        display = "thum-main"
                                    />
                                </Link>
                                </div> 
                            ))}
                        </div>
                    </div>
                    <div className="category-wrap">
                        <p className="section-title">카테고리</p>
                        <p className="section-detail">관심 있는 주제로 그룹을 찾아보세요.</p>
                        <div className="category">
                            {isCategoriesLoading ? "Loading.." : categories.map(category => (
                                <Link to={{
                                    //pathname : "/search?keyword=" + category.name,
                                    pathname: '/search',
                                    search: "keyword=" + category.name + "&searchCondition=study",
                                    state: {
                                        isLoggedIn: this.state.isLoggedIn,
                                        name: category.name
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
        const url = "http://localhost:8080/";
        // const {
        //     data : {
        //         data : {groups}
        //     }
        const data = await axios.get(url);
        //const data = await axios.get(url);
        console.log("data : " + JSON.stringify(data));
        this.setState( {groups: data.data[0], events: data.data[1], isGroupsLoading: false} );
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