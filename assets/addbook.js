var bookAPI = "http://localhost:3000/books";
function start() {
    handleCreateBook();
}
start();
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
            if (response.ok) {
                // Nếu tạo dữ liệu thành công, hiển thị thông báo
                setTimeout(function () {
                    alert("Tạo dữ liệu thành công!");
                }, 0);
                window.location.assign("http://127.0.0.1:5500/bookshop/homeadmin.html");
                // Cập nhật giao diện người dùng, ví dụ: xóa dữ liệu trên form
            } else {
                // Nếu có lỗi xảy ra, hiển thị thông báo lỗi
                alert("Có lỗi xảy ra! Vui lòng thử lại sau.");
            }
        })
        .catch(function (error) {
            console.error("Lỗi:", error);
        });
}
function handleCreateBook() {
    var createBtn = document.querySelector("#create");
    createBtn.onclick = function () {
        var result = confirm("Bạn có chắc chắn muốn thêm quyển sách này không?");
        if (result) {
            var title = document.querySelector('input[name="title"]').value;
            var author = document.querySelector('input[name="author"]').value;
            var category = document.querySelector('input[name="category"]').value;

            console.log(title, author);
            var data = {
                title: title,
                author: author,
                category: category,
            };
            createBook(data);
        } else {
        }
    };
}
//show image on screen
document.getElementById("file-input").addEventListener("change", function (event) {
    var file = event.target.files[0]; // Lấy file đầu tiên trong  các file được chọn
    var img = document.getElementById("image-preview"); // Lấy thẻ img để hiển thị 
    // Tạo đường dẫn tạm thời của file
    var objectUrl = URL.createObjectURL(file);
    // Đặt đường dẫn vào thuộc tính src của thẻ img để hiển thị hình ảnh
    img.src = objectUrl;
});
