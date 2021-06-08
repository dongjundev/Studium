import React from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom"
import "swiper/css/swiper.css";
import './search.css'

class Search extends React.Component{
    constructor() {
        super();
        this.state = {
            //selectbox - group or event
            result : [
                {
                    id: 500,
                    image: "https://live.staticflickr.com/808/41153220832_c1e6bdbbac_b.jpg",
                    title: "iOS Development",
                    location: "Daegu",
                    members: 125
                },
                {
                    id: 501,
                    image: "http://d2uetvsama7sl8.cloudfront.net/prod/wp-content/uploads/2016/11/02104106/Android-meetup-gdansk-011216-17.jpg",
                    title: "Android Development",
                    location: "Daegu",
                    members: 333
                },
                {
                    id: 502,
                    image: "https://www.incimages.com/uploaded_files/image/1920x1080/getty_803789400_2000133320009280103_362124.jpg",
                    title: "Prepare job interviews with us",
                    location: "Seoul",
                    members: 511
                }
            ]
        }
    }

    render() {
        const {
            result
        } = this.state;

        return (
            <div className="search">
                <Swiper spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide> slide 1 </SwiperSlide>
                    <SwiperSlide> slide 2 </SwiperSlide>
                    <SwiperSlide> slide 3 </SwiperSlide>
                </Swiper>
            </div>
        )
    }

    componentDidMount() {

    }
}

export default Search;