import style from "../styles/contact.module.scss";
import ContactOther from "../components/contact-ways"
import Head from 'next/head'

export default function Contact() {
    return (
        <div>
            <Head>
                <title>Sky Kosiner | Contact Page</title>
                console.logc
                <meta name="Contact page" content="Get in contact with Yoni Kosiner" />
            </Head>
            <h1 className={style.title}>Contact Me</h1>
            <div className={style.formWrapper}>
                <form
                    action="https://portfolie-backend.herokuapp.com/api/contact"
                    method="POST"
                >
                    <input className={style.main_input} type="text" name="name" placeholder="Name:" />
                    <br />
                    <input className={style.main_input} type="email" name="email" placeholder="Email:" />
                    <br />
                    <input className={style.main_input} type="text" name="subject" placeholder="Subject:" />
                    <br />
                    <input className={style.message} type="text" name="message" placeholder="Message:" />
                    <span className={style.submitCenter}>
                        <div className={style.submit}>
                            <button>Submit</button>
                        </div>
                        <br />
                    </span>
                </form>
            </div>
            <ContactOther />
        </div>
    );
};
