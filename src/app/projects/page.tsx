"use client";

import Link from "next/link";
import styles from "./projects.module.css";
import { useState } from "react";

type Project = {
    name: string,
    url: string,
    body: string
}

const projects: Array<Project> = [
    {
        name: "Control Aircon",
        url: "https://github.com/skykosiner/dakin-aircon-golang",
        body: "I have an air-con in my room that has an API that can be used to control it. I wanted to be able to control it from my terminal and window manager. So I found the API endpoint, figured out how it works, and wrote a tool to control the API from the comfort of my terminal. I also wrote some helpful bash scripts to activate with my window manager."
    },
    {
        name: "statusline.nvim",
        url: "https://github.com/skykosiner/statusline.nvim",
        body: "One of my favorite things to do is to spend time making Neovim more my own by customizing everything I can. I wanted to create a more useful status line that showed more relevant info. So I took it into my own hands to create a status line that had everything I wanted and looked the way I wanted using Lua."
    },
    {
        name: "todoist.nvim",
        url: "https://github.com/skykosiner/todoist.nvim",
        body: "I use todoist to manage my life and to do list, but all the plugins I could find to interact with todoist from inside neovim didn't work or were just very laggy. I decided to make this plugin so that I could do almost everything I need to do from todoist without ever having to leave vim.",
    }
]

export default function Projects(): JSX.Element {
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
        "Control Aircon": false,
        "statusline.nvim": false
    });


    function setReadingBody(name: string) {
        setExpanded(prevState => ({
            ...prevState,
            [name]: !prevState[name]
        }));
    }

    return (
        <div className={styles.projects}>
            <h1 style={{ paddingBottom: "0.3rem" }} className={styles.title}>Projects</h1>
            {projects.map(project => (
                <div key={project.name} className={styles.project}>
                    <Link href={`${project.url}`} target=" _blank"><h3>{project.name}</h3></Link>
                    {expanded[project.name] && <p>{project.body}</p>}
                    <button onClick={() => setReadingBody(project.name)}>
                        {expanded[project.name] ? "Read Less" : "Read More"}
                    </button>
                </div>
            ))}
        </div>
    );
}
