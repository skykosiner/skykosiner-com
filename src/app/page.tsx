import Link from "next/link";
import styles from "./home.module.css";
import { getPosts } from "./blog/utils";
import { ContactMe, ScrollIntoView } from "./buttons";

export default async function Home(): Promise<JSX.Element> {
    const posts = await getPosts();

    return (
        <div className="center" style={{ flexDirection: "column" }}>
            <div className={styles.hero}>
                <h1>Hey Guys, I&apos;m Sky.</h1>
                <h2>I&apos;m a self taught <a href="https://github.com/skykosiner" target=" _blank">developer</a> and <Link href="/">content creator</Link>.</h2>
                <p>On this website you can learn more <Link href="/about">about me</Link>, find out what I&apos;m working on, and <Link href="/contact">contact me.</Link></p>

                <ScrollIntoView />
                <ContactMe />
            </div>

            <div className={styles.posts} id="posts">
                <h2>Posts:</h2>
                {posts.map(post => (
                    <Link href={`/blog/${post.slug}`} key={post.slug}>
                        <h3>{post.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
}
