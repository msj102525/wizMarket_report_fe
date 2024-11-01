import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoreInfo } from '../../stores/storeInfoSlice';
import axios from "axios";
import StoreInfo from "./Component/StoreInfo";
import RisingMenu from "./Component/RisingMenu";
import CommercialDistrict from "./Component/CommercialDistrict";
import CommonInformation from "./Component/CommonInformation";
import LocInfoAvgJscore from "./Component/LocInfoAvgJscore";
import Population from "./Component/Population";
import LocInfoJScore from "./Component/LocInfoJScore";
import PopulationResidentWork from "./Component/PopulationResidentWork";
import CommercialDistrictAvgJScore from "./Component/CommercialDistrictAvgJScore";
import LocInfoMovePop from "./Component/LocInfoMovePop";
import CommercialDistrictMainCategoryCount from "./Component/CommercialDistrictMainCategoryCount";
import CommercialDistirctJScore from "./Component/CommercialDistirctJScore";
import CommercialDistrictWeekdaySales from "./Component/CommercialDistrictWeekdaySales";
import CommercialDistrictTimeSales from "./Component/CommercialDistrictTimeSales";
import CommercialDistrictRisingSales from "./Component/CommercialDistrictRisingSales";
import RisingBusiness from "./Component/RisingBusiness";
import Footer from "./Component/Footer";

