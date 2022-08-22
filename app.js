// Дэлгэцтэй ажиллах контроллер
var uiController = (function () {
  // Ирээдүйд CSS дизайнер өөрчлөлт хийвэл өөрчлөлт хийхэд хялбар, алдаа гарахгүй
  var DOMstrings = {
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        desc: document.querySelector(DOMstrings.inputDesc).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();
// Санхүүтэй ажиллах контроллер
var financeController = (function () {})();

// Програмын холбогч контроллер
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //1. Оруулах өгөгдлийг дэлгэцнээс олж авна.
    console.log(uiController.getInput());
    //2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж, тэнд хадгална.
    //3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт дамжуулж, тэнд хадгална.
    //4.Төсвийг тооцоолно.
    //5.Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
    // console.log("click");
  };

  var setupEventListeners = function () {
    var DOM = uiController.getDOMstrings(); //UI aas css class uudiig duudaj bna
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log("Програм уншиж байна ... ");
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init();
