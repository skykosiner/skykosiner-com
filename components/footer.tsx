import Image from "next/image";
import style from "../styles/footer.module.scss";
import instagram from "../public/social-icons/instagram.svg";
import twitter from "../public/social-icons/twitter.svg";
import youtube from "../public/social-icons/youtube.svg";

export default function Footer() {
    return (
        <div className={style.footer}>
            <div className={style.items}>
                {/*Made with stuff*/}
                <div className={style.social}>
                    {/*Instagram*/}
                    <a href="https://instagram.com/kosiner.codes" target=" _blank"><Image src={instagram} /></a>
                    {/*Twitter*/}
                    <a href="https://twitter.com/KosinerYoni" target=" _blank"><Image src={twitter} /></a>
                    {/*YouTube*/}
                    <a href="https://youtube.com/c/yonikosiner" target=" _blank"><Image src={youtube} /></a>
                </div>
                <p>Made with <a href="https://github.com/microsoft/TypeScript" target=" _blank">TypeScript</a>, <a href="https://nextjs.org/" target=" _blank">Next.JS</a>, and <a href="https://sass-lang.com/" target=" _blank">Scss</a></p>
            </div>
            {/*Coppy right with year*/}
            <p style={{ textAlign: "center", letterSpacing: "2px", fontWeight: "bolder" }} className={style.coppy}><a href="https://linktr.ee/yonikosiner" target=" _blank">Sky Kosiner</a> &copy;{new Date().getFullYear()}</p>
        </div>
    );
};
