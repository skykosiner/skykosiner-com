package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path"
	"strings"

	"github.com/joho/godotenv"
	"github.com/skykosiner-com/pkg/blog"
	"github.com/skykosiner-com/pkg/book"
	"github.com/skykosiner-com/pkg/utils"
)

type BlogPost404 struct {
	title string
	blurb string
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
			// fmt.Println(idx, line)
			var skip bool
			if idx == 0 || idx == 1 {
				skip = true
			}

			if len(blurbArr) > 4 {
				break
			}


			if !skip {
				fmt.Println(line)
				blurbArr = append(blurbArr, line)
				blurb += line
			}
		}

		postsArr = append(postsArr, BlogPost404{strings.Split(title, ".md")[0], blurb})
	}

	fmt.Fprintf(w, "%s", postsArr)
}

func Contact(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Redirect(w, r, "/html/contact.html", http.StatusSeeOther)
	}

	if strings.Contains(r.FormValue("name"), "Mike") {
		http.Redirect(w, r, "/html/spam.html", http.StatusSeeOther)
		return
	}

	msg := fmt.Sprintf(`To: "Sky Kosiner" <sky@skykosiner.com>
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
	http.HandleFunc("/contact/", Contact)
	http.HandleFunc("/search", blog.SearchHandler)
	http.HandleFunc("/Get404BlogPostsRecs/", Get404BlogPostsRecs)

	fmt.Println(fmt.Sprintf("Listening on port %s", port))
	log.Fatal(http.ListenAndServe(port, nil))
}
