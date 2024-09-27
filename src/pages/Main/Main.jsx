const Main = () => {
    const REPORT_TEST_URL = "http://192.168.0.240:3001/wizmarket/report/1";

    const handleLinkClick = (event) => {
        event.preventDefault();

        const width = 394;
        const height = 900;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        window.open(
            // "http://localhost:3001/wizmarket/report/1",
            REPORT_TEST_URL,
            "_blank",
            `width=${width},height=${height},top=${top},left=${left}`
        );
    };

    return (
        <div>
            <div className="border">
                <a href={REPORT_TEST_URL} onClick={handleLinkClick} className="flex items-center justify-center">
                    Go to Report 1
                </a>
            </div>
        </div>
    );
}

export default Main;
