"use client";

import { useEffect, useState } from "react";

export default function DarkMode(): JSX.Element {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const darkModePreference = localStorage.getItem("dark-mode");
        if (darkModePreference !== null) {
            setIsDarkMode(darkModePreference === "true");
        } else {
            setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
        }
    }, [isDarkMode]);

    function handleDarkMode() {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        localStorage.setItem("dark-mode", newDarkMode.toString());
    }

    return (
        <button className="darkModeToggle" onClick={handleDarkMode}>{!isDarkMode ? "☀️" : "🌙"}</button>
    );
}
