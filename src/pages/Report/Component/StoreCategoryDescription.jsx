import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import YouTube from '../../../components/Youtube';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { hasYoutubeIframe } from '../../../utils/unescapeHTML';

const StoreCategoryDescription = ({ storeCategoryDescription }) => {
    if (!storeCategoryDescription || storeCategoryDescription.length === 0) {
        return null;
    }

    return (
        <div className="bg-white p-4 shadow-md shadow-black-500">
            {storeCategoryDescription.map((item, index) => (
                <div key={index} className="pb-4 flex gap-2">
                    <div className="py-2.5 flex flex-col items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#7864F9] rounded-full"></div>
                        <div className="w-[1px] h-full bg-[#EEE9FE]"></div>
                    </div>
                    <div className="w-full pr-4">
                        <h2 className="text-lg font-bold mb-2">{item.detail_category_description_title}</h2>
                        {item.detail_category_description_content && !hasYoutubeIframe(item.detail_category_description_content) && (
                            <p
                                className={`${item.detail_category_description_img_url?.length > 0 ? 'bg-[#7864F9] text-white px-2 py-4 text-sm rounded-xl' : 'py-2 font-medium'}`}
                                dangerouslySetInnerHTML={{
                                    __html: item.detail_category_description_content
                                }}
                            />
                        )}
                        {item.detail_category_description_img_url && item.detail_category_description_img_url.length > 0 && (
                            <div className="rounded-xl overflow-hidden mt-2">
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    pagination={{ clickable: true }}
                                    className="w-full"
                                >
                                    {item.detail_category_description_img_url
                                        .filter(url => url !== null)
                                        .map((imgUrl, imgIndex) => (
                                            <SwiperSlide key={imgIndex}>
                                                <img
                                                    src={`${process.env.REACT_APP_FASTAPI_BASE_URL}${imgUrl}`}
                                                    alt={`${item.detail_category_description_title} ${imgIndex + 1}`}
                                                    className="w-full h-64 object-cover"
                                                />
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            </div>
                        )}
                        {hasYoutubeIframe(item.detail_category_description_content) && (
                            <YouTube content={item.detail_category_description_content} />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StoreCategoryDescription;
