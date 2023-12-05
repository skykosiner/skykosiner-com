function hide(text) {
    if (text.style.display === "block") {
        return true
    }

    return false
}

function showMore(item) {
    const map = new Map()
    map.set("aircon", document.getElementById("airconText"));
    map.set("swift", document.getElementById("swiftText"));
    map.set("personal-website", document.getElementById("personalWebsiteText"));
    map.set("statusLine", document.getElementById("statusLineText"));

    item = map.get(item);

    if (hide(item)) {
        item.style.display = "none";
    } else {
        item.style.display = "block";
    }
}
