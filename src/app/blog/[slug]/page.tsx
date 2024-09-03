import { notFound } from "next/navigation";
import { getPost, getPosts } from "../utils";
import { Post } from "@/app/components/post";
import styles from "./post.module.css";

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function Page({ params }: {
    params: { slug: string }
}) {

    const post = await getPost(params.slug);
    if (!post) return notFound();

    return (
        <div className="center">
            <div className={styles.post}>
                <h1>{post.title}</h1>
                <Post>{post.body}</Post>
            </div>
        </div>
    );
}
