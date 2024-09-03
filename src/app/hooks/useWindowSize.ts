import { useState, useEffect } from "react"

interface window {
    width: undefined | number;
}

function useWindowSize(): window {
    const [windowSize, setWindowSize] = useState<window>({
        width: undefined,
    })

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
            })
        }

        window.addEventListener("resize", handleResize)
        handleResize()
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return windowSize
}

export default useWindowSize
