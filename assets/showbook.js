var bookAPI = "http://localhost:3000/books";
function start() {
    getBooks(renderBook);
}
start();
function getBooks(callback) {
    fetch(bookAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
function renderBook(books) {
    console.log(books);
    var listBookBlock = document.querySelector("#list-book");
    var html = books.map(function (book) {
        return `
            <li class="book-item book-items-${book.id}" onclick="handviewBook(${book.id})" >
                <img src="${book.image}">
                <h4 class="title-book"> ${book.title}</h4>
                <h4> ${book.author}</h4>
                <h4> ${book.category}</h4>
            </li>
        `;
    });
    listBookBlock.innerHTML = html.join("");
}
function handviewBook(id,books) {
    window.location.assign(`/bookshop/view.html?id=${id}`);
}
