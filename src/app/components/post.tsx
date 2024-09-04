import { MDXRemote } from "next-mdx-remote/rsc";

export function Post({ children }: { children: string }) {
    return (
        <MDXRemote
            source={children}
            options={{
                mdxOptions: {},
            }}
        />
    );
}
