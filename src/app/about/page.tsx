import AboutText from "../markdown/about.mdx";
import styles from "./about.module.css";

export default function About(): JSX.Element {
    return (
        <div className="center" style={{ flexDirection: "column" }}>
            <div style={{ width: "80%" }} className={styles.about}>
                <AboutText />
            </div>
        </div>
    );
}
