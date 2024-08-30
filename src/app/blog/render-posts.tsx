import Link from "next/link";
import { Post } from "./page";

export function RenderPosts({ posts }: { posts: Array<Post> }): JSX.Element {
    return (
        <ol>
            {posts.map(({ slug, title, publishDate }) => (
                <li key={slug}>
                    <h2>
                        <Link href={`/blog/${slug}`}>{title}</Link>
                    </h2>
                    <p>
                        <strong>Published:</strong>{' '}
                        {new Date(publishDate).toLocaleDateString()}{' '}
                    </p>
                </li>
            ))}
        </ol>
    );
}
