import Link from "next/link";
import { getPosts } from "./utils";
import Image from "next/image";
import styles from "./blog.module.css";

export default async function Page() {
    const posts = await getPosts();

    function renderDate(date: string): string {
        const day = date.split(" ")[0];
        const monh = date.split(" ")[1];
        const year = date.split(", ")[1];

        return `${day} ${monh.replace(",", "")} ${year}`
    }

    return (
        <div className={styles.wrap}>
            <div>
                <h1>Blog</h1>
                <h2>I like to write about Tech, Productivity, Books, and Coding</h2>

                <div className={styles.image}>
                    <Image src="/typing-on-ipad.png" width="550" height="500" alt="Me on iPad" />
                </div>

                <div>
                    <h2>Posts:</h2>
                    {posts
                        .sort((a, b) =>
                            new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((post) => (
                            <div className={styles.post} key={post.slug}>
                                <Link href={`/blog/${post.slug}`}>
                                    <h3>{post.title}</h3>
                                    <p>{renderDate(post.date)}</p>
                                    <p>{post.description}</p>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
