var bookAPI = "http://localhost:3000/books";
const imgavarta = document.getElementById("imgavarta");
const title = document.getElementById("title");
const author = document.getElementById("author");
const description = document.getElementById("description");
const date = document.getElementById("date");
const numpage = document.getElementById("numpage");
const category = document.getElementById("category");

let params = new URLSearchParams(window.location.search);
let id = params.get("id");

function start() {
    getbooks(renderbook);
}
start();
function getbooks(callback) {
    fetch(bookAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
function renderbook(listbook) {
    var listid = listbook.map(function (book) {
        return book.id;
    });
    for (const index in listid) {
        if (listid[index] == id) {
            var bookshow = listbook[index];
            console.log(bookshow);
            document.getElementById("imgavarta").src = bookshow.image;
            title.textContent = bookshow.title;
            author.textContent = bookshow.author;
            category.textContent = bookshow.category;
            description.textContent = bookshow.description;
            date.textContent = bookshow.date;
            numpage.textContent = bookshow.numpage;
            break;
        }
    }
}

