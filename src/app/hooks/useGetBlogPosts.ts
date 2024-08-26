import { readdirSync } from "fs";
import { useEffect, useState } from "react";

export default function useGetBlogPosts(): Array<string> | null {
    const [posts, setPosts] = useState<Array<string> | null>(null);

    useEffect(() => {
        const files = readdirSync("../blog/");
        if (files !== null) {
            setPosts(files);
        }
    }, []);


    return posts;
}
