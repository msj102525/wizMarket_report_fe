import React from 'react';

const StoreInfo = ({ store_business_id }) => {
    return (
        <div className='p-4 bg-white'>
            <h2>상가업소번호: {store_business_id}</h2>
            <h3>매장 정보 + 날씨 + GPT</h3>
            <div className="h-64"></div>
        </div>
    );
};

export default StoreInfo;