class Model {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    }

    handleListChange(handler) {
        this.listChanged = handler;
    }

    _update(todos) {
        this.listChanged(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    addTodo(newTodo) {
        if (!newTodo.length) {
            return;
        }
        const newId = Date.now();
        this.todos.push({id: newId, text: newTodo, complete: false});
        this._update(this.todos);
    }   

    toggleTodo(id) {
        this.todos = this.todos.map(todo => 
            todo.id === id ? {...todo, complete: !todo.complete} : todo);
        this._update(this.todos);
    }

    handleDelete(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this._update(this.todos);
    }

    handleEdit(id, value) {
        this.todos = this.todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    text: value
                };
            } else {
                return todo;
            }
        });
        this._update(this.todos);
    }
}

export default Model;