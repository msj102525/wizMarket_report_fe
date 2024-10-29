import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoreInfo } from '../../stores/storeInfoSlice';
import axios from "axios";
import StoreInfo from "./Component/StoreInfo";
import RisingMenu from "./Component/RisingMenu";
import CommonInformation from "./Component/CommonInformation";
import LocInfoAvgJscore from "./Component/LocInfoAvgJscore";
import Population from "./Component/Population";
import LocInfo from "./Component/LocInfo";
// import RisingBusiness from "./Component/RisingBusiness";
import CommercialDistrictJscore from "./Component/CommercialDistrictJscore";
// import PopulationResidentWork from "./Component/PopulationResidentWork";
import LocInfoMovePop from "./Component/LocInfoMovePop";
import LocInfoStrategy from "./Component/LocInfoStrategy";
// import CommercialDistirct from "./Component/CommercialDistirct";
import CommercialDistrictProfitPerDay from "./Component/CommercialDistrictProfitPerDay";
import CommercialDistrictProfitPerTime from "./Component/CommercialDistrictProfitPerTime";
import CommercialDistrictMainCategoryCount from "./Component/CommercialDistrictMainCategoryCount";
import CommercialDistrictSubCategoryCount from "./Component/CommercialDistrictSubCategoryCount";
// import CommercialDistrictSummary from "./Component/CommercialDistrictSummary";
import CommercialDistrictDetailCategory from "./Component/CommercialDistrictDetailCategory";
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


    // const [populationResidentWorkPopReportData, setPopulationResidentWorkPopReportData] = useState(null);
    // const [loadingPopulationResidentWork, setLoadingPopulationResidentWork] = useState(true);
    // const [errorPopulationResidentWork, setErrorPopulationResidentWork] = useState(null);

    // const [commercialDistrictData, setCommercialDistrictData] = useState(null);
    // const [loadingcommercialDistrictData, setLoadingCommercialDistrictData] = useState(true);
    // const [errorcommercialDistrictData, setErrorCommercialDistrictData] = useState(null);

    // const [commercialDistrictSummaryData, setCommercialDistrictSummaryData] = useState(null);
    // const [loadingcommercialDistrictSummaryData, setLoadingCommercialDistrictSummaryData] = useState(true);
    // const [errorcommercialDistrictSummaryData, setErrorCommercialDistrictSummaryData] = useState(null);

    // const [risingReportData, setRisingReportData] = useState(null);
    // const [loadingRising, setLoadingRising] = useState(true);
    // const [errorRising, setErrorRising] = useState(null);


    useEffect(() => {
        let isMounted = true;  // 컴포넌트 마운트 상태 추적

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
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/common/info`, setter: setCommonReportData, errorSetter: setErrorCommon },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/jscore/average`, setter: setLocInfoAvgJscoreReportData, errorSetter: setErrorLocInfoAvgJscore },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/population`, setter: setPopulationReportData, errorSetter: setErrorPopulation },
                    { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/jscore`, setter: setLocInfoReportData, errorSetter: setErrorLocInfo },
                    // { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict`, setter: setCommercialDistrictData, errorSetter: setErrorCommercialDistrictData },
                    // { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/population/compare`, setter: setPopulationResidentWorkPopReportData, errorSetter: setErrorPopulationResidentWork },
                    // { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/gpt/report_loc_info`, setter: setCommercialDistrictSummaryData, errorSetter: setErrorCommercialDistrictSummaryData },
                    // { url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/rising`, setter: setRisingReportData, errorSetter: setErrorRising },
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
                    setLoadingCommon(false);
                    setLoadingLocInfoAvgJscore(false);
                    setLoadingPopulation(false);
                    setLoadingLocInfo(false);
                    // setLoadingPopulationResidentWork(false);
                    // setLoadingCommercialDistrictData(false);
                    // setLoadingCommercialDistrictSummaryData(false);
                    // setLoadingRising(false);
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
                    {!errorCommon && !loadingCommon && commonReportData.map((commonReport) => (
                        <div className="px-2 py-1" key={commonReport.common_information_id}>
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
                    {renderSection(LocInfo, { locInfoReportData, storeInfoRedux }, loadingLocInfo, errorLocInfo, 'LocInfo')}
                </section>

                <section className="px-2 py-1 ">
                    {/* {renderSection(PopulationResidentWork, { populationResidentWorkPopReportData }, loadingPopulationResidentWork, errorPopulationResidentWork, 'PopulationResidentWork')} */}
                </section>

                <section className="px-2 py-1 ">
                    <LocInfoMovePop />
                </section>

                <section className="px-2 py-1 ">
                    <LocInfoStrategy />
                </section>

                <section className="px-2 py-1 ">
                    <CommercialDistrictJscore />
                </section>

                <section className="px-2 py-1 ">
                    <CommercialDistrictMainCategoryCount />
                </section>

                <section className="px-2 py-1 ">
                    <CommercialDistrictSubCategoryCount />
                </section>

                <section className="px-2 py-1 ">
                    {/* {renderSection(CommercialDistrictSummary, { commercialDistrictSummaryData }, loadingcommercialDistrictSummaryData, errorcommercialDistrictSummaryData, 'CommercialDistrictSummary')} */}
                </section>

                <section className="px-2 py-1 ">
                    {/* {renderSection(CommercialDistirct, { commercialDistrictData }, loadingcommercialDistrictData, errorcommercialDistrictData, 'CommercialDistirct')} */}
                </section>

                <section className="px-2 py-1 ">
                    <CommercialDistrictProfitPerDay />
                </section>

                <section className="px-2 py-1 ">
                    <CommercialDistrictProfitPerTime />
                </section>

                <section className="px-2 py-1 ">
                    <CommercialDistrictDetailCategory />
                </section>

                <section className="px-2 py-1 ">
                    {/* {renderSection(RisingBusiness, { risingReportData }, loadingRising, errorRising, 'RisingBusiness')} */}
                </section>

                <section className="px-2 py-1 ">
                    <Footer />
                </section>

            </div>
        </main>
    );
});

export default Report;
