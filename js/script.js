'use strict';

const newTodoControl = document.querySelector(".todo-control");
const newTodo = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

let todoData = [];

let todoLoad = function() {

    let json = localStorage.getItem("todoData");
    let array = JSON.parse(json);

    if(!array) {
        array = [];
    }

    return array;
};

todoData = todoLoad();

//функция которая будет отрисовывать todo задачи перебирая массив
const render = function() {
    todoList.innerHTML = "";
    todoCompleted.innerHTML = "";

    todoData.forEach(function(item, index) {
        const li = document.createElement("li");

        li.classList.add("todo-item");

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' + 
        '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
        '</div>';

        //переход из листа "сделать" в лист "сделано" и обратно
        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        
        //изменение "галочки" при её нажатии
        li.querySelector(".todo-complete").addEventListener("click", function() {
            item.completed = !item.completed; 
            render();
        });

        //удаление задачи
        li.querySelector(".todo-remove").addEventListener("click", function() {
            todoData.splice(index, 1);
            render();
        });
    });

    let json = JSON.stringify(todoData);
    localStorage.setItem("todoData", json);
};

//обработка кнопки submit
newTodoControl.addEventListener("submit", function (event) {
    //событие отменяет перезагрузку страницы после нажатия кнопки submit
    event.preventDefault();

    const newTask = {
        text: newTodo.value,
        completed: false
    };

    newTask.text = newTask.text.trim();

    if(newTask.text != ""){
        todoData.push(newTask);
    } 
    
    newTodo.value = "";

    render();
});

//при загрузке страницы
window.addEventListener("load", render);
