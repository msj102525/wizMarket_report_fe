import React, { useState } from 'react';

const LocTourInfo = ({ locTourInfo }) => {
    const [showAll, setShowAll] = useState(false); // 초기 상태는 하나만 보이도록 설정

    if (!locTourInfo || !locTourInfo.response || !locTourInfo.response.body || !locTourInfo.response.body.items) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">locTourInfo 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }


    const items = locTourInfo.response.body.items.item || [];
    if (items.length === 0) {
        return (
            <div className="p-4 bg-white">
                <p className="text-gray-500">도로 돌발 교통상황 정보가 없습니다.</p>
            </div>
        );
    }

    // 표시할 데이터 항목 결정
    const visibleItems = showAll ? items : [items[0]];

    return (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-6">
            <p className='text-sm'>위치기반 관광정보조회</p>
            {visibleItems.map((item, index) => (
                <div key={index} className="border-b pb-4 mb-4">
                    <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
                    <p className="text-sm text-gray-600">{item.addr1} {item.addr2}</p>
                    <p className="text-sm text-gray-600">소분류: {item.cat3}</p>
                    {item.firstimage && (
                        <img
                            src={item.firstimage}
                            alt={item.title}
                            className="w-full h-auto rounded-lg mt-2"
                        />
                    )}
                    <p className="text-sm text-gray-500">거리: {Math.round(item.dist)} m</p>
                </div>
            ))}
            {items.length > 1 && (
                <button
                    onClick={() => setShowAll(!showAll)} // 상태를 토글
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                    {showAll ? "접기" : "펼치기"} {/* 상태에 따라 버튼 텍스트 변경 */}
                </button>
            )}
        </div>
    );
};

export default LocTourInfo;
