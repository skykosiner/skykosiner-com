import Link from "next/link";
import { getPosts } from "./utils";
import Image from "next/image";
import styles from "./blog.module.css";
import { renderDate } from "../utils";

export default async function Page() {
    const posts = await getPosts();


    return (
        <div className={styles.wrap}>
            <div className={styles.mobile}>
                <h1>Blog</h1>
                <h2>I like to write about Tech, Productivity, Books, and Coding</h2>

                <div className={styles.image}>
                    <Image src="/typing-on-ipad.png" width="550" height="400" alt="Me on iPad" />
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
