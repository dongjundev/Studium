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



class Search extends React.Component{
    constructor(props) {
        super(props);

        SwiperCore.use([Autoplay]);
        const { location } = this.props;

        this.state = {
            isLoggedIn: location.state.isLoggedIn,
            keyword: location.state.keyword,
            isResultGroups: true,
            slides: [
                <SwiperSlide>
                    <img
                    src="/images/search_main1.jpeg"
                    alt="search_main1"
                    />
                </SwiperSlide>,
                <SwiperSlide>
                    <img
                    src="/images/search_main2.jpeg"
                    alt="search_main2"
                    />
                </SwiperSlide>,
                <SwiperSlide>
                    <img
                    src="/images/search_main3.jpeg"
                    alt="search_main3"
                    />
                </SwiperSlide>
            ],
            //selectbox - group or event
            results: [
                {
                    id: 500,
                    image: "https://live.staticflickr.com/808/41153220832_c1e6bdbbac_b.jpg",
                    title: "iOS Development",
                    content: "We are people who love iOS dev!",
                    location: "Daegu",
                    members: 125
                },
                {
                    id: 501,
                    image: "http://d2uetvsama7sl8.cloudfront.net/prod/wp-content/uploads/2016/11/02104106/Android-meetup-gdansk-011216-17.jpg",
                    title: "Android Development",
                    content: "Android Community!",
                    location: "Daegu",
                    members: 333
                },
                {
                    id: 502,
                    image: "https://www.incimages.com/uploaded_files/image/1920x1080/getty_803789400_2000133320009280103_362124.jpg",
                    title: "Prepare job interviews with us",
                    content: "We hope every one of you pass interview and get your dream job!",
                    location: "Seoul",
                    members: 511
                },
                {
                    id: 503,
                    image: "https://live.staticflickr.com/808/41153220832_c1e6bdbbac_b.jpg",
                    title: "iOS Development",
                    content: "We are people who love iOS dev!",
                    location: "Daegu",
                    members: 888
                },
                {
                    id: 504,
                    image: "http://d2uetvsama7sl8.cloudfront.net/prod/wp-content/uploads/2016/11/02104106/Android-meetup-gdansk-011216-17.jpg",
                    title: "Android Development",
                    content: "Android Community!",
                    location: "Daegu",
                    members: 777
                },
                {
                    id: 505,
                    image: "https://www.incimages.com/uploaded_files/image/1920x1080/getty_803789400_2000133320009280103_362124.jpg",
                    title: "Prepare job interviews with us",
                    content: "We hope every one of you pass interview and get your dream job!",
                    location: "Seoul",
                    members: 555
                }
            ]
        }
    }
    
    render() {
        const {
            keyword,
            isLoggedIn,
            isResultGroups,
            results,
            slides
        } = this.state;

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
                    <select>
                        <option defaultValue>그룹 찾기</option>
                        <option>이벤트 찾기</option>
                    </select>
                    <input type="text" className="searchByKeyword" placeholder="키워드 검색" defaultValue={keyword}></input>
                    <input type="text" className="searchByLocation" placeholder="위치 검색"></input>
                    <button><FontAwesomeIcon icon={faSearch} /></button>
                </div>
                <div className="search-result">
                    {isResultGroups ? 
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
                    ))}
                    <div className="search-result-more">
                        <button>Load more results</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;