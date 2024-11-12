import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import YouTube from '../../../components/Youtube';
import { hasYoutubeIframe } from '../../../utils/unescapeHTML';

const StoreDescription = ({ storeDescription }) => {
    if (!storeDescription) {
        return null;
    }

    // store_description_content에 iframe이 포함되어 있는지 체크
    const hasIframe = hasYoutubeIframe(storeDescription.store_description_content);

    return (
        <div className="bg-white p-4 rounded-md tracking-tight shadow-md shadow-black-500 py-1">
            <div className="storeDescription-item">
                <div className="pb-2">
                    <p className="pb-4 font-bold">{storeDescription.store_description_title}</p>
                    {/* iframe이 포함된 경우 일반 텍스트는 표시하지 않음 */}
                    {!hasIframe && storeDescription.store_description_content && (
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

                {/* iframe이 포함된 경우 YouTube 컴포넌트 표시 */}
                {hasIframe && <YouTube content={storeDescription.store_description_content} />}
            </div>
        </div>
    );
};

export default StoreDescription;
