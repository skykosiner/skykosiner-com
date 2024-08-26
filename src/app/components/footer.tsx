import styles from "./footer.module.css";

export default function Footer(): JSX.Element {
    return (
        <div className={styles.footer}>
            <p>Sky Kosiner ©{new Date().getFullYear()}</p>

            <div className={styles.links}>
                <a href="https://Instagram.com/kosiner.codes" target=" _blank">Instagram</a>
                <a href="https://x.com/KosinerSky" target=" _blank">Twitter</a>
                <a href="https://github.com/skykosiner" target=" _blank">Github</a>
            </div>
        </div>
    );
}
