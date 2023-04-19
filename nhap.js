document.getElementById("img").addEventListener("change", function (event) {
    var file = event.target.files[0]; // Lấy file đầu tiên trong  các file được chọn
    var img = document.getElementById("imgpreview"); // Lấy thẻ img để hiển thị
    // Tạo đường dẫn tạm thời của file
    var objectUrl = URL.createObjectURL(file);
    // Đặt đường dẫn vào thuộc tính src của thẻ img để hiển thị hình ảnh
    img.src = objectUrl;
});