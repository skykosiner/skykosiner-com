import Link from "next/link";
import styles from "./navbar.module.css";
import Image from "next/image";

export default function NavBar(): JSX.Element {
    return (
        <div className={styles.nav}>
            <div className={styles.image}>
                <Image src="/logo.svg" width="80" height="80" alt="logo" />
            </div>
            <div className={styles.links}>
                <Link href={`/about`}>About</Link>
                <Link href={`/contact`}>Contact</Link>
                <Link href={`/links`}>Links</Link>
                <Link href={`/blog`}>Blog</Link>
            </div>
        </div>
    );
}
