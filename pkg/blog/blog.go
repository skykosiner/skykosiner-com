package blog

import (
	"html/template"
	"regexp"
	"net/http"
	"os"
	"github.com/skykosiner-com/pkg/utils"

	"github.com/russross/blackfriday"
)

type BlogPage struct {
	Title string
	Body []byte
}

var validPath = regexp.MustCompile("^/(blog)/([a-zA-Z0-9]+)$")
var templates = template.Must(template.ParseFiles("./pages/html/blog.html", "./pages/html/search.html"))

func loadPage(title string) (*BlogPage, error) {
	filename := "./blog/publish/" + title + ".md"
	body, err := os.ReadFile(filename)

	if err != nil {
		return nil, err
	}

	return &BlogPage{Title: title, Body: body}, nil
}


func MakeHandler(fn func(http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		m := validPath.FindStringSubmatch(r.URL.Path)

		if m == nil {
			http.NotFound(w, r)
			return
		}

		fn(w, r, m[2])
	}
}

func ViewHandler(w http.ResponseWriter, r *http.Request, title string) {
	p, err := loadPage(title)

	if p == nil {
		utils.NotFound(w, r)
	}

	if err != nil {
		return
	}

	p.Body = []byte(blackfriday.MarkdownBasic(p.Body))

	renderTemplate(w, "blog", p)
}

func renderTemplate(w http.ResponseWriter, tmpl string, p *BlogPage) {
	err := templates.ExecuteTemplate(w, tmpl+".html", p)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func SearchHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Query().Get("query") == "" {
		http.Redirect(w, r, "/", http.StatusSeeOther)
	}

	query := r.URL.Query().Get("query")
	search := utils.SearchBlog(query)

	page := &BlogPage{
		Title: "Sky Kosiner | Search",
		Body: []byte(search),
	}

	renderTemplate(w, "search", page)
}
