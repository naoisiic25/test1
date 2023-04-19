var bookAPI = "http://localhost:3000/books";
function start() {
    getBooks(renderBook);
    handleCreateBook();
}
start();
function getBooks(callback) {
    fetch(bookAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
function createBook(data) {
    var option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(bookAPI, option)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
function handleDeleteBook(id) {
    var result = confirm("Bạn có chắc chắn muốn xóa quyển sách này không?");
    if (result) {
        var option = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        fetch(bookAPI + "/" + id, option)
            .then(function (response) {
                return response.json();
            })
            .then(function () {
                var bookItemDelete = document.querySelector(".books-item-" + id);
                if (bookItemDelete) {
                    bookItemDelete.remove();
                }
            });
    } else {
    }
}
function renderBook(books) {
    var listBookBlock = document.querySelector("#list-book");
    var html = books.map(function (book) {
        return `
            <li class="book-item book-items-${book.id}">
                <img src="${book.image}">
                <h4 class="title-book"> ${book.title}</h4>
                <h4> ${book.author}</h4>
                <h4> ${book.category}</h4>
                <br />
                <button class="tool btnview">
                    <a href="./view.html">View</a>
                </button>
                <button class="tool btndelete" onclick="handleDeleteBook(${book.id})">Delete</button>

            </li>
        `;
    });
    listBookBlock.innerHTML = html.join("");
}
function handleCreateBook() {
    var createBtn = document.querySelector("#create");
    createBtn.onclick = function () {
        var title = document.querySelector('input[name="title"]').value;
        var author = document.querySelector('input[name="author"]').value;
        var category = document.querySelector('input[name="category"]').value;

        console.log(title, author);
        var data = {
            title: title,
            author: author,
            category: category,
        };
        createBook(data, function () {
            getBooks(renderBook);
        });
    };
}
