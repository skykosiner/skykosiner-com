"use client";

import styles from "./contact.module.css";

type ContactButton = {
    name: string,
    url: string,
}

const contactButtons: Array<ContactButton> = [
    {
        name: "Instagram dms",
        url: "https://instagram.com/kosiner.codes",
    },
    {
        name: "Email",
        url: "mailto:sky@skykosiner.com",
    }
]

export default function Contact(): JSX.Element {
    function discord() {
        alert("Add: sky42069");
    }

    return (
        <div className={styles.contact}>
            <div>
                <h1>Contact Me</h1>
                <p>If you&apos;d like to get it in touch check out some of these links below.</p>

                <div className={styles.contactButtons}>
                    {contactButtons.map(item => (
                        <a href={item.url} target=" _blank" key={item.name}>{item.name}</a>
                    ))}
                    <a onClick={discord}>Discord</a>
                </div>
            </div>
        </div>
    );
}
