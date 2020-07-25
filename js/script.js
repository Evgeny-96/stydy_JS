'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
        this.input.value = '';
    }

    createItem (elem) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = elem.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${elem.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if(elem.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if(this.input.value === '') {
            alert('Пустое дело добавлять нельзя...');
            return;
        } else {
            if(this.input.value.trim()) {
                const newTodo = {
                    value: this.input.value,
                    completed: false,
                    key: this.generateKey()
                };
                this.todoData.set(newTodo.key, newTodo);
                this.render();
            }
        }        
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(elem) {
        this.todoData.forEach(e => {
            if(e.key === elem.key) {
                this.todoData.delete( elem.key);
                this.render();
            }
        });
    }

    completedItem(elem) {
        this.todoData.forEach((e) => {
            if(e.key === elem.key) {
                if(e.completed === true) {
                    e.completed = false;
                    this.render();
                } else {
                    e.completed = true;
                    this.render();
                }
            }
        });
    }

    handler(elem) {
        let target = elem.target;
        if (target.classList.contains('todo-remove')) {
            this.deleteItem(target.closest('.todo-item'));
        } else if (target.classList.contains('todo-complete')) {
            this.completedItem(target.closest('.todo-item'));
        }
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.todoList.addEventListener('click', this.handler.bind(this));
        this.todoCompleted.addEventListener('click', this.handler.bind(this));
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
