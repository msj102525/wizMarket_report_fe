import React, { useState } from 'react';

const RoadEventInfo = ({ roadEventInfo }) => {
    const [showAll, setShowAll] = useState(false); // 초기 상태는 하나만 보이도록 설정

    if (!roadEventInfo || !roadEventInfo.body || !roadEventInfo.body.items) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">도로 돌발 교통상황 정보를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    const items = roadEventInfo.body.items || []; 
    if (items.length === 0) {
        return (
            <div className="p-4 bg-white">
                <p className="text-gray-500">도로 돌발 교통상황 정보가 없습니다.</p>
            </div>
        );
    }

    const visibleItems = showAll ? items : [items[0]]; 

    return (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-6">
            <p className="text-sm font-semibold">도로 돌발 교통상황 정보</p>
            {visibleItems.map((item, index) => (
                <div key={index} className="border-b pb-4 mb-4">
                    <h2 className="text-lg font-bold text-gray-800">{item.roadName} ({item.type})</h2>
                    <p className="text-sm text-gray-600">
                        이벤트 유형: {item.eventType} {item.eventDetailType && `(${item.eventDetailType})`}
                    </p>
                    <p className="text-sm text-gray-600">시작: {item.startDate}</p>
                    <p className="text-sm text-gray-600">종료: {item.endDate}</p>
                    <p className="text-sm text-gray-600">메시지: {item.message}</p>
                    <p className="text-sm text-gray-600">좌표: ({item.coordX}, {item.coordY})</p>
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

export default RoadEventInfo;
