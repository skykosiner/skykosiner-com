package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path"

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

	fs := FileServerWithCustom404(http.Dir("./pages"))
	http.Handle("/", fs)
	http.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("public"))))
	http.HandleFunc("/blog/", blog.MakeHandler(blog.ViewHandler))
	http.HandleFunc("/book/", book.MakeHandler(book.ViewHandler))
	http.HandleFunc("/getPosts/", utils.ListBlogPosts)
	// http.HandleFunc("/getPostsWithDate/", utils.ListBlogPostsWithDate)
	http.HandleFunc("/getBooks/", utils.ListBookNotes)
	http.HandleFunc("/contact/", utils.Contact)
	http.HandleFunc("/search", blog.SearchHandler)
	http.HandleFunc("/Get404BlogPostsRecs/", utils.Get404BlogPostsRecs)

	fmt.Println(fmt.Sprintf("Listening on port %s", port))
	log.Fatal(http.ListenAndServe(port, nil))
}
