import { get, post, remove, put } from "./request.js";
import {
  _setQuantity,
  addClass,
  removeClass,
  renderCompletedList,
  renderFailedList,
  renderTodoList,
} from "./ui.js";
import { validate, validationMessages } from "./validate.js";

const Todo = (function () {
  // Variables

  const TODO_LİST_URL = `http://localhost:3000/todo/`;
  const FAİLED_LİST_URL = `http://localhost:3000/failed/`;
  const COMPLETED_LİST_URL = `http://localhost:3000/completed`;

  const themeButton = document.querySelector(".js-theme-button");
  const header = document.querySelector("header");
  const todoForm = document.querySelector(".js-add-todo");
  const todoInput = document.querySelector(".js-add-todo-input");
  const dateInput = document.querySelector(".js-add-date-input");
  const todoList = document.querySelector(".js-todo-list");
  const completedButton = document.querySelector(".js-completed-button");
  const failedTodoList = document.querySelector(".js-failed-todo-list");
  const completedTodoList = document.querySelector(".js-completed-todo-list");
  const clearButton = document.querySelector(".js-clear-button");
  const quantityItem = document.querySelector(".js-item-quantity");
  const redZone = document.querySelector('.js-red-zone');
  const greenZone = document.querySelector('.js-green-zone');

  // Event Listeners

  const _eventListeners = function () {
    themeButton.addEventListener("click", _toggleTheme);
    completedButton.addEventListener("click", _completedTodo);
    todoForm.addEventListener("submit", _handleSubmit);
    clearButton.addEventListener("click", _clearCompletedTodos);
    document.addEventListener("click", function (e) {
      const elementTarget = e.target;
      _selectTodo(elementTarget);
      _filtredTodos(elementTarget, TODO_LİST_URL);
      _removeTodo(elementTarget, TODO_LİST_URL, FAİLED_LİST_URL);
      _openCloseRedZone(elementTarget);
      _openCloseGreenZone(elementTarget);
    });
  };

  // FunC

  const _openCloseGreenZone = function (target) {
    if(target.closest('.js-prev-button')) {
      if(greenZone.classList == 'green-zone js-green-zone active') {
        removeClass(greenZone);
      } else {
        addClass(greenZone);
      }
    }
  }
  const _openCloseRedZone = function (target) {
    if(target.closest('.js-next-button')) {
      if(redZone.classList == 'red-zone js-red-zone active') {
        removeClass(redZone);
      } else {
        addClass(redZone);
      }
    }
  }

  const _removeTodo = function (target, todoURL, failURL) {
    if (target.closest(".js-remove-todo")) {
      const todo = target.closest(".js-todo");
      const todoID = todo.getAttribute("data-id");
      const todoName = todo.children[1].children[0].textContent;
      let data = {
        id: todoID,
        name: todoName,
        status: "",
        class: "",
        timeleft: "Canceled",
      };
      postActions.addToFailed(FAİLED_LİST_URL, data);
      _deleteTodo(todoURL, todoID);
    }
  };

  const _filtredTodos = function (target, url) {
    if (target.closest(".js-active-todos")) {
      get(url).then((todos) => {
        const filteredTodos = todos.filter((todo) => !todo.status);
        renderTodoList(todoList, filteredTodos);
      });
    } else if (target.closest(".js-all-todos")) {
      _getTodoList(url);
    }
  };

  const _clearCompletedTodos = function () {
    const completedTodos = todoList.querySelectorAll(".disabled");
    completedTodos.forEach((completedTodo) => {
      const todoID = completedTodo.getAttribute("data-id");
      _deleteTodo(TODO_LİST_URL, todoID);
    });
  };

  const _handleSubmit = function (e) {
    e.preventDefault();
    const dateInputValue = dateInput.value;
    const todoInputValue = todoInput.value;
    const enteredDate = new Date(dateInputValue);
    const todayDate = new Date();

    const validationRules = [
      { func: validate.checkEmpty, field: todoInputValue, message: validationMessages.emptyInput },
      { func: validate.checkEmpty, field: dateInputValue, message: validationMessages.emptyInput },
      { func: validate.checkPastDate, params: [enteredDate, todayDate], message: validationMessages.pastDate },
      { func: validate.checkFormat, field: todoInputValue, message: validationMessages.invalidFormat }
  ];
  
  for (const rule of validationRules) {
      if (rule.func(...(rule.params || [rule.field]))) {
          alert(rule.message);
          return; // Doğrulama başarısız olduğunda işlemi sonlandır
      }
  }
  
  let timeLeft = _dayCalculation(enteredDate, todayDate);
  let data = {
      id: "",
      name: todoInputValue,
      status: "",
      class: "",
      timeleft: timeLeft,
  };
  
  postActions.addToDefault(TODO_LİST_URL, data);
  };

  const _dayCalculation = function (enteredDate, todayDate) {
    const selectDate = enteredDate.getTime();
    const currentDate = todayDate.getTime();
    const dayDifference = selectDate - currentDate;
    const dayLeft = Math.ceil(dayDifference / (1000 * 3600 * 24));

    return dayLeft;
  };

  const _timerDay = function (url) {
    get(url).then((datas) => {
      const filteredTodos = datas.filter((todo) => !todo.status);
      filteredTodos.forEach((filteredTodo) => {
        const todoID = filteredTodo.id;
        let todoTimeLeft = Number(filteredTodo.timeleft);
        const interval = setInterval(function () {
          if (todoTimeLeft > 0) {
            todoTimeLeft--;
            let data = {
              id: todoID,
              name: filteredTodo.name,
              status: "",
              class: "",
              timeleft: todoTimeLeft,
            };
            _putRequest(TODO_LİST_URL, todoID, data);
          } else {
            clearInterval(interval);
            let data = {
              id: todoID,
              name: filteredTodo.name,
              status: "",
              class: "",
              timeleft: "Time Out",
            };
            postActions.addToFailed(FAİLED_LİST_URL, data);
            _deleteTodo(TODO_LİST_URL, todoID);
          }
        }, 10000);
      });
    });
  };

  const _selectTodo = function (target) {
    if (target.closest(".js-check-button")) {
      const element = target.closest(".js-check-button");
      const todoElement = target.closest(".js-todo");
      if (todoElement.classList != "js-todo disabled") {
        if (element.classList == "js-check-button active") {
          removeClass(element);
        } else {
          addClass(element);
        }
      }
    }
  };

  const _completedTodo = function () {
    const todos = todoList.querySelectorAll(".active");
    todos.forEach((todo) => {
      const todoId = todo.getAttribute("data-id");
      const todoName = todo.parentElement.parentElement.children[1].children[0];
      const todoDate = todo.parentElement.parentElement.children[1].children[1];
      let data;
      if (todo.classList == "js-check-button active") {
        data = {
          id: todoId,
          name: todoName.textContent,
          status: "disabled",
          class: "active",
          timeleft: "Completed",
        };
      } else {
        data = {
          id: todoId,
          name: todoName.textContent,
          status: "",
          class: "",
          timeleft: todoDate.textContent,
        };
      }

      _putRequest(TODO_LİST_URL, todoId, data);
      postActions.addToCompleted(COMPLETED_LİST_URL, data);
    });
  };

  const _toggleTheme = function () {
    const html = document.querySelector("html");
    const currentTheme = html.getAttribute("data-theme");

    // Temayı değiştirme
    if (currentTheme === "light") {
      html.setAttribute("data-theme", "dark");
      // header.classList.add("active");
      addClass(header);
    } else {
      html.setAttribute("data-theme", "light");
      // header.classList.remove("active");
      removeClass(header);
    }
  };

  // HTTP Requests ---

  const _putRequest = function (url, id, data) {
    put(url + `${id}`, data).then(() => {
      _getTodoList(url);
    });
  };

  const postActions = {
    addToFailed: (url, data) => _addTodo(url, data, _getFailedTodoList),
    addToCompleted: (url, data) => _addTodo(url, data, _getCompletedTodoList),
    addToDefault: (url, data) => _addTodo(url, data, _getTodoList),
  };

  const _addTodo = function (url, data, getListFunction) {
    post(url, data).then(() => {
      getListFunction(url);
    });
  };

  const _getCompletedTodoList = function (url) {
    get(url).then((datas) => {
      renderCompletedList(completedTodoList, datas);
    });
  };

  const _getFailedTodoList = function (url) {
    get(url).then((datas) => {
      renderFailedList(failedTodoList, datas);
    });
  };

  const _getTodoList = function (url) {
    get(url).then((datas) => {
      renderTodoList(todoList, datas);
      const quantity = todoList.querySelectorAll(".js-todo").length;
      _setQuantity(quantityItem, quantity);
    });
  };

  const _deleteTodo = function (url, id) {
    remove(url + `${id}`).then(() => {
      _getTodoList(url);
    });
  };

  return {
    init: function () {
      _eventListeners();
      _getTodoList(TODO_LİST_URL);
      _getCompletedTodoList(COMPLETED_LİST_URL);
      _getFailedTodoList(FAİLED_LİST_URL);
      _timerDay(TODO_LİST_URL);
    },
  };
})();

document.addEventListener("DOMContentLoaded", function () {
  Todo.init();
});
