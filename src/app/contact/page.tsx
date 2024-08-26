export default function Contact(): JSX.Element {
    return (
        <div className="center" style={{ flexDirection: "column" }}>
            <h1>Contact Me</h1>
            <p style={{ paddingTop: "0.5rem" }}>If you'd like to get it in touch check out some of these links below.</p>
            <ul style={{ paddingTop: "0.5rem", marginRight: "16rem" }}>
                <li><a href="mailto:sky@skykosiner.com">Email - sky@skykosiner.com</a></li>
                <li><a href="https://instagram.com/kosiner.codes">Instagram</a></li>
                <li>Discord - sky42069</li>
            </ul>

        </div>
    );
}
