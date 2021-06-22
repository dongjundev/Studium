import React from "react"
import { Link } from "react-router-dom";
import './search.css';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay }from "swiper";
import "swiper/swiper-bundle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Group from "../../components/group/Group"
import Event from "../../components/event/Event"
import axios from "axios";



class Search extends React.Component{
    constructor(props) {
        super(props);

        SwiperCore.use([Autoplay]);
        const { location } = this.props;
        
        this.state = {
            //isLoggedIn: location.state.isLoggedIn,
            value: "study",
            keyword: (location.search.split('&')[0]).split('=')[1],
            condition: (location.search.split('&')[1]).split('=')[1],
            search: location.search,
            slides: [
                <SwiperSlide key="slide1">
                    <img
                    src="/images/search_main1.jpeg"
                    alt="search_main1"
                    />
                </SwiperSlide>,
                <SwiperSlide key="slide2">
                    <img
                    src="/images/search_main2.jpeg"
                    alt="search_main2"
                    />
                </SwiperSlide>,
                <SwiperSlide key="slide3">
                    <img
                    src="/images/search_main3.jpeg"
                    alt="search_main3"
                    />
                </SwiperSlide>
            ],
            results: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.keywordChange = this.keywordChange.bind(this);
    }
    
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    keywordChange = (event) => {
        this.setState({keyword: event.target.value});
    }

    render() {
        const {
            search,
            //isLoggedIn,
            value,
            keyword,
            condition,
            results,
            slides
        } = this.state;
        const {history} = this.props;
        console.log(this.props);
        // const keyword = (search.split('&')[0]).split('=')[1];

        return (
            <div className="search">
                <Swiper
                    spaceBetween={30} 
                    centeredSlides={true} 
                    loop={true}
                    autoplay={{
                        "delay": 3000,
                        "disableOnInteraction": false
                    }}
                >
                    {slides}
                </Swiper>
                <div className="search-box">
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="study">스터디 찾기</option>
                        <option value="event">이벤트 찾기</option>
                    </select>
                    <input type="text" className="searchByKeyword" placeholder="키워드 검색" onChange={this.keywordChange} defaultValue={decodeURIComponent(keyword)}></input>
                    {/* <input type="text" className="searchByLocation" placeholder="위치 검색"></input> */}
                    {/* <Link to={{
                        pathname: '/search',
                        search: "keyword=" + keyword + "&searchCondition=" + value,
                        state: { isLoggedIn }
                    }}>
                    <button><FontAwesomeIcon icon={faSearch} /></button>
                    </Link> */}
                    <button onClick={this.doSearch.bind(this)}><FontAwesomeIcon icon={faSearch} /></button>
                </div>
                <div className="search-result">
                    {condition === "study" ? results.map(result => (
                        <Link to={{
                            pathname: '/study/' + (result.studyId),
                            state: {
                                //isLoggedIn: isLoggedIn,
                                display: "group-detail"
                            }
                        }}>
                        <div className="group-thum" key={result.studyId}>
                            <Group
                                image = {result.studyImage}
                                name = {result.studyName}
                                memberCnt = {result.memberCnt}
                                display = "thum-main"
                            />
                        </div>
                        </Link>
                    ))
                    : results.map(result => (
                        <div className="event-thum" key={result.eventId}>
                        <Link to={{
                            pathname: '/event/' + (result.eventId),
                            state: {
                                //isLoggedIn: isLoggedIn,
                                display: "event-detail"
                            }
                        }}>
                            <Event
                                title = {result.eventName}
                                description = {result.eventDescription}
                                date = {result.eventDate}
                                location = {result.eventLocation}
                                display = "thum-main"
                            />
                        </Link>
                        </div>
                    ))}
                    {/* {isResultGroups ? 
                    results.map(result => (
                        <Link to={{
                            pathname: '/group-detail',
                            state: {
                                isLoggedIn: isLoggedIn,
                                image: result.image,
                                name: result.title,
                                numOfMembers: result.members,
                                display: "group-detail"
                            }
                        }}>
                            <Group
                                key = {result.id}
                                image = {result.image}
                                name = {result.title}
                                numOfMembers = {result.members}
                                display = "thum-main"
                            />
                        </Link>
                    )) : 
                    results.map(result => (
                        <Event
                            key = {result.id}
                            title = {result.title}
                            description = {result.content}
                            date = {"N/A"}
                            location = {result.location}
                            display = "thum-main"
                        />
                    ))} */}
                    <div className="search-result-more">
                        <button>Load more results</button>
                    </div>
                </div>
            </div>
        )
    }
    doSearch = () => {
        // console.log(this.state.value);
        // console.log(this.state.keyword);
        const url = "http://localhost:8080/search?keyword=" + encodeURIComponent(this.state.keyword) + "&searchCondition=" + this.state.value;
        this.getSearchResults(url);
        this.props.history.push("search?keyword=" + encodeURIComponent(this.state.keyword) + "&searchCondition=" + this.state.value);
        this.setState({condition: this.state.value});
    }
    getSearchResults = async (url) => {
        // const url = "http://localhost:8080/search" + this.state.search;
        // console.log(url);
        const data = await axios.get(url);
        console.log("Search data: " + JSON.stringify(data));
        this.setState({results: data.data});
    }
    componentDidMount(){
        const url = "http://localhost:8080/search" + this.state.search;
        this.getSearchResults(url);
    }
}

export default Search;