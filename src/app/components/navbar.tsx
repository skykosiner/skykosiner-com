"use client";

import Link from "next/link";
import styles from "./navbar.module.css";
import Image from "next/image";
import useWindowSize from "../hooks/useWindowSize";
import { MdClose, MdOutlineMenu } from "react-icons/md";
import { useState } from "react";

export default function NavBar(): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
    const windowSize = useWindowSize();

    if (!windowSize.width) {
        return <p>Loading...</p>
    }

    function handleClick() {
        if (!windowSize.width) {
            return;
        }

        if (windowSize.width < 900) {
            setOpen(!open);
        }
    }

    return (
        <div className={styles.nav}>
            <div className={styles.image}>
                <Link href="/" onClick={handleClick}>
                    <Image src="/logo.svg" width="80" height="80" alt="logo" />
                </Link>
            </div>

            {windowSize.width > 900 ? (
                <div className={styles.links}>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                    <Link href="/projects">Projects</Link>
                    <Link href="/tools">Tools</Link>
                    <Link href="/links">Links</Link>
                    <Link href="/blog">Blog</Link>
                </div>
            ) : (
                <div>
                    {!open ? <MdOutlineMenu size="30px" color="black" onClick={handleClick} className={styles.hamburger} /> : <MdClose size="30px" color="black" onClick={handleClick} className={styles.hamburger} />}
                </div>
            )}

            {open && (
                <div className={styles.mobileLinks}>
                    <Link href="/about" onClick={handleClick}>About</Link>
                    <Link href="/contact" onClick={handleClick}>Contact</Link>
                    <Link href="/projects" onClick={handleClick}>Projects</Link>
                    <Link href="/tools" onClick={handleClick}>Tools</Link>
                    <Link href="/links" onClick={handleClick}>Links</Link>
                    <Link href="/blog" onClick={handleClick}>Blog</Link>
                </div>
            )}
        </div>
    );
}
