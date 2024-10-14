import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CommonInformation = ({ commonReport }) => {
    return (
        <div className="bg-white p-4 rounded-md tracking-tight shadow-md shadow-black-500 ">
            <div className="commonReport-item">
                <div className="pb-2 ">
                    <p className="pb-4 font-bold">{commonReport.title}</p>
                    <div className="text-sm" dangerouslySetInnerHTML={{ __html: commonReport.content.replace(/\n/g, '<br />') }} />
                </div>
                <div className="files pt-2 w-full">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={10}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        className="max-w-xs"
                    >
                        {commonReport.files.map((file) => (
                            <SwiperSlide key={file.file_id}>
                                {file.url && (
                                    <img src={file.url} alt="img" className="w-full h-auto object-contain" />
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default CommonInformation;