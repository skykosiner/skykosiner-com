package utils

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"os/exec"
	"regexp"
	"strings"

	"github.com/russross/blackfriday"
)

type BlogPost404 struct {
	title string
	blurb string
}

func SendMail(body []byte) error {
	auth := smtp.PlainAuth("", "ykosiner@gmail.com", os.Getenv("GMAIL_PASSWORD"), "smtp.gmail.com")
	to := []string{"sky@skykosiner.com"}
	err := smtp.SendMail("smtp.gmail.com:587", auth, "ykosiner@gmail.com", to, body)

	return err
}

func SearchBlog(query string) string {
	cmd := exec.Command("find", "./blog/publish", "-iname", "*"+query+"*.md")
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
	http.Redirect(w, r, "/404.html", http.StatusSeeOther)
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
		strReturn = fmt.Sprintf("%s %s", strReturn, book)
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
		strReturn = fmt.Sprintf("%s %s", strReturn, post)
	}

	fmt.Fprintf(w, "%s", strReturn)
}

func Get404BlogPostsRecs(w http.ResponseWriter, r *http.Request) {
	var postsArr []BlogPost404
	posts, err := os.ReadDir("./blog/publish")

	if err != nil {
		log.Fatal("Error getting blurbs for post ", err)
	}

	for _, post := range posts {
		var blurbArr []string
		var blurb string
		title := post.Name()
		file, err := os.Open(fmt.Sprintf("./blog/publish/%s", title))

		if err != nil {
			log.Fatal("Error getting blurbs for post", err)
		}

		defer file.Close()

		bytes, err := ioutil.ReadAll(file)

		if err != nil {
			log.Fatal("Error getting blurbs for post", err)
		}

		lines := strings.Split(string(bytes), "\n")

		for idx, line := range lines {
			if idx == 0 || idx == 1 {
				continue
			}

			if len(blurbArr) > 4 {
				break
			}

			blurbArr = append(blurbArr, line)
			blurb += line
		}

		postsArr = append(postsArr, BlogPost404{strings.Split(title, ".md")[0], string(blackfriday.MarkdownBasic([]byte(blurb)))})
	}

	fmt.Fprintf(w, "%s", postsArr)
}

func Contact(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Redirect(w, r, "/contact", http.StatusSeeOther)
	}

	if strings.Contains(r.FormValue("name"), "Mike") {
		http.Redirect(w, r, "/spam", http.StatusSeeOther)
		return
	}

	if r.FormValue("name") == "" || r.FormValue("email") == "" || r.FormValue("message") == "" {
		http.Redirect(w, r, "/contact", http.StatusSeeOther)
		return
	}

	msg := fmt.Sprintf(`To: "Sky Kosiner" <sky@skykosiner.com>
From: "Sky Kosiner" <ykosiner@gmail.com>
Subject: Contact Form skykosiner.com | %s`, r.FormValue("name"))
	body := []byte(fmt.Sprintf("%s\nName %s\nEmail %s\nMessage\n%s", msg, r.FormValue("name"), r.FormValue("email"), r.FormValue("message")))

	err := SendMail(body)

	if err != nil {
		fmt.Fprintf(w, "Error sending email %s", err)
	} else {
		http.Redirect(w, r, "/contact", http.StatusOK)
	}
}
