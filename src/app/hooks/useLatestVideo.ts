import { useState, useEffect } from "react";
import axios from "axios";

interface VideoData {
    videoId: string;
    videoTitle: string;
    videoUrl: string;
}

interface UseLatestVideoProps {
    apiKey: string,
    channelId: string;
}

function useLatestVideo({ apiKey, channelId }: UseLatestVideoProps) {
    const [latestVideo, setLatestVideo] = useState<VideoData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchLatestVideo() {
            try {
                const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
                    params: {
                        part: "snippet",
                        channelId: channelId,
                        maxResults: 1,
                        order: "date",
                        type: "video",
                        // key: "AIzaSyA9xszPA2nlfLmK9nSSaYkG_gQ94SBkjtE"
                        key: apiKey
                    },
                });

                if (response.data.items && response.data.items.length > 0) {
                    const video = response.data.items[0];
                    const videoData: VideoData = {
                        videoId: video.id.videoId,
                        videoTitle: video.snippet.title,
                        videoUrl: `https://www.youtube.com/watch?v=${video.id.videoId}`,
                    };
                    setLatestVideo(videoData);
                } else {
                    setError("No videos found.");
                }
            } catch (err) {
                setError("Failed to fetch the latest video.");
            } finally {
                setLoading(false);
            }
        };

        fetchLatestVideo();
    }, [channelId, process.env.YOUTUBE_API_KEY]);

    return { latestVideo, loading, error };
};

export default useLatestVideo;
