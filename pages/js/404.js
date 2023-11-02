// Loop over each post and make an li tag with a link to the page of the post
/**
 * @param {array} posts
 * @returns {string} the html of the posts
 */
function HandleBlogPosts(posts) {
    const postArr = posts.split("{");
    let postHTML = ""
    postArr.map((post) => {
        if (post === "[") {
            return
        }

        const title = post.split(" ")[0]
        const body = post.split(" ").splice(1);


        const postTitleArr = title.split(/(?=[A-Z])/)
        let postTitle = ""

        postTitleArr.map((word) => {
            postTitle += " " + word
        })

        let bodyStr = ""

        body.map((word) => {
            if (word.includes("}") || word.includes("}]")) {
                word = word.replace("}", "");
                word = word.replace("]", "");
            }

            bodyStr += " " + word
        })

        postHTML += `<div><a href="/blog/${title}">${postTitle}</a><p>${bodyStr}</p></div>`
    })

    return postHTML
}

// Fetch the blog posts and put them into the div with the id posts
fetch("/Get404BlogPostsRecs/")
    .then(resp => resp.text())
    .then((data) => {
        const posts = document.getElementById("posts")
        const body = HandleBlogPosts(data)

        posts.innerHTML = body
    })
