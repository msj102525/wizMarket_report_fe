import React, { useEffect, useState, useCallback, useMemo } from "react";
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
import StoreDescription from "./Component/StoreDescription";
import StoreCategoryDescription from "./Component/StoreCategoryDescription";

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
            commercialDistrictAvgJscore: true,
            locInfoMovePop: true,
            commercialDistrictMainCategory: true,
            commercialDistrictJscore: true,
            commercialDistrictWeekdaySales: true,
            commercialDistrictTimeSales: true,
            commercialRisingSales: true,
            risingBusiness: true,
            storeDescription: true,
            storeCategoryDescription: true,
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
            storeDescription: null,
            storeCategoryDescription: null,
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
            storeDescription: null,
            storeCategoryDescription: null,
        }
    });

    const [storeInfoReceived, setStoreInfoReceived] = useState(false);

    const ENDPOINT_GROUPS = useMemo(() => ({
        essential: [
            {
                key: 'storeInfoRedux',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/store/info/redux`,
                reduxAction: true
            },
        ],
        primary: [
            // 매장 정보는 예외적으로 1순위
            {
                key: 'storeInfo',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/store/info`
            },
            {
                key: 'commonInfo',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/common/info`
            },
            {
                key: 'commercialDistrict',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict`
            },
            {
                key: 'locInfoAvgJscore',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/jscore/average`
            },
            {
                key: 'storeDescription',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/local/store/content`
            },
            {
                key: 'storeCategoryDescription',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/detail/category/content`
            },
            {
                key: 'population',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/population`
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
        ],
        // GPT
        secondary: [

            {
                key: 'risingMenu',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/rising/menu/advice`,
                condition: (storeData) => storeData?.biz_main_category_id === 1
            },
            {
                key: 'locInfo',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/jscore`
            },
            {
                key: 'risingBusiness',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/rising/business`
            },
        ],

    }), []);

    const fetchEndpoint = useCallback(async (endpoint, controller, isMountedRef) => {
        // if (endpoint.key === 'risingMenu') {
        //     console.log('Checking risingMenu condition:', {
        //         storeInfoRedux,
        //         hasCondition: !!endpoint.condition,
        //         conditionResult: endpoint.condition ? endpoint.condition(storeInfoRedux) : 'no condition'
        //     });
        // }

        

        try {
            const response = await axios.get(endpoint.url, {
                params: { store_business_id },
                timeout: 60000,
                signal: controller.signal
            });

            if (!isMountedRef.current) return;

            if (endpoint.condition && !endpoint.condition(storeInfoRedux)) {
                // console.log(`Skipping ${endpoint.key} due to condition not met`);
                setStates(prev => ({
                    ...prev,
                    loading: { ...prev.loading, [endpoint.key]: false }
                }));
                return;
            }

            if (endpoint.reduxAction) {
                dispatch(fetchStoreInfo.fulfilled(response.data));
                setStoreInfoReceived(true);
            } else {
                setStates(prev => ({
                    ...prev,
                    data: { ...prev.data, [endpoint.key]: response.data },
                    loading: { ...prev.loading, [endpoint.key]: false }
                }));
            }
        } catch (error) {
            if (!isMountedRef.current) return;
            if (error.name === 'AbortError') return;

            console.error(`Error fetching ${endpoint.key}:`, error);
            setStates(prev => ({
                ...prev,
                error: { ...prev.error, [endpoint.key]: error.message },
                loading: { ...prev.loading, [endpoint.key]: false }
            }));

            if (endpoint.reduxAction) {
                dispatch(fetchStoreInfo.rejected(null, null, error));
            }
        }
    }, [store_business_id, dispatch, storeInfoRedux]);

    const fetchGroupWithDelay = useCallback(async (endpoints, delay = 0, controller, isMountedRef) => {
        if (delay > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        const BATCH_SIZE = 3;
        for (let i = 0; i < endpoints.length; i += BATCH_SIZE) {
            const batch = endpoints.slice(i, i + BATCH_SIZE);
            await Promise.all(batch.map(endpoint =>
                fetchEndpoint(endpoint, controller, isMountedRef)
            ));
        }
    }, [fetchEndpoint]);

    useEffect(() => {
        const isMountedRef = { current: true };
        const controller = new AbortController();

        const fetchEssentialData = async () => {
            if (!store_business_id) return;
            await fetchGroupWithDelay(ENDPOINT_GROUPS.essential, 0, controller, isMountedRef);
        };

        fetchEssentialData();

        return () => {
            isMountedRef.current = false;
            controller.abort();
        };
    }, [store_business_id, fetchGroupWithDelay, ENDPOINT_GROUPS.essential]);

    useEffect(() => {
        const isMountedRef = { current: true };
        const controller = new AbortController();

        const fetchRemainingData = async () => {
            if (!storeInfoReceived || !storeInfoRedux) return;

            // console.log('Fetching remaining data with storeInfoRedux:', storeInfoRedux);

            try {
                await Promise.all([
                    fetchGroupWithDelay(ENDPOINT_GROUPS.primary, 100, controller, isMountedRef),
                    fetchGroupWithDelay(ENDPOINT_GROUPS.secondary, 200, controller, isMountedRef)
                ]);
            } catch (error) {
                console.error('Error in fetchRemainingData:', error);
            }
        };

        fetchRemainingData();

        return () => {
            isMountedRef.current = false;
            controller.abort();
        };
    }, [storeInfoRedux, storeInfoReceived, fetchGroupWithDelay, ENDPOINT_GROUPS]);


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
                <div className="p-4 bg-white rounded-lg shadow">
                    <p className="text-red-500">
                        '{key}' 데이터를 불러오는 중 오류가 발생했습니다: {states.error[key]}
                    </p>
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

                <section className="px-1 py-1">
                    {renderSection(RisingMenu, 'risingMenu', { risingMenu: states.data.risingMenu, storeInfoRedux })}
                </section>

                <section className="px-1 py-1">
                    {renderSection(CommercialDistrict, 'commercialDistrict', { commercialDistrict: states.data.commercialDistrict, storeInfoRedux })}
                </section>

                {!states.error.storeDescription && !states.loading.storeDescription && states.data.storeDescription?.map((storeDescription) => (
                    <section className="px-1 py-1" key={storeDescription.local_store_content_id}>
                        {renderSection(StoreDescription, 'storeDescription', { storeDescription })}
                    </section>
                ))}

                {states.data.storeCategoryDescription && states.data.storeCategoryDescription.length > 0 && (
                    <section className="px-1 py-1">
                        {renderSection(StoreCategoryDescription, 'storeCategoryDescription', { storeCategoryDescription: states.data.storeCategoryDescription, storeInfoRedux })}
                    </section>
                )}

                {!states.error.commonInfo && !states.loading.commonInfo && states.data.commonInfo?.map((commonReport) => (
                    <section className="px-1 py-1" key={commonReport.common_information_id}>
                        {renderSection(CommonInformation, 'commonInfo', { commonReport })}
                    </section>
                ))}

                <section className="px-1 py-1">
                    {renderSection(LocInfoAvgJscore, 'locInfoAvgJscore', { locInfoAvgJscore: states.data.locInfoAvgJscore, storeInfoRedux })}
                </section>

                <section className="px-1 py-1">
                    {renderSection(Population, 'population', { population: states.data.population, storeInfoRedux })}
                </section>

                <section className="px-1 py-1">
                    {renderSection(LocInfoJScore, 'locInfo', { locInfo: states.data.locInfo, storeInfoRedux })}
                </section>

                <section className="px-1 py-1">
                    {renderSection(PopulationResidentWork, 'populationResidentWork', { populationResidentWork: states.data.populationResidentWork, storeInfoRedux })}
                </section>

                <section className="px-1 py-1">
                    {renderSection(LocInfoMovePop, 'locInfoMovePop', { locInfoMovePop: states.data.locInfoMovePop, storeInfoRedux })}
                </section>

                <section className="px-1 py-1">
                    {renderSection(CommercialDistrictAvgJScore, 'commercialDistrictAvgJscore', { commercialDistrictAvgJscore: states.data.commercialDistrictAvgJscore, storeInfoRedux })}
                </section>

                <section className="px-1 py-1">
                    {renderSection(CommercialDistrictMainCategoryCount, 'commercialDistrictMainCategory', { commercialDistrictMainCategory: states.data.commercialDistrictMainCategory, storeInfoRedux })}
                </section>

                <section className="px-1 py-1">
                    {renderSection(CommercialDistirctJScore, 'commercialDistrictJscore', { commercialDistrictJscore: states.data.commercialDistrictJscore, storeInfoRedux })}
                </section>

                <section className="px-1 py-1">
                    {renderSection(CommercialDistrictWeekdaySales, 'commercialDistrictWeekdaySales', { commercialDistrictWeekdaySales: states.data.commercialDistrictWeekdaySales, storeInfoRedux })}
                </section>

                <section className="px-1 py-1">
                    {renderSection(CommercialDistrictTimeSales, 'commercialDistrictTimeSales', { commercialDistrictTimeSales: states.data.commercialDistrictTimeSales, storeInfoRedux })}
                </section>

                <section className="px-1 py-1">
                    {renderSection(CommercialDistrictRisingSales, 'commercialRisingSales', { commercialRisingSales: states.data.commercialRisingSales, storeInfoRedux })}
                </section>

                <section className="px-1 py-1">
                    {renderSection(RisingBusiness, 'risingBusiness', { risingBusiness: states.data.risingBusiness, storeInfoRedux })}
                </section>

                <section className="px-1 py-1">
                    <Footer />
                </section>
            </div>
        </main>
    );
});

export default Report;