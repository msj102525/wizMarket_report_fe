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
import CommercialDistrictRisingSales from "./Component/CommercialDistrictRisingSales"
import RisingBusiness from "./Component/RisingBusiness";
import Footer from "./Component/Footer";

const Report = React.memo(() => {
    const { store_business_id } = useParams();

    const dispatch = useDispatch();
    const storeInfoRedux = useSelector((state) => state.storeInfo);

    const [storeInfo, setStoreInfo] = useState(null);
    const [loadingStoreInfo, setLoadingStoreInfo] = useState(true);
    const [errorStoreInfo, setErrorStoreInfo] = useState(null);

    const [risingMenuGPTData, setrisingMenuGPTData] = useState(null);
    const [loadingrisingMenuGPTData, setLoadingrisingMenuGPTData] = useState(true);
    const [errorrisingMenuGPTData, setErrorrisingMenuGPTData] = useState(null);

    const [commercialDistrictReport, setCommercialDistrictReport] = useState(null);
    const [loadingCommercialDistrictReport, setLoadingCommercialDistrictReport] = useState(true);
    const [errorCommercialDistrictReport, setErrorCommercialDistrictReport] = useState(null);

    const [commonReportData, setCommonReportData] = useState(null);
    const [loadingCommon, setLoadingCommon] = useState(true);
    const [errorCommon, setErrorCommon] = useState(null);

    const [locInfoAvgJscoreReportData, setLocInfoAvgJscoreReportData] = useState(null);
    const [loadingLocInfoAvgJscore, setLoadingLocInfoAvgJscore] = useState(true);
    const [errorLocInfoAvgJscore, setErrorLocInfoAvgJscore] = useState(null);

    const [populationReportData, setPopulationReportData] = useState(null);
    const [loadingPopulation, setLoadingPopulation] = useState(true);
    const [errorPopulation, setErrorPopulation] = useState(null);

    const [locInfoReportData, setLocInfoReportData] = useState(null);
    const [loadingLocInfo, setLoadingLocInfo] = useState(true);
    const [errorLocInfo, setErrorLocInfo] = useState(null);

    const [commercialDistrictAvgJscoreReportData, setCommercialDistrictAvgJscoreReportData] = useState(null);
    const [loadingCommercialDistrictAvgJscore, setLoadingCommercialDistrictAvgJscore] = useState(true);
    const [errorCommercialDistrictAvgJscore, setErrorCommercialDistrictAvgJscore] = useState(null);

    const [populationResidentWorkPopReportData, setPopulationResidentWorkPopReportData] = useState(null);
    const [loadingPopulationResidentWork, setLoadingPopulationResidentWork] = useState(true);
    const [errorPopulationResidentWork, setErrorPopulationResidentWork] = useState(null);

    const [locInfoMovePopReportData, setLocInfoMovePopReportData] = useState(null);
    const [loadingLocInfoMovePop, setLoadingLocInfoMovePop] = useState(true);
    const [errorLocInfoMovePop, setErrorLocInfoMovePop] = useState(null);

    const [commercialDistrictMainCategoryCountData, setCommercialDistrictMainCategoryCountData] = useState(null);
    const [loadingCommercialDistrictMainCategoryCountData, setLoadingCommercialDistrictMainCategoryCountData] = useState(true);
    const [errorCommercialDistrictMainCategoryCountData, setErrorCommercialDistrictMainCategoryCountData] = useState(null);

    const [commercialDistrictJscore, setCommercialDistrictJscore] = useState(null);
    const [loadingCommercialDistrictJscore, setLoadingCommercialDistrictJscore] = useState(true);
    const [errorCommercialDistrictJscore, setErrorCommercialDistrictJscore] = useState(null);

    const [commercialDistrictWeekdaySales, setCommercialDistrictWeekdaySales] = useState(null);
    const [loadingCommercialDistrictWeekdaySales, setLoadingCommercialDistrictWeekdaySales] = useState(true);
    const [errorCommercialDistrictWeekdaySales, setErrorCommercialDistrictWeekdaySales] = useState(null);

    const [commercialDistrictTimeSales, setCommercialDistrictTimeSales] = useState(null);
    const [loadingCommercialDistrictTimeSales, setLoadingCommercialDistrictTimeSales] = useState(true);
    const [errorCommercialDistrictTimeSales, setErrorCommercialDistrictTimeSales] = useState(null);

    const [commercialRisingSales, setCommercialRisingSales] = useState(null);
    const [loadingCommercialRisingSales, setLoadingCommercialRisingSales] = useState(true);
    const [errorCommercialRisingSales, setErrorCommercialRisingSales] = useState(null);

    const [risingReportData, setRisingReportData] = useState(null);
    const [loadingRising, setLoadingRising] = useState(true);
    const [errorRising, setErrorRising] = useState(null);



    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {

                if (!isMounted) return;

                const endpoints = [
                    {
                        url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/store/info/redux`,
                        setter: (data) => dispatch(fetchStoreInfo.fulfilled(data)),
                        errorSetter: (error) => dispatch(fetchStoreInfo.rejected(null, null, error))
                    },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/store/info`, setter: setStoreInfo, errorSetter: setErrorStoreInfo },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/rising/menu/advice`, setter: setrisingMenuGPTData, errorSetter: setErrorrisingMenuGPTData },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict`, setter: setCommercialDistrictReport, errorSetter: setErrorCommercialDistrictReport },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/common/info`, setter: setCommonReportData, errorSetter: setErrorCommon },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/jscore/average`, setter: setLocInfoAvgJscoreReportData, errorSetter: setErrorLocInfoAvgJscore },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/population`, setter: setPopulationReportData, errorSetter: setErrorPopulation },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/jscore`, setter: setLocInfoReportData, errorSetter: setErrorLocInfo },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/resident/work/compare`, setter: setPopulationResidentWorkPopReportData, errorSetter: setErrorPopulationResidentWork },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict/jscore/average`, setter: setCommercialDistrictAvgJscoreReportData, errorSetter: setErrorCommercialDistrictAvgJscore },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/move/population`, setter: setLocInfoMovePopReportData, errorSetter: setErrorLocInfoMovePop },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict/mainCategory/count`, setter: setCommercialDistrictMainCategoryCountData, errorSetter: setErrorCommercialDistrictMainCategoryCountData },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict/jscore`, setter: setCommercialDistrictJscore, errorSetter: setErrorCommercialDistrictJscore },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict/weekday/sales`, setter: setCommercialDistrictWeekdaySales, errorSetter: setErrorCommercialDistrictWeekdaySales },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict/time/sales`, setter: setCommercialDistrictTimeSales, errorSetter: setErrorCommercialDistrictTimeSales },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict/rising/sales`, setter: setCommercialRisingSales, errorSetter: setErrorCommercialRisingSales },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/rising/business`, setter: setRisingReportData, errorSetter: setErrorRising },
                ];

                const fetchEndpoint = async (endpoint) => {
                    try {
                        const response = await axios.get(endpoint.url, { params: { store_business_id } });
                        if (isMounted) {
                            endpoint.setter(response.data);
                        }
                    } catch (error) {
                        if (isMounted) {
                            console.error(`Error fetching ${endpoint.url}:`, error);
                            endpoint.errorSetter(error.message);
                        }
                    }
                };

                await Promise.all(endpoints.map(fetchEndpoint));

                // 모든 요청이 완료된 후 로딩 상태를 false로 설정
                if (isMounted) {
                    setLoadingStoreInfo(false);
                    setLoadingrisingMenuGPTData(false);
                    setLoadingCommercialDistrictReport(false);
                    setLoadingCommon(false);
                    setLoadingLocInfoAvgJscore(false);
                    setLoadingPopulation(false);
                    setLoadingLocInfo(false);
                    setLoadingPopulationResidentWork(false);
                    setLoadingCommercialDistrictAvgJscore(false);
                    setLoadingLocInfoMovePop(false);
                    setLoadingCommercialDistrictMainCategoryCountData(false);
                    setLoadingCommercialDistrictJscore(false);
                    setLoadingCommercialDistrictWeekdaySales(false);
                    setLoadingCommercialDistrictTimeSales(false);
                    setLoadingRising(false);
                    setLoadingCommercialRisingSales(false);
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Error in fetchData:', error);
                }
            }

        };

        if (store_business_id) {
            fetchData();
        }

        return () => {
            isMounted = false;  // 클린업 함수
        };

    }, [store_business_id, dispatch]);


    const renderSection = (Component, data, loading, error, componentName, additionalProps = {}) => {
        if (loading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                </div>
            );
        }
        if (error) {
            return (
                <div className="p-4 bg-white">
                    <p className="text-red-500">'{componentName}' 데이터를 불러오는 중 오류가 발생했습니다: {error}</p>
                </div>
            );
        }
        return data ? <Component {...data} {...additionalProps} /> : null;
    };


    return (
        <main className="report bg-gray-100 max-w-[394px] flex justify-center">
            <div className="w-full">

                <section className="">
                    {renderSection(StoreInfo, { storeInfo, storeInfoRedux }, loadingStoreInfo, errorStoreInfo, 'StoreInfo')}
                </section>

                <section className="px-2 py-1">
                    {renderSection(RisingMenu, { risingMenuGPTData, storeInfoRedux }, loadingrisingMenuGPTData, errorrisingMenuGPTData, 'RisingMenu')}
                </section>

                <section className="px-2 py-1">
                    {renderSection(CommercialDistrict, { commercialDistrictReport, storeInfoRedux }, loadingCommercialDistrictReport, errorCommercialDistrictReport, 'CommercialDistrict')}
                </section>

                <section className="px-2 py-1">
                    {!errorCommon && !loadingCommon && commonReportData.map((commonReport) => (
                        <div className="" key={commonReport.common_information_id}>
                            {renderSection(CommonInformation, { commonReport }, false, null, 'CommonInformation')}
                        </div>
                    ))}
                    {(loadingCommon || errorCommon) && renderSection(CommonInformation, {}, loadingCommon, errorCommon, 'CommonInformation')}
                </section>

                <section className="px-2 py-1 ">
                    {renderSection(LocInfoAvgJscore, { locInfoAvgJscoreReportData, storeInfoRedux }, loadingLocInfoAvgJscore, errorLocInfoAvgJscore, 'LocInfoAvgJscore')}
                </section>

                <section className="px-2 py-1 ">
                    {renderSection(Population, { populationReportData, storeInfoRedux }, loadingPopulation, errorPopulation, 'Population')}
                </section>

                <section className="px-2 py-1 ">
                    {renderSection(LocInfoJScore, { locInfoReportData, storeInfoRedux }, loadingLocInfo, errorLocInfo, 'LocInfoJScore')}
                </section>

                <section className="px-2 py-1 ">
                    {renderSection(PopulationResidentWork, { populationResidentWorkPopReportData, storeInfoRedux }, loadingPopulationResidentWork, errorPopulationResidentWork, 'PopulationResidentWork')}
                </section>

                <section className="px-2 py-1 ">
                    {renderSection(LocInfoMovePop, { locInfoMovePopReportData, storeInfoRedux }, loadingLocInfoMovePop, errorLocInfoMovePop, 'LocInfoMovePop')}
                </section>

                <section className="px-2 py-1 ">
                    {renderSection(CommercialDistrictAvgJScore, { commercialDistrictAvgJscoreReportData, storeInfoRedux }, loadingCommercialDistrictAvgJscore, errorCommercialDistrictAvgJscore, 'CommercialDistrictAvgJScore')}
                </section>

                <section className="px-2 py-1 ">
                    {renderSection(CommercialDistrictMainCategoryCount, { commercialDistrictMainCategoryCountData, storeInfoRedux }, loadingCommercialDistrictMainCategoryCountData, errorCommercialDistrictMainCategoryCountData, 'CommercialDistrictMainCategoryCount')}
                </section>

                <section className="px-2 py-1 ">
                    {renderSection(CommercialDistirctJScore, { commercialDistrictJscore, storeInfoRedux }, loadingCommercialDistrictJscore, errorCommercialDistrictJscore, 'CommercialDistirctJscore')}
                </section>

                <section className="px-2 py-1 ">
                    {renderSection(CommercialDistrictWeekdaySales, { commercialDistrictWeekdaySales }, loadingCommercialDistrictWeekdaySales, errorCommercialDistrictWeekdaySales, 'CommercialDistrictWeekdaySales')}
                </section>

                <section className="px-2 py-1 ">
                    {renderSection(CommercialDistrictTimeSales, { commercialDistrictTimeSales }, loadingCommercialDistrictTimeSales, errorCommercialDistrictTimeSales, 'CommercialDistrictTimeSales')}
                </section>

                <section className="px-2 py-1 ">
                    {renderSection(CommercialDistrictRisingSales, { commercialRisingSales, storeInfoRedux }, loadingCommercialRisingSales, errorCommercialRisingSales, 'CommercialDistrictRisingSales')}
                </section>

                <section className="px-2 py-1 ">
                    {renderSection(RisingBusiness, { risingReportData, storeInfoRedux }, loadingRising, errorRising, 'RisingBusiness')}
                </section>

                <section className="px-2 py-1 ">
                    <Footer />
                </section>

            </div>
        </main>
    );
});


// //////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoreInfo } from '../../stores/storeInfoSlice';
import axios from "axios";

const Reportt = React.memo(() => {
    const { store_business_id } = useParams();
    const dispatch = useDispatch();
    const storeInfoRedux = useSelector((state) => state.storeInfo);

    // 각 컴포넌트별 상태 관리
    const [componentStates, setComponentStates] = useState({
        storeInfo: { loading: true, data: null, error: null },
        risingMenu: { loading: true, data: null, error: null },
        commercialDistrict: { loading: true, data: null, error: null },
        // ... 다른 컴포넌트들
    });

    useEffect(() => {
        const fetchComponentData = async (endpoint, key) => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_FASTAPI_BASE_URL}${endpoint}`,
                    { params: { store_business_id } }
                );

                // 개별 컴포넌트 상태 업데이트
                setComponentStates(prev => ({
                    ...prev,
                    [key]: {
                        loading: false,
                        data: response.data,
                        error: null
                    }
                }));

                // Redux 액션이 필요한 경우 처리
                if (key === 'storeInfo') {
                    dispatch(fetchStoreInfo.fulfilled(response.data));
                }
            } catch (error) {
                setComponentStates(prev => ({
                    ...prev,
                    [key]: {
                        loading: false,
                        data: null,
                        error: error.message
                    }
                }));
            }
        };

        const endpoints = [
            { key: 'storeInfo', url: '/report/store/info' },
            { key: 'risingMenu', url: '/report/rising/menu/advice' },
            { key: 'commercialDistrict', url: '/report/commercialDistrict' },
            // ... 다른 엔드포인트들
        ];

        // 모든 요청을 동시에 시작하되, 각각 독립적으로 처리
        Promise.all(
            endpoints.map(({ url, key }) => fetchComponentData(url, key))
        ).catch(error => {
            console.error('Some requests failed:', error);
        });

    }, [store_business_id, dispatch]);

    // 개별 컴포넌트 렌더링 함수
    const renderComponent = (Component, key) => {
        const { loading, data, error } = componentStates[key];

        if (loading) {
            return (
                <div className="flex justify-center items-center h-32">
                    <div className="w-8 h-8 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="p-4 bg-white rounded shadow">
                    <p className="text-red-500">데이터를 불러오는 중 오류가 발생했습니다: {error}</p>
                </div>
            );
        }

        return data && <Component data={data} storeInfoRedux={storeInfoRedux} />;
    };

    return (
        <main className="report bg-gray-100 max-w-[394px] flex justify-center">
            <div className="w-full">
                <section className="">
                    {renderComponent(StoreInfo, 'storeInfo')}
                </section>

                <section className="px-2 py-1">
                    {renderComponent(RisingMenu, 'risingMenu')}
                </section>

                <section className="px-2 py-1">
                    {renderComponent(CommercialDistrict, 'commercialDistrict')}
                </section>

                {/* 다른 섹션들도 같은 방식으로 처리 */}
            </div>
        </main>
    );
});

// 자식 컴포넌트 예시
const StoreInfo = React.memo(({ data, storeInfoRedux }) => {
    // 데이터가 로드되면 바로 렌더링
    return (
        <div className="bg-white p-4 rounded shadow">
            {/* 컴포넌트 내용 */}
        </div>
    );
});

export default Report;
