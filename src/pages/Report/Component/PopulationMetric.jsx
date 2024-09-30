const PopulationMetric = ({ label, value, jScore }) => {
    // 숫자 포맷팅 함수
    const formatNumber = (value) => {
        if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}k`;
        }
        return value.toString();
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <p className='text-xs text-gray-600'>{label}</p>
            <p className='text-lg'>{formatNumber(value)}</p>
            <div
                className={`w-10 h-10 rounded-[50%] text-center text-white content-center 
                    ${jScore <= 2 ? 'bg-blue-500' :
                        jScore <= 4 ? 'bg-green-500' :
                            jScore <= 6 ? 'bg-yellow-500' :
                                jScore <= 8 ? 'bg-pink-500' :
                                    jScore <= 10 ? 'bg-red-500' : 'bg-transparent'
                    }`}
            >
                {jScore}
            </div>
        </div>
    );
};

export default PopulationMetric;
