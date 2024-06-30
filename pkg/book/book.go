package book

import (
	"fmt"
	"html/template"
	"net/http"
	"os"
	"regexp"

	"github.com/russross/blackfriday"
	"github.com/skykosiner-com/pkg/utils"
)

type BookPage struct {
	BookTitle string
	Body      []byte
	// LinkToBook string
	// Author string
}

var validPath = regexp.MustCompile("^/(book)/([a-zA-Z0-9]+)$")
var templates = template.Must(template.ParseFiles("./pages/book.html"))

func loadPage(title string) (*BookPage, error) {
	filename := "./books/" + title + ".md"
	body, err := os.ReadFile(filename)

	fmt.Println(filename)

	if err != nil {
		return nil, err
	}

	return &BookPage{BookTitle: title, Body: body}, nil
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

	renderTemplate(w, "book", p)
}

func renderTemplate(w http.ResponseWriter, tmpl string, p *BookPage) {
	err := templates.ExecuteTemplate(w, tmpl+".html", p)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
