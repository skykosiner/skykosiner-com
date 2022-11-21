import { portfolioCardProps } from "../components/PortfolioCard";

const cards: portfolioCardProps[] = [
    {
        title: "Todo Me Daddy",
        body: "This is a neovim plugin I built to easily keep track of to do comments in your code using telescope. Writen in lua btw.",
        link: "https://github.com/skykosiner/todo-me-daddy"
    },
    {
        title: "Track Pumps a Day",
        body: "This is a little rest api written in go. Long story short I'm asthmatic, and I wanted a way to keep track of how many times a day I have taken my inhaler. So this little api allows me to track how many times a day I have taken my inhaler, between any device that can access the internet.",
        link: "https://github.com/skykosiner/track-pumps-a-day"
    },
    {
        title: "Personal Website",
        body: "This website it self is a next.js website bulit with typescript(how do people use regular js?).The way my blog pages work is by using a ghost backend stored on digitalocean.",
        link: "https://github.com/skykosiner/yonikosiner-com"
    },
];

export default cards;
