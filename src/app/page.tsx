import Link from "next/link";

export default function Home(): JSX.Element {
    return (
        <div>
            <div>
                <h1>Hey Guys, I'm Sky.</h1>
                <h2>I'm a self taught <a href="https://github.com/skykosiner" target=" _blank">developer</a> and <Link href="/">content creator</Link>.</h2>
                <p>On this website you can learn more <Link href="/about">about me</Link>, find out what I'm working on, and <Link href="/contact">contact me.</Link></p>
            </div>

            <div>
            </div>
        </div>
    );
}
