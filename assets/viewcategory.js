function showBooks() {
    var selectBox = document.getElementById("selectBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;

    if (selectedValue == "all") {
        // Code để hiển thị tất cả sách
        alert("Bạn đã chọn hiển thị tất cả sách");
    } else {
        // Code để hiển thị sách theo thể loại
        alert("Bạn đã chọn hiển thị sách theo thể loại " + selectedValue);
    }
}
