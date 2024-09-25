import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Report = () => {
    const { reportId } = useParams();
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/report/info/common`);
                setReportData(response.data); // 여러 개의 보고서를 상태에 저장
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
        return <p>보고서 데이터를 가져오는 중 오류가 발생했습니다: {error.message}</p>; // 오류 메시지
    }

    // 보고서가 없을 경우 처리
    if (reportData.length === 0) {
        return <p>보고서가 없습니다.</p>;
    }

    return (
        <div>
            <h1>보고서 목록</h1>
            <h1>보고서 아이디: {reportId}</h1>
            <ul>
                {reportData.map((report) => (
                    <li key={report.common_information_id}>
                        <h2>{report.title}</h2>
                        <p>{report.content}</p>
                        <p>작성일: {new Date(report.reg_date).toLocaleDateString()}</p> {/* 작성일 형식 변경 */}
                        <p>작성자: {report.reg_id}</p> {/* reg_id로 작성자 표시, 필요시 수정 가능 */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Report;
