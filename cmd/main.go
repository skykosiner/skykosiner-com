package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"regexp"
	"strings"

	"github.com/russross/blackfriday"
)

type Page struct {
	Title string
	Body []byte
}
var validPath = regexp.MustCompile("^/(blog)/([a-zA-Z0-9]+)$")

var templates = template.Must(template.ParseFiles("./pages/blog.html"))

func loadPage(title string) (*Page, error) {
	filename := "./blog/publish/" + title + ".md"
	fmt.Println(filename)
	body, err := os.ReadFile(filename)

	if err != nil {
		return nil, err
	}

	return &Page{Title: title, Body: body}, nil
}


func makeHandler(fn func(http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		m := validPath.FindStringSubmatch(r.URL.Path)

		if m == nil {
			http.NotFound(w, r)
			return
		}

		fn(w, r, m[2])
	}
}

func viewHandler(w http.ResponseWriter, r *http.Request, title string) {
	p, err := loadPage(title)

	if err != nil {
		http.NotFoundHandler()
	}

	p.Body = []byte(blackfriday.MarkdownBasic(p.Body))

	renderTemplate(w, "blog", p)
}

func renderTemplate(w http.ResponseWriter, tmpl string, p *Page) {
	err := templates.ExecuteTemplate(w, tmpl+".html", p)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
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

func main() {
	fs := http.FileServer(http.Dir("./pages/"))
	http.Handle("/", fs)
	http.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("public"))))
	http.HandleFunc("/blog/", makeHandler(viewHandler))
	http.HandleFunc("/getPosts/", ListBlogPosts)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
