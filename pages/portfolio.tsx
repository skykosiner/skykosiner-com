import Head from "next/head";
import style from "../styles/portfolio.module.scss";
import portfolioCards from "../data/latest_projects";
import PortfolioCard, { portfolioCardProps } from "../components/PortfolioCard";
import React from "react";
import Github from "../hooks/useGithub";
import { Repositories } from "../types";

export default function Portfolio() {
    const github = Github();

    const [showGithub, setShowGithub] = React.useState<boolean>(false);

    function handleClick(): void {
        setShowGithub(!showGithub);
    };

    return (
        <div style={{ minHeight: "50vw" }}>
            <Head>
                <title>Sky Kosiner | Portfolio Page</title>
                <meta name="Portfolio page" content="Portfolio page Sky Kosiner" />
            </Head>
            {/*Main projects*/}
            <div className={style.projects}>
                {portfolioCards.map((card: portfolioCardProps) => (
                    <PortfolioCard title={card.title} body={card.body} link={card.link} key={card.title} />
                ))}
            </div>
            {/*Github repos*/}
            <div className={style.center}>

                <div className={style.seeMore}>
                    {!showGithub && (
                        <p className={style.seeMoreP}>See more from my github repos?</p>
                    )}
                    <button onClick={handleClick}>{!showGithub ? <div>See more</div> : <div>Hide</div>}</button>
                </div>

                {!github.length && <p>Loading</p>}
                {showGithub && (
                    <div className={style.github}>
                        {github.map((repo: Repositories) => (
                            <div key={repo.name}>
                                <h2>{repo.name}</h2>
                                {repo.description ? <p>{repo.description}</p> : <p>No description</p>}
                                <a href={repo.html_url} target="_blank" rel="noreferrer">View code</a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
};
