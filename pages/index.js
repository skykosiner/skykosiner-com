// Loop over each post and make an li tag with a link to the page of the post
function HandleBlogPosts(posts) {
  const postsArr = posts.split(" ")
  let postHTML = ""
  postsArr.map((post) => {
    if (post === "") {
      return
    }

    // Split the title of the post by new capital letters such as
    // HelloWorld would become Hello world
    const postTitleArr = post.split(/(?=[A-Z])/)
    let postTitle = ""

    postTitleArr.map((word) => {
      postTitle += " " + word
    })

    console.log(postTitleArr)

    postHTML += `<li><a href="/blog/${post}">${postTitle}</a></li/>`
  })

  return postHTML
}

// Fetch the blog posts and put them into the div with the id posts
fetch("/getPosts/")
  .then(resp => resp.text())
  .then(data => {
    const posts = document.getElementById("posts")
    const body = HandleBlogPosts(data)
    posts.innerHTML = body
  })
