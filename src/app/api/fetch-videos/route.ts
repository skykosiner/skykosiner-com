import { NextResponse } from "next/server";
import { parseStringPromise } from 'xml2js';

export type VideoData = {
    videoTitle: string;
    videoUrl: string;
}

export async function GET(request: Request) {
    const url = "https://www.youtube.com/feeds/videos.xml?channel_id=UCceuqcaS7oAGBYMBEhTyDEQ";

    try {
        const response = await fetch(url);
        const text = await response.text();


        const result = await parseStringPromise(text);
        const latestEntry = result.feed.entry[0];

        if (latestEntry) {
            // Extract the title and URL of the latest video
            const title = latestEntry.title[0];
            const url = latestEntry.link[0].$.href;

            // Output the title and URL
            console.log(`Latest Video Title: ${title}`);
            console.log(`Latest Video URL: ${url}`);

            const data: VideoData = {
                videoTitle: title as string,
                videoUrl: url as string,
            }

            // You can also return these values or use them in your application as needed
            return NextResponse.json(
                { data },
                { status: 200 },
            )
        } else {
            return NextResponse.json(
                { message: "Nothing found." },
                { status: 404 },
            )
        }
    } catch (error) {
        console.error("Error fetching or parsing the RSS feed:", error);
        return NextResponse.json(
            { message: "Error fetching data." },
            { status: 500 },
        )
    }
}
