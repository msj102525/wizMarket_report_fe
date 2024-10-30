import React from 'react';

const StoreInfo = ({ storeInfo, storeInfoRedux }) => {

    if (!storeInfo) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">storeInfo 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }


    const { localStoreInfo, weatherInfo, aqi_info, format_current_datetime } = storeInfo;

    const {
        road_name,
        store_name,
        building_name,
        floor_info,
        local_store_image_url
    } = localStoreInfo;


    // FastAPI 서버의 정적 파일 URL 구성
    const imageUrl = `${process.env.REACT_APP_FASTAPI_BASE_URL}${local_store_image_url}`;

    const backgroundStyle = {
        backgroundImage: `url("${imageUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className="">
            <div className='relative h-[473px] bg-white shadow-inner' style={backgroundStyle}>
                <div className='absolute bottom-0 w-full h-full bg-gradient-to-t from-black/100 to-transparent' style={{ height: '25%' }}></div>

                <div className='absolute z-10 p-4 text-white bottom-0'>
                    <div className="flex gap-2 items-center">
                        <p className='text-xs content-center bg-[#16DBCC] rounded-xl px-1 leading-5'>{storeInfoRedux.detail_category_name}</p>
                        <p className='text-2xl font-bold'>{store_name}</p>
                    </div>
                    <p className='text-xs text-gray-300'>{road_name} {building_name} {floor_info}층</p>
                </div>

                {/* 날씨 아이콘과 온도 추가 */}
                <div className="w-28 absolute top-6 right-2 flex flex-col items-center">
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

            <div className="bg-black px-4 py-10">
                <div className="">
                    <p className='text-white'>GPT Dummy data</p>
                    <p className='text-white text-md font-light'>
                        •	목요일 저녁 집중<br />
                        매출이 가장 높은 목요일 18시~21시에 맞춰 특별 메뉴나 세트 메뉴를 준비해 더 많은 고객을 유치하세요. <br />
                        •	50대 남성 고객 공략<br />
                        주요 고객이 50대 남성이므로, 이들이 좋아할 수 있는 메뉴 추천이나 간단한 서비스로 고객 만족도를 높이세요.<br />
                        •	매장 외부 홍보 강화<br />
                        당산2동 유동인구가 많으니, 지나가는 사람들을 겨냥한 배너나 현수막을 통해 매장 홍보를 적극적으로 진행해 보세요.<br />
                        •	테이크아웃 메뉴 강화<br />
                        근처 직장인을 위해 저렴한 테이크아웃 메뉴를 마련하고, 점심 시간대 홍보를 강화하는 것도 좋은 전략입니다.<br />
                        •	맑은 날씨 활용<br />
                        오늘처럼 날씨가 맑을 때는 창가 좌석이나 야외 좌석을 잘 활용해 편안한 분위기를 만들어 고객의 발길을 끌어보세요.<br />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StoreInfo;
