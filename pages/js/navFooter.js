window.onload = function() {
    fetch("/html/nav.html")
        .then(res => res.text())
        .then(text => {
            const oldelem = document.querySelector("script#replace_with_navbar");
            const newelem = document.createElement("div");
            newelem.innerHTML = text;
            oldelem.parentNode.replaceChild(newelem, oldelem);
        })

    fetch("/html/footer.html")
        .then(res => res.text())
        .then(text => {
            let oldelem = document.querySelector("script#replace_with_footer");
            let newelem = document.createElement("div");
            newelem.innerHTML = text;
            oldelem.parentNode.replaceChild(newelem,oldelem);
        })
};
