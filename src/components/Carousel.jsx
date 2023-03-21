import React, { useEffect, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { db } from '../database/firebase';
import { onValue, ref } from 'firebase/database';
import { Spinner } from 'react-bootstrap';

function Carousel() {
    // ** Read
    const [dataView, setDataView] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [isError, setisError] = useState(false);

    useEffect(() => {
        onValue(ref(db, `/banner`), (snapshot) => {
            setDataView([]);
            const data = snapshot.val();
            if (data !== null) {
                setDataView((oldArray) => {
                    const newArray = Object.values(data).map((item) => {
                        return {...item };
                    });
                    return [...oldArray, ...newArray];
                });
                setisLoading(false);
            } else {
                setisError(true);
            }
        });
    }, []);
    if (isLoading)
        return (
            <div className="text-center mt-5">
                <Spinner animation="grow" variant="" className='bg-indigo-500' />
                <Spinner animation="grow" variant="" className='bg-indigo-500' />
                <Spinner animation="grow" variant="" className='bg-indigo-500' />
            </div>
        );
    else if (dataView && !isError)
        return (
            <>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {dataView.map((item) => (

                        <SwiperSlide>
                            <img className='rounded-xl' src={item.banner} alt="" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        )
    else {
        return (
            <>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {dataView.map((item) => (

                        <SwiperSlide>
                            <img className='rounded-xl' src={item.banner} alt="" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        )
    }
}

export default Carousel