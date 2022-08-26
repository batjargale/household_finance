// Дэлгэцтэй ажиллах контроллер
var uiController = (function () {
  // Ирээдүйд CSS дизайнер өөрчлөлт хийвэл өөрчлөлт хийхэд хялбар, алдаа гарахгүй
  var DOMstrings = {
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expanseList: ".expenses__list",
    budgetIncome: ".budget__income--value",
    budgetExpanse: ".budget__expenses--value",
    budgetExpansePer: ".budget__expenses--percentage",
    budgetValue: ".budget__value",
    containerDiv: ".container",
    expensePercentageLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
  };
  //Зөвхөн UI ашиглах зорилготой for давталттай фц
  var nodeListForeach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  return {
    displayDate: function () {
      var unuudur = new Date();
      document.querySelector(DOMstrings.dateLabel).textContent =
        unuudur.getFullYear() + " оны " + unuudur.getMonth() + " сар";
    },
    changeType: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputType +
          ", " +
          DOMstrings.inputDesc +
          ", " +
          DOMstrings.inputValue
      );
      nodeListForeach(fields, function (el) {
        el.classList.toggle("red-focus");
      });
      document.querySelector(DOMstrings.addBtn).classList.toggle("red");
    },
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        desc: document.querySelector(DOMstrings.inputDesc).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    displayPercentages: function (allPercentage) {
      // Зарлагын NodeList-ийг олох Node нь дэд элемент button, div ....
      var elements = document.querySelectorAll(
        DOMstrings.expensePercentageLabel
      );
      // элемент бүрийн хувьд зарлагын хувийг массиваас авч шивж оруулах
      nodeListForeach(elements, function (el, index) {
        el.textContent = allPercentage[index] + "%";
      });
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
    clearFields: function () {
      // Дэлгэцийн input-ийн утгуудыг цэвэрлэх
      //list өгөгдөл
      var fields = document.querySelectorAll(
        DOMstrings.inputDesc + ", " + DOMstrings.inputValue
      );

      // convert list to array
      var fieldsArr = Array.prototype.slice.call(fields);

      // fieldsArr.forEach(function (el, index, array) {}  === for
      fieldsArr.forEach(function (el) {
        el.value = "";
      });
      // for (var i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i].value = "";
      // }
      fieldsArr[0].focus();
    },
    // tusuv: data.tusuv,
    // huvi: data.huvi,
    // totalInc: data.totals.inc,
    // totalExp: data.totals.exp,
    tusviigUzuuleh: function (tusuv) {
      document.querySelector(DOMstrings.budgetValue).textContent =
        tusuv.tusuv.toLocaleString();
      document.querySelector(DOMstrings.budgetIncome).textContent =
        tusuv.totalInc.toLocaleString();
      document.querySelector(DOMstrings.budgetExpanse).textContent =
        tusuv.totalExp.toLocaleString();
      if (tusuv.huvi !== 0) {
        document.querySelector(DOMstrings.budgetExpansePer).textContent =
          tusuv.huvi + "%";
      } else {
        document.querySelector(DOMstrings.budgetExpansePer).textContent =
          tusuv.huvi;
      }
    },
    deleteListItem: function (id) {
      // Дэлгэц дээрээс устгах
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },
    addListItem: function (item, type) {
      //Орлого зарлагыг агуулын HTML-ийг бэлтгэнэ.
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$desc$$</div><div class="right clearfix"><div class="item__value">$$val$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expanseList;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$desc$$</div><div class="right clearfix"><div class="item__value">$$val$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //Тэр HTML дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө.
      html = html.replace("%id%", item.id);
      html = html.replace("$$desc$$", item.desc);
      html = html.replace("$$val$$", item.value.toLocaleString());
      // Бэлтгэсэн Html-ийг DOM руу хийнэ.
      // console.log(html);
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    },
  };
})();
// Санхүүтэй ажиллах контроллер
var financeController = (function () {
  // Байгуулагч фц тул эхний үсгийг томоор бичнэ
  // Орлогод олгох
  var Income = function (id, desc, value) {
    this.id = id;
    this.desc = desc;
    this.value = value;
  };
  // Зарлагад олгох
  var Expense = function (id, desc, value) {
    this.id = id;
    this.desc = desc;
    this.value = value;
    this.percentage = -1; //Анхны хувийг тооцоогүй тул -1 гэсэн утга өгөв
  };
  // Зардлын хувийг олох
  Expense.prototype.calPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = 0;
    }
  };
  //Хувийг буцаах
  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  // Нийт орлого, зарлага
  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });
    data.totals[type] = sum;
  };
  // Орлого, зарлагыг массивд олгох
  var data = {
    items: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
    tusuv: 0,
    huvi: 0,
  };
  //public service
  return {
    tusuvTootsooloh: function () {
      calculateTotal("inc");
      calculateTotal("exp");

      data.tusuv = data.totals.inc - data.totals.exp;
      if (data.totals.inc > 0) {
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
      }
    },
    calculatePercentages: function () {
      data.items.exp.forEach(function (el) {
        el.calPercentage(data.totals.inc);
      });
    },
    getPercentages: function () {
      var allPercentage = data.items.exp.map(function (el) {
        return el.getPercentage();
      });
      return allPercentage;
    },
    tusviigAvah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },
    //Lesson 75
    deleteItem: function (type, id) {
      var ids = data.items[type].map(function (el) {
        return el.id;
      }); //ids буюу бүх id-ийг агуулсан массив үүсгэв
      var index = ids.indexOf(id);

      if (index !== -1) {
        data.items[type].splice(index, 1);
        // console.log("deleted");
      }
    },
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
      return item;
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
    if (input.desc != "" && input.value != "") {
      var item = financeController.addItem(input.type, input.desc, input.value);
    }
    //3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт дамжуулж, тэнд хадгална.
    uiController.addListItem(item, input.type);
    uiController.clearFields();
    // Төсвийг шинээр тооцоолж, дэлгэцэнд харуулах
    updateTusuv();
  };

  var updateTusuv = function () {
    //4.Төсвийг тооцоолно.
    financeController.tusuvTootsooloh();
    //5.Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
    var tusuv = financeController.tusviigAvah();
    //6. Дэлгэцэнд харуулах
    uiController.tusviigUzuuleh(tusuv);
    //7. Элементүүдийн хувийг тооцоолох
    financeController.calculatePercentages();
    //8. Элементүүдийн хувийг хүлээж авах
    var allPercentage = financeController.getPercentages();
    //9. Эдгээр хувийг дэлгэцэнд харуулах
    // console.log(allPercentage);
    uiController.displayPercentages(allPercentage);
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

    // type change event listener
    document
      .querySelector(DOM.inputType)
      .addEventListener("change", uiController.changeType);

    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function (event) {
        // console.log(event.target.id);
        // Тухайн html-ийн parent буюу агуулж буй tag-ийн утгыг дуудах - parentNode -ийг ашиглана. <i>-ийн товчийг  дарахад устгах
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);
          // console.log(type + "-" + itemId);

          //1.Санхүүгийн модулиас устгах
          financeController.deleteItem(type, itemId);
          // console.log(itemId);
          //2. Дэлгэц дээрээс устгах
          uiController.deleteListItem(id);
          // 3. Үлдэгдэл тооцоог хийж, харуулах
          updateTusuv();
        }

        // console.log(
        //   event.target.parentNode.parentNode.parentNode.parentNode.id
        // );
      });
  };

  return {
    init: function () {
      console.log("Програм уншиж байна ... ");
      uiController.displayDate();
      uiController.tusviigUzuuleh({
        tusuv: 0,
        huvi: 0,
        totalInc: 0,
        totalExp: 0,
      });
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init();
