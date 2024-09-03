import Link from "next/link";
import { getPosts } from "./utils";
import Image from "next/image";

export default async function Page() {
    const posts = await getPosts();

    function renderDate(date: string): string {
        const day = date.split(" ")[0];
        const monh = date.split(" ")[1];
        const year = date.split(", ")[1];

        return `${day} ${monh.replace(",", "")} ${year}`
    }

    return (
        <div>
            <Image src="/typing-on-ipad.png" width="550" height="500" alt="Me on iPad" />
            <div>
                {posts
                    .sort((a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((post) => (
                        <article key={post.slug}>
                            <Link href={`/blog/${post.slug}`}>
                                <h1>{post.title}</h1>
                                <p>{renderDate(post.date)}</p>
                                <p>{post.description}</p>
                            </Link>
                        </article>
                    ))}
            </div>
        </div>
    );
}
