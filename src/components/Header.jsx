import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="div-underline">
            <div className='flex justify-between px-10'>
                <div className="w-72 h-24 border">
                    <Link to="/">
                        <h1>
                            <img src={require('../assets/header/wiz_market_logo.png')} alt="Wiz-Market_logo" className='block w-full h-auto' />
                        </h1>
                    </Link>
                </div>
                <div className="flex border leading-9">
                    <div className="border p-6 font-normal">
                        <p className='text-2xl'>JYes님</p>
                    </div>
                    <div className="border p-6 font-normal">
                        <p className='text-2xl'>Logout</p>
                    </div>
                </div>
            </div>
        </header >
    );
};

export default Header;