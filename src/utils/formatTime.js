// utils/formatTime.js
const formatTime = (timeString) => {
    // 입력값이 문자열이 아니면 문자열로 변환
    if (typeof timeString !== 'string') {
        timeString = String(timeString);
    }

    if (!timeString) return "데이터 없음";

    const length = timeString.length;

    if (length <= 4) {
        const hours = parseInt(timeString.substring(0, 2), 10);
        const minutes = timeString.substring(2, 4);
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes} ${period}`;
    }

    if (length >= 5) {
        const hours = parseInt(timeString.substring(0, 2), 10);
        const minutes = timeString.substring(2, 4);
        const seconds = length === 6 ? timeString.substring(4, 6) : "00";
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return length === 6
            ? `${formattedHours}:${minutes} ${seconds} ${period}`
            : `${formattedHours}:${minutes} ${period}`;
    }

    return "Err";
};

export default formatTime;
