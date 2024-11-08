import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const StoreDescription = ({ storeDescription }) => {
    if (!storeDescription) {
        return null;
    }

    return (
        <div className="bg-white p-4 rounded-md tracking-tight shadow-md shadow-black-500 py-1">
            <div className="storeDescription-item">
                <div className="pb-2">
                    <p className="pb-4 font-bold">{storeDescription.store_description_title}</p>
                    {storeDescription.store_description_content && (
                        <p
                            className="text-sm break-words whitespace-pre-wrap [&>p>a]:hover:underline"
                            dangerouslySetInnerHTML={{
                                __html: storeDescription.store_description_content
                            }}
                        />
                    )}
                </div>
                {storeDescription.store_description_img_url &&
                    storeDescription.store_description_img_url.some(url => url !== null) && (
                        <div className="files pt-2 w-full">
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={10}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                className="max-w-xs"
                            >
                                {storeDescription.store_description_img_url
                                    .filter(url => url !== null)
                                    .map((imgUrl, imgIndex) => (
                                        <SwiperSlide key={imgIndex}>
                                            <div className="">
                                                <img
                                                    src={`${process.env.REACT_APP_FASTAPI_BASE_URL}${imgUrl}`}
                                                    alt={`${storeDescription.store_description_title} ${imgIndex + 1}`}
                                                    className="block w-full h-auto object-contain"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default StoreDescription;