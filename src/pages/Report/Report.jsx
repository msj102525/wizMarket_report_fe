import React, { useEffect, useState } from "react";
import axios from "axios";
import CommonInformation from "./Component/CommonInformation";
import StoreInfo from "./Component/StoreInfo";
import RisingBusiness from "./Component/RisingBusiness";

const Report = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/report/info/common`);
                console.log(response.data);
                setReportData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReportData();
    }, []);

    if (loading) {
        return <p>로딩 중...</p>;
    }

    if (error) {
        return <p>보고서 데이터를 가져오는 중 오류가 발생했습니다: {error.message}</p>;
    }

    // if (reportData.length === 0) {
    //     return <p>보고서가 없습니다.</p>;
    // }

    return (
        <main className="report bg-gray-100 max-w-[394px] flex justify-center">
            <div className="">
                <section className="">
                    <StoreInfo />
                </section>
                <section className="p-2">
                    <RisingBusiness />
                </section>
                <section className="p-2">
                    {reportData.map((report, idx) => (
                        <div className="py-2">
                            <CommonInformation key={idx} report={report} />
                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
};

export default Report;
