function HandleBlogPosts(posts) {
  const postsArr = posts.split(" ")
  let postHTML = ""

  postsArr.map((post) => {
    if (post === "") {
      return
    }

    postHTML += `<li><a href="/blog/${post}">${post}</a></div/>`
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
