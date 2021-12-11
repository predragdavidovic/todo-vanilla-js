class Model {
    constructor() {
        this.todos = [
            {id: 1, text: 'Plant a tree', complete: false},
            {id: 2, text: 'Do homework', complete: false},
        ]
    }

    handleListChange(handler) {
        this.listChanged = handler;
    }

    addTodo(newTodo) {
        if (!newTodo.length) {
            return;
        }
        const newId = this.todos.length + 1;
        this.todos.push({id: newId, text: newTodo})

        this.listChanged(this.todos);
    }   

    toggleTodo(id) {
        this.todos = this.todos.map(todo => 
            todo.id === id ? {...todo, complete: !todo.complete} : todo)
        this.listChanged(this.todos);
    }

    handleDelete(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.listChanged(this.todos);
    }
}

export default Model;