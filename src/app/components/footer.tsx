import styles from "./footer.module.css";

// TODO: Figure out how to make sure footer is always at the bottom and never overlaps

export default function Footer(): JSX.Element {
    return (
        <div className={styles.footer}>
            <p>Sky Kosiner ©{new Date().getFullYear()}</p>

            <div className={styles.links}>
                <a href="https://youtube.com/@skykosiner" target=" _blank">YouTube</a>
                <a href="https://Instagram.com/kosiner.codes" target=" _blank">Instagram</a>
                <a href="https://x.com/KosinerSky" target=" _blank">Twitter</a>
                <a href="https://github.com/skykosiner" target=" _blank">Github</a>
            </div>
        </div>
    );
}
