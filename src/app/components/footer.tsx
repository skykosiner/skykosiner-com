import Image from "next/image";
import styles from "./footer.module.css";

// TODO: Figure out how to make sure footer is always at the bottom and never overlaps

export default function Footer(): JSX.Element {
    return (
        <div className={styles.footer}>
            <p>Sky Kosiner ©{new Date().getFullYear()}</p>

            <div className={styles.links}>
                <a href="https://youtube.com/@skykosiner" target=" _blank"><Image src="/youtube.svg" width="15" height="15" alt="YouTube Logo" /></a>
                <a href="https://Instagram.com/kosiner.codes" target=" _blank"><Image src="/instagram.svg" width="15" height="15" alt="Instagram Logo" /></a>
                <a href="https://x.com/KosinerSky" target=" _blank"><Image src="/twitter.svg" width="15" height="15" alt="Twitter Logo" /></a>
                <a href="https://github.com/skykosiner" target=" _blank"><Image src="/github.svg" width="15" height="15" alt="Github Logo" /></a>
            </div>
        </div>
    );
}
