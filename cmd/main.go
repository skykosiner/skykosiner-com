package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path"
	"strings"

	"github.com/skykosiner-com/pkg/blog"
	"github.com/skykosiner-com/pkg/book"
	"github.com/skykosiner-com/pkg/utils"
)

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

// File server with a custom 404 page instead defualt golang page of 404 not found
func FileServerWithCustom404(fs http.FileSystem) http.Handler {
	fsh := http.FileServer(fs)
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, err := fs.Open(path.Clean(r.URL.Path))
		if os.IsNotExist(err) {
			utils.NotFound(w, r)
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
	http.HandleFunc("/blog/", blog.MakeHandler(blog.ViewHandler))
	http.HandleFunc("/book/", book.MakeHandler(book.ViewHandler))
	http.HandleFunc("/getPosts/", utils.ListBlogPosts)
	http.HandleFunc("/getBooks/", utils.ListBookNotes)
	http.HandleFunc("/contact/", Contact)
	http.HandleFunc("/search", blog.SearchHandler)
	http.HandleFunc("/getBlurb", GetBlurb)

	fmt.Println(fmt.Sprintf("Listening on port %s", port))
	log.Fatal(http.ListenAndServe(port, nil))
}
