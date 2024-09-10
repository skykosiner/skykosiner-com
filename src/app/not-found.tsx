import Link from 'next/link'
import { getPosts } from './blog/utils';
import { renderDate } from './utils';
import styles from "./404.module.css";

export default async function NotFound(): Promise<JSX.Element> {
    // TODO: In the future update this so that it will only include the 5 or 3 most recent posts
    const posts = await getPosts();

    return (
        <div className={styles.notFound}>
            <h1>404 Page Not Found</h1>
            <Link href="/" style={{ paddingTop: "0.5rem" }}>Go Home?</Link>

            <div className={styles.posts}>
                <h2>Recent Posts:</h2>

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
    );
}
