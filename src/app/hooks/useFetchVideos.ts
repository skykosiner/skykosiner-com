import { useEffect, useState } from "react";
import { VideoData } from "../api/fetch-videos/route";
import axios from "axios";

export default function useFetchVideos(): VideoData | null {
    const [video, setVideo] = useState<VideoData | null>(null);


    useEffect(() => {
        async function fetchData() {
            const resp = await axios.get("/api/fetch-videos");

            if (resp.status === 200) {
                setVideo(await resp.data);
            }
        }

        fetchData();
    }, []);

    return video;
}
