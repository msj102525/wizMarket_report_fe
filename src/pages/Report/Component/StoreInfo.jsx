import React from 'react';

const StoreInfo = ({ storeInfo, loading }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!storeInfo) {
        return null;
    }

    const { localStoreInfo, weatherInfo, aqi_info } = storeInfo;

    const {
        road_name_address,
        store_name,
        building_name,
        floor_info,
        small_category_name,
        store_img_url
    } = localStoreInfo;

    // FastAPI 서버의 정적 파일 URL 구성
    const imageUrl = `${process.env.REACT_APP_FASTAPI_BASE_URL}${store_img_url}`;

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
                    <div className="flex gap-2">
                        <p className='text-xs content-center bg-[#16DBCC] rounded-xl px-1'>{small_category_name}</p>
                        <p className='text-xl font-bold'>{store_name}</p>
                    </div>
                    <p className='text-xs text-gray-300'>{road_name_address} {building_name} {floor_info}층</p>
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
                    <p className='text-gray-100 text-xs absolute bottom-[-24px]'>미세먼지 {aqi_info.description}</p>
                </div>
            </div>

            {/* <div className="bg-black px-4 py-10">
                <div className="">
                    <p className='text-white'>GPT</p>
                    <p className='text-white'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum saepe voluptate modi debitis sapiente reprehenderit vitae qui maiores a consectetur nisi vel placeat necessitatibus nesciunt similique fugit magnam, delectus veniam.</p>
                </div>
            </div> */}
        </div>
    );
};

export default StoreInfo;
