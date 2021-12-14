import {getCurrentDate} from '../helpers/date.js';

class View {
    constructor() {
        this.app = this.getElement('#root');
        this.head = this.createElement('div', 'head');
        this.headLeft = this.createElement('div', 'headLeft');
        this.headRight = this.createElement('div', 'headRight');
        this.container = this.createElement('div', 'container');
        const form = this.createElement('form');
        this.input = this.createElement('input', 'addInput');
        this.button = this.createElement('button', 'addButton');
        this.button.innerHTML = '+';

        form.appendChild(this.input);  
        form.appendChild(this.button);
        this.head.appendChild(this.headLeft);
        this.head.appendChild(this.headRight);
        this.app.appendChild(this.head);
        this.app.appendChild(form);

        this._temporaryState = '';
        this._initTemporaryState();
        this.displayCurrentDate(getCurrentDate());
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

    displayCurrentDate(currentDate) {
        const day = this.createElement('span', 'day');
        const date = this.createElement('span', 'date');
        day.innerHTML = currentDate.day;
        date.innerHTML = currentDate.month;
        this.headLeft.appendChild(day);
        this.headLeft.appendChild(date);
    }

    displayCount(todos) {
        while(this.headRight.firstChild) {
            this.headRight.removeChild(this.headRight.firstChild);
        }

        const total = this.createElement('span', 'total');
        const done = this.createElement('span', 'done');
        const totalCount = todos.length;
        const doneCount = todos.filter(item => !!item.complete).length;
        total.innerHTML = `${totalCount} Tasks`;
        done.innerHTML = `${doneCount} Completed`;
        this.headRight.appendChild(total);
        this.headRight.appendChild(done);
    }

    displayList(list) {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
       
        if (list.length === 0) {
            const hammockImg = this.createElement('img');
            hammockImg.setAttribute('src', '../images/hammock.svg');
            hammockImg.setAttribute('class', 'rest');
            hammockImg.setAttribute('width', '100px');
            hammockImg.setAttribute('height', '100px');
            const p = this.createElement('p', 'noItems');
            const text = document.createTextNode('Nothing to do...');
            p.appendChild(text);
            this.container.appendChild(hammockImg);
            this.container.appendChild(p);
        }

        this.displayCount(list);

        list.map(todo => {
            const li = this.createElement('li');
            const spanHolder = this.createElement('span', 'holder');
            const checkbox = this.createElement('input');
            const span = this.createElement('span');
            const deleteButton = this.createElement('img');
            
            li.setAttribute('id', todo.id);
            spanHolder.setAttribute('id', todo.id);
            checkbox.setAttribute('type', 'checkbox');
            span.setAttribute('contenteditable', true);
            span.setAttribute('class', 'writable');
            checkbox.checked = todo.complete;
            deleteButton.setAttribute('src', '../images/trash.svg');
            deleteButton.setAttribute('class', 'tresh');
            deleteButton.setAttribute('width', '25px');
            deleteButton.setAttribute('height', '25px');


            spanHolder.appendChild(checkbox);
            spanHolder.appendChild(span);
            li.appendChild(spanHolder)
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

    _initTemporaryState() {
        this.container.addEventListener('input', e => {
            if (e.target.className === 'writable') {
                this._temporaryState = e.target.innerText;
            }
        });
    }

    bindSubmit(handler) {
        this.button.addEventListener('click', e => {
            e.preventDefault();
            handler(this.input.value);
            this._restInput(); 
        });
    }
    
    bindEdit(handler) {
        this.container.addEventListener('focusout', e => {
            if (this._temporaryState) {
                const id = parseInt(e.target.parentElement.id);
                handler(id, this._temporaryState);
                this._temporaryState = '';
            }
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
            if (e.target.nodeName.toLocaleLowerCase() === 'img') {
                const id = parseInt(e.target.parentElement.id);
                handler(id)
            }
        });
    }
}

export default View;