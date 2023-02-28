function HandleBlogPosts(posts) {
  const postsArr = posts.split(" ")
  let postHTML = ""

  postsArr.map((post) => {
    if (post === "") {
      return
    }

    const postTitleArr = post.split(/(?=[A-Z])/)
    let postTitle = ""

    postTitleArr.map((word) => {
      postTitle += " " + word
    })

    postHTML += `<li><a href="/blog/${post}">${postTitle}</a></div/>`
  })

  return postHTML
}

fetch("/getPosts/")
  .then(resp => resp.text())
  .then(data => {
    const posts = document.getElementById("posts")
    const body = HandleBlogPosts(data)
    posts.innerHTML = body
  })
