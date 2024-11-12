// HTML escape 문자를 원래 문자로 변환하는 함수
export const unescapeHTML = (str) => {
    const htmlEntities = {
        '&lt;': '<',
        '&gt;': '>',
        '&amp;': '&',
        '&quot;': '"',
        '&#39;': "'"
    };
    return str.replace(/&[^;]+;/g, (entity) => htmlEntities[entity] || entity);
};

// 유튜브 iframe이 포함되어 있는지 확인하는 함수
export const hasYoutubeIframe = (content) => {

    console.log(content)
    if (!content) return false;
    const unescapedContent = unescapeHTML(content);
    return unescapedContent.includes('<iframe') && unescapedContent.includes('youtube.com');
};
