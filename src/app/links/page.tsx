import Image from "next/image";
import Link from "next/link";
import styles from "./links.module.css";

type Link = {
    name: string,
    url: string,
}

const links: Array<Link> = [
    {
        name: "Latest YouTube video",
        // TODO: YouTube api to pull link for latest video
        url: ""
    },
    {
        name: "Personal Website",
        url: "/"
    },
    {
        name: "Instagram",
        url: "https://Instagram.com/kosiner.codes",
    },
    {
        name: "Twitter",
        url: "https://x.com/KosinerSky",
    },
    {
        name: "Github",
        url: "https://github.com/skykosiner"
    },
    {
        name: ".dotfiles",
        url: "https://github.com/skykosiner/.dotfiles"
    },
]

export default function Links(): JSX.Element {
    return (
        <div className="center" style={{ flexDirection: "column" }}>
            <Image src="/me-cropped.jpg" width="150" height="150" alt="Image of me" className={styles.me} />
            <div className={styles.links}>
                {links.map(link => (
                    <Link href={`${link.url}`} key={link.name} className={styles.link}>
                        {link.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
