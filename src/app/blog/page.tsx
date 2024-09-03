import { lstatSync, readdirSync } from "fs";
import path from "path";
import { RenderPosts } from "./render-posts";
import Image from "next/image";
import styles from "./blog.module.css";

export interface Post {
    slug: string,
    title: string,
    description: string,
    publishDate: string,
}

export async function getPosts(): Promise<Post[]> {
    const slugs = readdirSync("./src/app/blog")
        .filter(file => lstatSync(path.join("./src/app/blog", file)).isDirectory())

    // Retrieve metadata from MDX files
    const posts = await Promise.all(
        slugs.map(async (name) => {
            const { metadata } = await import(`../../../src/app/blog/${name}/page.mdx`);
            return { slug: name, ...metadata };
        })
    );

    // Sort posts from newest to oldest
    posts.sort((a, b) => +new Date(b.publishDate) - +new Date(a.publishDate));

    return posts;
}

export default async function Blog(): Promise<JSX.Element> {
    const posts = await getPosts();
    return (
        <div className="center" style={{ flexDirection: "column" }}>
            <h1>Blog</h1>
            <p>I like to write about Tech, Productivity, Books, and Coding</p>
            <Image src="/typing-on-ipad.png" width="600" height="550" alt="Typing on iPad" />
            <RenderPosts posts={posts} />
        </div>
    );
}
