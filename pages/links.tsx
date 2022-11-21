import style from "../styles/links.module.scss";
import { link, links } from "../links";

export default function Links() {
    return (
        <div>
            {links.map((link: link) => (
                <div>
                    <a href={link.url} target=" _blank"><h2>{link.name}</h2></a>
                </div>
            ))}
        </div>
    );
};
