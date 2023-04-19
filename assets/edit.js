var bookAPI = "http://localhost:3000/books";
var title = document.querySelector('input[id="title"]');
var author = document.querySelector('input[id="author"]');
var category = document.querySelector('input[id="category"]');
var description = document.querySelector('input[id="description"]');
var date = document.querySelector('input[id="date"]');
var numpage = document.querySelector('input[id="numpage"]');
var img = document.querySelector('input[id="img"]');
var imgpreview = document.getElementById("image-preview");
const editButton = document.getElementById("edit-button");
const saveButton = document.getElementById("save-button");

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
        console.log(index);
        if (listid[index] == id) {
            var bookshow = listbook[index];
            console.log(bookshow);
            title.value = bookshow.title;
            author.value = bookshow.author;
            category.value = bookshow.category;
            description.value = bookshow.description;
            date.value = bookshow.date;
            numpage.value = bookshow.numpage;
            document.getElementById("imgpreview").src = bookshow.image;
            break;
        }
    }
}
document.getElementById("img").addEventListener("change", function (event) {
    var file = event.target.files[0]; // Lấy file đầu tiên trong  các file được chọn
    var img = document.getElementById("imgpreview"); // Lấy thẻ img để hiển thị
    // Tạo đường dẫn tạm thời của file
    var objectUrl = URL.createObjectURL(file);
    // Đặt đường dẫn vào thuộc tính src của thẻ img để hiển thị hình ảnh
    img.src = objectUrl;
});
