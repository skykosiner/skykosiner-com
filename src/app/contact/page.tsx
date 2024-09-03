import styles from "./contact.module.css";

export default function Contact(): JSX.Element {
    return (
        <div className={styles.contact}>
            <h1>Contact Me</h1>
            <p>If you'd like to get it in touch check out some of these links below.</p>
            <ul>
                <li><a href="mailto:sky@skykosiner.com">Email - sky@skykosiner.com</a></li>
                <li><a href="https://instagram.com/kosiner.codes">Instagram</a></li>
                <li>Discord - sky42069</li>
            </ul>

        </div>
    );
}
