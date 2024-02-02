package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path"
	"strings"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/skykosiner-com/pkg/blog"
	"github.com/skykosiner-com/pkg/book"
	"github.com/skykosiner-com/pkg/utils"
)

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
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal(err)
	}

	port := ":" + os.Getenv("PORT")

	if port == ":" {
		port = ":8080"
	}

	r := mux.NewRouter()
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	r.HandleFunc("/{path:.*}", func(w http.ResponseWriter, r *http.Request) {
		requestedPath := "pages/" + mux.Vars(r)["path"]

		if requestedPath == "" || strings.HasSuffix(requestedPath, "/") {
			requestedPath += "index"
		}

		var contentType string

		if !strings.HasSuffix(requestedPath, ".html") && !strings.HasSuffix(requestedPath, ".md") {
			requestedPath += ".html"
		}

		if strings.HasSuffix(requestedPath, ".md") {
			contentType = "text/plain; charset=utf-8"
		}

		content, err := ioutil.ReadFile(requestedPath)
		if err != nil {
			http.Error(w, "Page not found", http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", contentType)
		w.Write(content)
	})

	http.Handle("/", r)
	http.HandleFunc("/blog/", blog.MakeHandler(blog.ViewHandler))
	http.HandleFunc("/book/", book.MakeHandler(book.ViewHandler))
	http.HandleFunc("/getPosts/", utils.ListBlogPosts)
	http.HandleFunc("/getBooks/", utils.ListBookNotes)
	http.HandleFunc("/contactForm/", utils.Contact)
	http.HandleFunc("/search", blog.SearchHandler)
	http.HandleFunc("/Get404BlogPostsRecs/", utils.Get404BlogPostsRecs)

	fmt.Println(fmt.Sprintf("Listening on port %s", port))
	log.Fatal(http.ListenAndServe(port, nil))
}
