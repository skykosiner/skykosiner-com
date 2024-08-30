import Link from "next/link";
import styles from "./home.module.css";

export default function Home(): JSX.Element {
    return (
        <div className="center">
            <div className={styles.hero}>
                <h1>Hey Guys, I&aposm Sky.</h1>
                <h2>I&aposm a self taught <a href="https://github.com/skykosiner" target=" _blank">developer</a> and <Link href="/">content creator</Link>.</h2>
                <p>On this website you can learn more <Link href="/about">about me</Link>, find out what I&aposm working on, and <Link href="/contact">contact me.</Link></p>
            </div>

            <div>
            </div>
        </div>
    );
}
