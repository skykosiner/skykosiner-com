# Table of Contents

1.  [Why I remade my website](#org4d64ebd)
2.  [Techstack](#orgb779d99)
    1.  [Golang](#org7f9de5b)
    2.  [HTML, CSS, and JS](#org17cf3a3)
3.  [Wrap up](#org958a094)


<a id="org4d64ebd"></a>

# Why I remade my website

When I first got into coding I found my self remaking my personal website all
the time, as I didn't know what other kind of project to work on. But over the
past year and a bit I've been able to think of good projects to work on. So no I
did not make this website as I ran out of idea. I made this as I felt like using
next.JS was too much for how simple my website was.


<a id="orgb779d99"></a>

# Techstack

My goal for creating this website was to have a simple techstack that didn't add
a bunch of JavaScript bloat. I'm not against using JavaScript when I need it,
but for example this website only has JavaScript to fetch the posts from the go
API, other then that almost 0 JavaScript is used.

For example the logic for searching for blog posts and showing the results is
all done by making a GET request in a form to the go backend, and the go backend
renders out a template search.html.


<a id="org7f9de5b"></a>

## Golang

Golang has quickly become my favorite programming language, and I've found that
I can make almost anything I need to or want to with golang.

I love golang as it's simple yet, you can do complicated things in it. This
website is ran with a golang http server, this allows me to have it serve all
the HTML, CSS, and js files. But along with that staticly generate blog pages
from markdown (they are whiten in org, but then I have a script to convert them
to markdown). I've found this great as I don't have to really on a bloated
Typescript frontend and a typescript backend for the few backend functions I
need.


<a id="org17cf3a3"></a>

## HTML, CSS, and JS

The first way you normally learn to make websites is with good old HTML and CSS,
then over time adding JS. Once I learnt react I thought I'd never go back to
making websites like this. But well over time I learnt using react can lead to
slow and bloated websites with loadnig so much JavaScript which is not needed.

So that's when I decided to remake my website with pure HTML, CSS, and JS. But I
wanted a blog with just org/markdown, so that's where the http golang server
came into play. This allowed me to serve all the static files I wanted, and also
server the blog markdown blog files without having to write a complicated shell
script. Which I did try and I got far, but I gave up as it just turned into a
pain to write.


<a id="org958a094"></a>

# Wrap up

This isn't a very long post. But I'll be trying to add new blog posts as often as I can!
You can checkout the code to this website on my github.