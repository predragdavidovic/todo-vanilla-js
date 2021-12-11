class Model {
    constructor() {
        this.todos = [
            {id: 1, text: 'Plant a tree'},
            {id: 2, text: 'Do homework'},
        ]
    }

    handleListChange(handler) {
        this.listChanged = handler;
    }

    addTodo(newTodo) {
        const newId = this.todos.length + 1;
        this.todos.push({id: newId, text: newTodo})

        this.listChanged(this.todos);
    }   
}

class View { 
    constructor() {
        this.app = this.getElement('#root');
        this.container = this.createElement('div', 'container');
        this.form = this.createElement('form');
        this.input = this.createElement('input');
        this.button = this.createElement('button');
        this.button.innerHTML = 'Submit';

        this.form.appendChild(this.input);  
        this.form.appendChild(this.button);
        this.app.appendChild(this.form);
    }

    createElement(tagName, className) {
        if (!className) {
            return document.createElement(tagName);
        } else {
            const element = document.createElement(tagName);
            element.setAttribute('class', className);
            return element;
        }
    }

    getElement(selector) {
        return document.querySelector(selector);
    }

    _restInput() {
        this.input.value = '';
    }

    displayList(list) {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
       
        if (list.length === 0) {
            const p = this.createElement('p');
            const text = document.createTextNode('There are no items in Todo list');
            p.appendChild(text);
            this.container.appendChild(p);
        }

        list.map(item => {
            this.div = this.createElement('div');
            this.span = this.createElement('span');
            this.checkbox = this.createElement('input');
            this.checkbox.setAttribute('type', 'checkbox');
    
            this.div.appendChild(this.span);
            this.div.appendChild(this.checkbox);
            this.container.appendChild(this.div);
            this.span.innerHTML = item.text;
        });

        this.app.appendChild(this.container);
    }

    bindSubmit(handler) {
        this.button.addEventListener('click', e => {
            e.preventDefault();
            handler(this.input.value);
            this._restInput(); 
        });
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.displayList(this.model.todos);
        this.view.bindSubmit(this.handleSubmit);
        this.model.handleListChange(this.handleTodosChange);
    }

    handleSubmit = text => {
        this.model.addTodo(text);
    }

    handleTodosChange = todos => {
        this.view.displayList(todos)
    }
}

const app = new Controller(new Model(), new View());