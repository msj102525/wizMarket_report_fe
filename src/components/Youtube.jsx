import React from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = ({ content }) => {

    // console.log(content)

    // HTML escape 문자를 원래 문자로 변환하는 함수
    const unescapeHTML = (str) => {
        const htmlEntities = {
            '&lt;': '<',
            '&gt;': '>',
            '&amp;': '&',
            '&quot;': '"',
            '&#39;': "'"
        };
        return str.replace(/&[^;]+;/g, (entity) => htmlEntities[entity] || entity);
    };

    // YouTube 비디오 ID 추출 함수
    const extractYoutubeVideoId = (content) => {
        if (!content) return null;
        const unescapedContent = unescapeHTML(content);
        const videoIdMatch = unescapedContent.match(/embed\/([\w-]+)/);
        return videoIdMatch ? videoIdMatch[1].split('?')[0] : null;
    };

    const videoId = extractYoutubeVideoId(content);

    if (!videoId) {
        return null;
    }

    // console.log(videoId)


    return (
        <YouTube
            videoId={videoId}
            opts={{
                width: "100%",
                height: "200px",
                playerVars: {
                    autoplay: 0, //자동 재생 여부 
                    modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 여부
                    // loop: 1, //반복 재생
                    // playlist: {videoId}, //반복 재생으로 재생할 플레이 리스트
                },
            }}
            onReady={(e) => {
                e.target.mute(); //소리 끔
            }}
        />
    );
};

export default YouTubePlayer;
