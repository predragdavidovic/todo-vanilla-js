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

        list.map(todo => {
            const li = this.createElement('li');
            const checkbox = this.createElement('input');
            const span = this.createElement('span');
            const deleteButton = this.createElement('button');
            
            li.setAttribute('id', todo.id);
            checkbox.setAttribute('type', 'checkbox');
            checkbox.checked = todo.complete;
            deleteButton.innerHTML = 'Delete';

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteButton);
            this.container.appendChild(li);

            if (todo.complete) {
                const strike = this.createElement('s');
                strike.innerHTML = todo.text
                span.appendChild(strike);
            } else {
                span.innerHTML = todo.text;
            }
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

    bindToggleCheckbox(handler) {
        this.container.addEventListener('click', e => {
            if (e.target.type === 'checkbox') {
                const id = parseInt(e.target.parentElement.id);
                handler(id);
            }
        });
    }

    bindDelete(handler) {
        this.container.addEventListener('click', e => {
            if (e.target.type === 'submit') {
                const id = parseInt(e.target.parentElement.id);
                handler(id)
            }
        });
    }
}

export default View;