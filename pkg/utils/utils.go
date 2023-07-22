package utils

import (
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"os/exec"
	"regexp"
	"strings"

	"github.com/russross/blackfriday"
)

func SendMail(body []byte) error {
	auth := smtp.PlainAuth("", "ykosiner@gmail.com", os.Getenv("GMAIL_PASSWORD"), "smtp.gmail.com")
	to := []string{"ykosiner@gmail.com"}
	err := smtp.SendMail("smtp.gmail.com:587", auth, "ykosiner@gmail.com", to, body)

	return err
}

func SearchBlog(query string) string {
	cmd := exec.Command("find", "./blog/publish", "-name", "*"+query+"*.md")
	out, err := cmd.Output()

	if err != nil {
		fmt.Println(err)
		return "Sorry there was an error"
	}

	out = []byte(strings.Replace(string(out), "./blog/publish", "", -1))
	out = []byte(strings.Replace(string(out), ".md", "", -1))

	//Split each item by newline
	var items []string
	for _, item := range strings.Split(string(out), "\n") {
		if item != "" {
			items = append(items, item)
		}
	}

	//Render each item to have a link
	var links []string
	for _, item := range items {
		var name string
		nameArr := regexp.MustCompile(`[A-Z][^A-Z]*`)

		for _, part := range nameArr.FindAllString(item, -1) {
			name += fmt.Sprintf(" %s", part)
		}

		links = append(links, fmt.Sprintf("[%s](/blog/%s)", name, item))
	}

	//Convert markdown to html
	var html []byte

	for _, item := range links {
		html = append(html, []byte(item)...)
		html = append(html, []byte("<br>")...)
	}

	if string(html) == "" {
		html = []byte(fmt.Sprintf("### Sorry there is no blog matching %s :(", query))
	}

	return string(blackfriday.MarkdownCommon(html))
}

// Custom 404 page
func NotFound(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/html/404.html", http.StatusSeeOther)
}


func ListBookNotes(w http.ResponseWriter, r *http.Request) {
	var bookArr []string
	var strReturn string
	books, err := os.ReadDir("./books")

	if err != nil {
		log.Fatal("Error getting books")
	}

	for _, book := range books {
		bookArr = append(bookArr, book.Name())
	}

	for _, book := range bookArr {
		book = strings.Trim(book, ".md")
		strReturn = fmt.Sprintf("%s %s",strReturn, book)
	}

	fmt.Fprintf(w, "%s", strReturn)
}

func ListBlogPosts(w http.ResponseWriter, r *http.Request) {
	var postArr []string
	var strReturn string
	posts, err := os.ReadDir("./blog/publish")

	if err != nil {
		log.Fatal("Error getting blog posts")
	}

	for _, post := range posts {
		postArr = append(postArr, post.Name())
	}

	for _, post := range postArr {
		post = strings.Trim(post, ".md")
		strReturn = fmt.Sprintf("%s %s",strReturn, post)
	}

	fmt.Fprintf(w, "%s", strReturn)
}

func ListBlogPostsWithDate(w http.ResponseWriter, r *http.Request) {
	var postArr []string
	var strReturn string
	posts, err := os.ReadDir("./blog/publish")

	if err != nil {
		log.Fatal("Error getting blog posts")
	}

	for _, post := range posts {
		file, err := os.Stat(fmt.Sprintf("./blog/publish/%s", post.Name()))

		if err != nil {
			log.Fatal("Error getting file info")
		}

		y,m,d := file.ModTime().Date()

		fmt.Println(y, m, d)

		postArr = append(postArr, fmt.Sprintf("%s - %d %d %d", post.Name(), y, m, d))
	}

	for _, post := range postArr {
		post = strings.Trim(post, ".md")
		strReturn = fmt.Sprintf("%s %s",strReturn, post)
	}

	fmt.Fprintf(w, "%s", strReturn)
}
