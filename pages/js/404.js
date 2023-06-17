// Loop over each post and make an li tag with a link to the page of the post
/**
 * @param {array} posts
 * @returns {string} the html of the posts
 */
async function HandleBlogPosts(posts) {
  const postsArr = posts.split(" ")
  let postHTML = ""
  let count = 0;
  postsArr.map(async (post) => {
    // Make sure not to get more then 8 posts on the 404
    if (count >= 8) {
      return
    }

    // Because Mac's like to create this weird ass .DS_Store file and sometimes
    // I publish stuff from my MacBook not arch linux (btw)
    if (post === "" || post === "DS_Store" || post.includes(".org")) {
      return
    }

    const blurb = fetch(`/getBlurb?blog=${post}`)
          .then(resp => resp.text())
          .then(data => {
            return data
          })

    // Split the title of the post by new capital letters such as
    // HelloWorld would become Hello world
    const postTitleArr = post.split(/(?=[A-Z])/)
    let postTitle = ""

    postTitleArr.map((word) => {
      postTitle += " " + word
    })

    postHTML += `<div><a href="/blog/${post}">${postTitle}</a><p>${await blurb}<p/></div>`
    count++
  })

  return await postHTML
}

// Fetch the blog posts and put them into the div with the id posts
fetch("/getPosts/")
  .then(resp => resp.text())
  .then(async (data) => {
    const posts = document.getElementById("posts")
    const body = HandleBlogPosts(data)
    console.log("body", await body)

    posts.innerHTML = body
  })
