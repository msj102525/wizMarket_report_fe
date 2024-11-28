import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const StoreInfo = ({ storeInfo, storeInfoRedux }) => {
    if (!storeInfo) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">storeInfo 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    const { localStoreInfo, weatherInfo, aqi_info, format_current_datetime, store_info_advice } = storeInfo;

    const {
        store_business_number,
        road_name,
        store_name,
        building_name,
        floor_info,
        local_store_image_url
    } = localStoreInfo;

    const handleLinkClick = (event, storeBusinessNumber) => {
        event.preventDefault();
    
        const REPORT_URL = `${process.env.REACT_APP_ADS}/ads/${storeBusinessNumber}`;
        const width = 500;
        const height = 800;
        const left = window.screenX + (window.innerWidth / 4) * 2 + (window.innerWidth / 4 - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
    
        window.open(
            REPORT_URL,
            "_blank",
            `width=${width},height=${height},top=${top},left=${left}`
        );
    };

    return (
        <div className="">
            <div className='relative h-[473px] bg-white shadow-inner'>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                    }}
                    className="h-full [&_.swiper-pagination-bullet]:bg-white [&_.swiper-pagination]:!bottom-[0px]"
                >
                    {local_store_image_url.map((imageUrl, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="w-full h-full relative"
                                style={{
                                    backgroundImage: `url("${process.env.REACT_APP_FASTAPI_BASE_URL}${imageUrl}")`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className='absolute bottom-0 w-full h-full bg-gradient-to-t from-black/100 to-transparent' style={{ height: '25%' }}></div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className='absolute z-10 px-2 text-white bottom-4'>
                    <div className="flex gap-2 items-center flex-nowrap">
                        <p className='text-xs content-center bg-[#16DBCC] rounded-xl px-1 leading-5 truncate max-w-[100px]'>
                            {storeInfoRedux.detail_category_name}
                        </p>
                        <p
                            className={`${store_name.length >= 14
                                ? 'text-lg'
                                : store_name.length >= 10
                                    ? 'text-xl'
                                    : 'text-2xl'} font-bold w-56 truncate`}
                        >
                            {store_name}
                        </p>
                    </div>
                    <p className="text-xs text-gray-300">
                        {road_name ? `${road_name} ` : ""}
                        {building_name ? `${building_name} ` : ""}
                        {floor_info ? `${floor_info}층` : ""}
                    </p>

                </div>

                <div className="w-28 absolute top-6 right-2 flex flex-col items-center z-10">
                    <div className="w-20 h-20">
                        <img
                            src={`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
                            alt="날씨 아이콘"
                            className="block w-full"
                        />
                    </div>
                    <p className='text-white text-xl font-bold absolute bottom-[-5px]'>{Math.round(weatherInfo.temp)}°C</p>
                    <p className='text-gray-100 text-sm absolute bottom-[-24px]'>미세먼지 {aqi_info.description}</p>
                    <p className='text-gray-300 text-xs absolute bottom-[-38px]'>{format_current_datetime}</p>
                </div>
            </div>

            <div className="bg-black px-4 pt-4">
                <div className="">
                    <div className="flex justify-center pt-4 pb-2">
                        <div className="w-6 h-auto">
                            <img src={require('../../../assets/component/advice_icon.png')} alt="Wiz-advice_icon" className='block w-full h-auto' />
                        </div>
                    </div>
                    <p className="text-white text-md font-light" dangerouslySetInnerHTML={{ __html: store_info_advice.replace(/\n/g, "<br />") }}></p>
                </div>
                <div className="px-4 py-2 cursor-pointer" onClick={(e) => handleLinkClick(e, store_business_number)}>
                    <img src={require('../../../assets/component/wizAD.png')} alt="Wiz-advice_icon" className='block w-full h-auto' />
                </div>
            </div>

        </div>
    );
};

export default StoreInfo;
