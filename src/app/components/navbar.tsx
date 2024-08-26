import Link from "next/link";
import styles from "./navbar.module.css";

export default function NavBar(): JSX.Element {
    return (
        <div className={styles.nav}>
            <div className={styles.image}>
            </div>
            <div className={styles.links}>
                <Link href={`/about`}>About</Link>
                <Link href={`/contact`}>Contact</Link>
                <Link href={`/links`}>Links</Link>
                <Link href={`/blog`}>Blog</Link>
            </div>
        </div>
    )
}
