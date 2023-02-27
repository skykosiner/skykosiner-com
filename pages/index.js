function HandleBlogPosts(posts) {
  const postsArr = posts.split(" ")
  let postHTML = ""

  postsArr.map((post) => {
    if (post === "") {
      return
    }

    postHTML += `<div><a href="/blog/${post}">${post}</a></div/>`
  })

  return postHTML
}

console.log("Hello world")

const date = new Date().getFullYear()
const dateHTML = document.getElementById("year")
console.log(date, dateHTML)
dateHTML.innerHTML = date

fetch("/getPosts/")
  .then(resp => resp.text())
  .then(data => {
    const posts = document.getElementById("posts")
    const body = HandleBlogPosts(data)
    posts.innerHTML = body
  })
