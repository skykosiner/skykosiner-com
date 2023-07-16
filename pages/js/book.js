// Loop over each post and make an li tag with a link to the page of the post
function HandleBooks(posts) {
    const booksArr = posts.split(" ")
    let bookHTML = ""
    booksArr.map((post) => {
        // Because Mac's like to create this weird ass .DS_Store file and sometimes
        // I publish stuff from my MacBook not arch linux (btw)
        if (post === "" || post === "DS_Store" || post.includes(".org")) {
            return
        }

        // Split the title of the post by new capital letters such as
        // HelloWorld would become Hello world
        const bookTitleArr = post.split(/(?=[A-Z])/)
        let bookTitle = ""

        bookTitleArr.map((word) => {
            bookTitle += " " + word
        })

        bookHTML += `<li><a href="/book/${post}">${bookTitle}</a></li/>`
    })

    return bookHTML
}

// Fetch the blog posts and put them into the div with the id posts
fetch("/getBooks/")
    .then(resp => resp.text())
    .then(data => {
        const books = document.getElementById("books")
        const body = HandleBooks(data)

        books.innerHTML = body
    })