const Report = React.memo(() => {
    const { store_business_id } = useParams();
    const dispatch = useDispatch();
    const storeInfoRedux = useSelector((state) => state.storeInfo);


    // Consolidated states
    const [states, setStates] = useState({
        loading: {
            storeInfo: true,
            risingMenu: true,
            commercialDistrict: true,
            commonInfo: true,
            locInfoAvgJscore: true,
            population: true,
            locInfo: true,
            populationResidentWork: true,
            locInfoMovePop: true,
            commercialDistrictAvgJscore: true,
            commercialDistrictMainCategory: true,
            commercialDistrictJscore: true,
            commercialDistrictWeekdaySales: true,
            commercialDistrictTimeSales: true,
            commercialRisingSales: true,
            risingBusiness: true,
        },
        data: {
            storeInfo: null,
            risingMenu: null,
            commercialDistrict: null,
            commonInfo: null,
            locInfoAvgJscore: null,
            population: null,
            locInfo: null,
            populationResidentWork: null,
            commercialDistrictAvgJscore: null,
            locInfoMovePop: null,
            commercialDistrictMainCategory: null,
            commercialDistrictJscore: null,
            commercialDistrictWeekdaySales: null,
            commercialDistrictTimeSales: null,
            commercialRisingSales: null,
            risingBusiness: null,
        },
        error: {
            storeInfo: null,
            risingMenu: null,
            commercialDistrict: null,
            commonInfo: null,
            locInfoAvgJscore: null,
            population: null,
            locInfo: null,
            populationResidentWork: null,
            commercialDistrictAvgJscore: null,
            locInfoMovePop: null,
            commercialDistrictMainCategory: null,
            commercialDistrictJscore: null,
            commercialDistrictWeekdaySales: null,
            commercialDistrictTimeSales: null,
            commercialRisingSales: null,
            risingBusiness: null,
        }
    });

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            const endpoints = [
                {
                    key: 'storeInfo',
                    url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/store/info/redux`,
                    reduxAction: true
                },
                {
                    key: 'storeInfo',
                    url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/store/info`
                },
                {
                    key: 'risingMenu',
                    url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/rising/menu/advice`
                },
                {
                    key: 'commercialDistrict',
                    url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict`
                },
                {
                    key: 'commonInfo',
                    url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/common/info`
                },
                {
                    key: 'locInfoAvgJscore',
                    url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/jscore/average`
                },
                {
                    key: 'population',
                    url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/population`
                },
                {
                    key: 'locInfo',
                    url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/jscore`
                },
                {
                    key: 'populationResidentWork',
                    url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/resident/work/compare`
                },
                {
                    key: 'commercialDistrictAvgJscore',
                    url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict/jscore/average`
                },
                {
                    key: 'locInfoMovePop',
                    url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/move/population`
                },
                {
                    key: 'commercialDistrictMainCategory',
                    url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict/mainCategory/count`
                },
                {
                    key: 'commercialDistrictJscore',
                    url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict/jscore`
                },
                {
                    key: 'commercialDistrictWeekdaySales',
                    url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict/weekday/sales`
                },
                {
                    key: 'commercialDistrictTimeSales',
                    url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict/time/sales`
                },
                {
                    key: 'commercialRisingSales',
                    url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict/rising/sales`
                },
                {
                    key: 'risingBusiness',
                    url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/rising/business`
                }
            ];

            const fetchEndpoint = async (endpoint) => {
                try {
                    const response = await axios.get(endpoint.url, { params: { store_business_id } });
                    if (isMounted) {
                        if (endpoint.reduxAction) {
                            dispatch(fetchStoreInfo.fulfilled(response.data));
                        } else {
                            setStates(prev => ({
                                ...prev,
                                data: { ...prev.data, [endpoint.key]: response.data },
                                loading: { ...prev.loading, [endpoint.key]: false }
                            }));
                        }
                    }
                } catch (error) {
                    if (isMounted) {
                        console.error(`Error fetching ${endpoint.url}:`, error);
                        setStates(prev => ({
                            ...prev,
                            error: { ...prev.error, [endpoint.key]: error.message },
                            loading: { ...prev.loading, [endpoint.key]: false }
                        }));
                        if (endpoint.reduxAction) {
                            dispatch(fetchStoreInfo.rejected(null, null, error));
                        }
                    }
                }
            };

            await Promise.all(endpoints.map(fetchEndpoint));
        };

        if (store_business_id) {
            fetchData();
        }

        return () => {
            isMounted = false;
        };
    }, [store_business_id, dispatch]);

    const renderSection = (Component, key, additionalProps = {}) => {
        if (states.loading[key]) {
            return (
                <div className="flex justify-center items-center h-64">
                    <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                </div>
            );
        }
        if (states.error[key]) {
            return (
                <div className="p-4 bg-white">
                    <p className="text-red-500">'{key}' 데이터를 불러오는 중 오류가 발생했습니다: {states.error[key]}</p>
                </div>
            );
        }
        return states.data[key] ? <Component {...states.data[key]} {...additionalProps} /> : null;
    };

    return (
        <main className="report bg-gray-100 max-w-[394px] flex justify-center">
            <div className="w-full">
                <section className="">
                    {renderSection(StoreInfo, 'storeInfo', { storeInfo: states.data.storeInfo, storeInfoRedux })}
                </section>

                <section className="px-2 py-1">
                    {renderSection(RisingMenu, 'risingMenu', { risingMenu: states.data.risingMenu, storeInfoRedux })}
                </section>

                <section className="px-2 py-1">
                    {renderSection(CommercialDistrict, 'commercialDistrict', { commercialDistrict: states.data.commercialDistrict, storeInfoRedux })}
                </section>

                <section className="px-2 py-1">
                    {!states.error.commonInfo && !states.loading.commonInfo && states.data.commonInfo?.map((commonReport) => (
                        <div className="" key={commonReport.common_information_id}>
                            {renderSection(CommonInformation, 'commonInfo', { commonReport })}
                        </div>
                    ))}
                </section>

                <section className="px-2 py-1">
                    {renderSection(LocInfoAvgJscore, 'locInfoAvgJscore', { locInfoAvgJscore: states.data.locInfoAvgJscore, storeInfoRedux })}
                </section>

                <section className="px-2 py-1">
                    {renderSection(Population, 'population', { population: states.data.population, storeInfoRedux })}
                </section>

                <section className="px-2 py-1">
                    {renderSection(LocInfoJScore, 'locInfo', { locInfo: states.data.locInfo, storeInfoRedux })}
                </section>

                <section className="px-2 py-1">
                    {renderSection(PopulationResidentWork, 'populationResidentWork', { populationResidentWork: states.data.populationResidentWork, storeInfoRedux })}
                </section>

                <section className="px-2 py-1">
                    {renderSection(LocInfoMovePop, 'locInfoMovePop', { locInfoMovePop: states.data.locInfoMovePop, storeInfoRedux })}
                </section>

                <section className="px-2 py-1">
                    {renderSection(CommercialDistrictAvgJScore, 'commercialDistrictAvgJscore', { commercialDistrictAvgJscore: states.data.commercialDistrictAvgJscore, storeInfoRedux })}
                </section>

                <section className="px-2 py-1">
                    {renderSection(CommercialDistrictMainCategoryCount, 'commercialDistrictMainCategory', { commercialDistrictMainCategory: states.data.commercialDistrictMainCategory, storeInfoRedux })}
                </section>

                <section className="px-2 py-1">
                    {renderSection(CommercialDistirctJScore, 'commercialDistrictJscore', { commercialDistrictJscore: states.data.commercialDistrictJscore, storeInfoRedux })}
                </section>

                <section className="px-2 py-1">
                    {renderSection(CommercialDistrictWeekdaySales, 'commercialDistrictWeekdaySales', { commercialDistrictWeekdaySales: states.data.commercialDistrictWeekdaySales, storeInfoRedux })}
                </section>

                <section className="px-2 py-1">
                    {renderSection(CommercialDistrictTimeSales, 'commercialDistrictTimeSales', { commercialDistrictTimeSales: states.data.commercialDistrictTimeSales, storeInfoRedux })}
                </section>

                <section className="px-2 py-1">
                    {renderSection(CommercialDistrictRisingSales, 'commercialRisingSales', { commercialRisingSales: states.data.commercialRisingSales, storeInfoRedux })}
                </section>

                <section className="px-2 py-1">
                    {renderSection(RisingBusiness, 'risingBusiness', { risingBusiness: states.data.risingBusiness, storeInfoRedux })}
                </section>

                <section className="px-2 py-1">
                    <Footer />
                </section>
            </div>
        </main>
    );
});

export default Report;