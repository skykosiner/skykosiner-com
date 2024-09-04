"use client";

export function ScrollIntoView(): JSX.Element {
    function viewPosts() {
        const posts = document.getElementById("posts");
        posts?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <button onClick={viewPosts}>View Posts</button>
    );
}

export function ContactMe(): JSX.Element {
    function contact() {
        window.open("mailto:sky@skykosiner.com");
    }

    return (
        <button onClick={contact}>Contact Me</button>
    );
}
