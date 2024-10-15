import React from 'react';

const Footer = () => {
    return (
        <div>
            <div className="text-center">
                <p className='font-bold'>WIZ MARKET</p>
                <div className='flex justify-between px-10'>
                    <p className='cursor-pointer'>이용 요금</p>
                    <p>|</p>
                    <p className='cursor-pointer'>프로필 수정</p>
                    <p>|</p>
                    <p className='cursor-pointer'>정보설정</p>
                    <p>|</p>
                    <p className='cursor-pointer'>1:1문의</p>
                </div>
                <p className='text-xs'>서비스 시작일 : 2024-04-15</p>
            </div>
        </div>
    );
};

export default Footer;