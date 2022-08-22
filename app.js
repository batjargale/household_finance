// Дэлгэцтэй ажиллах контроллер
var uiController = (function () {})();
// Санхүүтэй ажиллах контроллер
var financeController = (function () {})();

// Програмын холбогч контроллер
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //1. Оруулах өгөгдлийг дэлгэцнээс олж авна.
    console.log("Дэлгэцэнд мэдээлэл орлоо");
    //2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж, тэнд хадгална.
    //3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт дамжуулж, тэнд хадгална.
    //4.Төсвийг тооцоолно.
    //5.Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
    // console.log("click");
  };
  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function (event) {
    // console.log(event);
    if (event.keyCode === 13 || event.which === 13) {
      // console.log("Enter дарсан байна " + event.keyCode);
      ctrlAddItem();
    }
  });
})(uiController, financeController);
