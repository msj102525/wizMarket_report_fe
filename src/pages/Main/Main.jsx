const Main = () => {
    const handleLinkClick = (event) => {
        event.preventDefault();

        const width = 394;
        const height = 900;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        window.open(
            "http://localhost:3001/report/wizmarket/report/1",
            "_blank",
            `width=${width},height=${height},top=${top},left=${left}`
        );
    };

    return (
        <div>
            <div className="border">
                <a href="http://localhost:3001/report/wizmarket/report/1" onClick={handleLinkClick} className="flex items-center justify-center">
                    Go to Report 1
                </a>
            </div>
        </div>
    );
}

export default Main;
