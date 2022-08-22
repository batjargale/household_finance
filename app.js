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
var financeController = (function () {
  // Байгуулагч фц тул эхний үсгийг томоор бичнэ
  var Income = function (id, desc, value) {
    this.id = id;
    this.desc = desc;
    this.value = value;
  };
  var Expense = function (id, desc, value) {
    this.id = id;
    this.desc = desc;
    this.value = value;
  };
  var data = {
    items: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
  };

  return {
    addItem: function (type, desc, val) {
      var item, id;
      // id = [1,2,4,5,8..] ийм байх бөгөөд id -ийг олгохдоо хамгийн сүүлийн элементийн дугаар дээр нэгйг нэмэгдүүлнэ.
      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        //exp
        item = new Expense(id, desc, val);
      }
      data.items[type].push(item);
    },
    data: function () {
      return data;
    },
  };
})();

// Програмын холбогч контроллер
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //1. Оруулах өгөгдлийг дэлгэцнээс олж авна.
    // console.log(uiController.getInput());
    var input = uiController.getInput();
    //2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж, тэнд хадгална.
    financeController.addItem(input.type, input.desc, input.value);
    console.log(financeController.addItem);
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
