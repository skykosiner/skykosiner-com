import ToolMd from "./tools.mdx";
import styles from "./tools.module.css";

export default function Tools(): JSX.Element {
    return (
        <div className={styles.tools}>
            <div style={{ width: "80%", flexDirection: "column" }}>
                <ToolMd />
            </div>
        </div>
    );
}
