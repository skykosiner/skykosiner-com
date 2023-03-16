package main

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path"
	"regexp"
	"strings"

	"github.com/russross/blackfriday"
	"github.com/skykosiner-com/pkg/utils"
)

type Page struct {
	Title string
	Body []byte
}

var validPath = regexp.MustCompile("^/(blog)/([a-zA-Z0-9]+)$")
var templates = template.Must(template.ParseFiles("./pages/blog.html", "./pages/search.html"))

func loadPage(title string) (*Page, error) {
	filename := "./blog/publish/" + title + ".md"
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

	if p == nil {
		NotFound(w, r)
	}

	if err != nil {
		return
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

func GetBlurb(w http.ResponseWriter, r *http.Request) {
	var blurbArr []string
	var blurb string

	if r.URL.Query().Get("blog") == "" {
		http.Redirect(w, r, "/", http.StatusInternalServerError)
	}

	query := r.URL.Query().Get("blog")
	file, err := os.Open(fmt.Sprintf("./blog/publish/%s.org", query))

	if err != nil {
		http.Redirect(w, r, "/", http.StatusInternalServerError)
		log.Println("Error getting blurb post", err)
	}

	defer file.Close()

	bytes, err := ioutil.ReadAll(file)

	if err != nil {
		http.Redirect(w, r, "/", http.StatusInternalServerError)
		log.Println("Error getting blurb post", err)
	}

	lines := strings.Split(string(bytes), "\n")

	for _, line := range lines {
		if len(blurbArr) > 4 {
			break
		}

		blurbArr = append(blurbArr, line)
		blurb += line
	}

	fmt.Println(blurb)

	fmt.Fprintln(w, blurb)
}

func Contact(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Redirect(w, r, "/contact.html", http.StatusSeeOther)
	}

	msg := fmt.Sprintf(`To: "Sky Kosiner" <ykosiner@gmail.com>
From: "Sky Kosiner" <ykosiner@gmail.com>
Subject: Contact Form skykosiner.com | %s`, r.FormValue("name"))
	body := []byte(fmt.Sprintf("%s\nName %s\nEmail %s\nMessage\n%s", msg, r.FormValue("name"), r.FormValue("email"), r.FormValue("message")))

	err := utils.SendMail(body)

	if err != nil {
		fmt.Fprintf(w, "Error sending email %s", err)
	} else {
		http.Redirect(w, r, "/contact.html", http.StatusOK)
	}
}

func SearchHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Query().Get("query") == "" {
		http.Redirect(w, r, "/", http.StatusSeeOther)
	}

	query := r.URL.Query().Get("query")
	search := utils.SearchBlog(query)

	page := &Page{
		Title: "Sky Kosiner | Search",
		Body: []byte(search),
	}

	renderTemplate(w, "search", page)
}

func NotFound(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/404.html", http.StatusSeeOther)
}

func FileServerWithCustom404(fs http.FileSystem) http.Handler {
	fsh := http.FileServer(fs)
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, err := fs.Open(path.Clean(r.URL.Path))
		if os.IsNotExist(err) {
			NotFound(w, r)
			return
		}
		fsh.ServeHTTP(w, r)
	})
}

func main() {
	port := ":" + os.Getenv("PORT")

	if port == ":" {
		port = ":8080"
	}

	fs := FileServerWithCustom404(http.Dir("./pages"))
	http.Handle("/", fs)
	http.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("public"))))
	http.HandleFunc("/blog/", makeHandler(viewHandler))
	http.HandleFunc("/getPosts/", ListBlogPosts)
	http.HandleFunc("/contact/", Contact)
	http.HandleFunc("/search", SearchHandler)
	http.HandleFunc("/getBlurb", GetBlurb)

	fmt.Println(fmt.Sprintf("Listening on port %s", port))
	log.Fatal(http.ListenAndServe(port, nil))
}
