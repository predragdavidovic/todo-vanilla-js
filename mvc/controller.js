class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.displayList(this.model.todos);
        this.view.bindSubmit(this.handleSubmit);
        this.view.bindToggleCheckbox(this.handleToggleCheckbox);
        this.view.bindDelete(this.handleDelete);
        this.model.handleListChange(this.handleTodosChange);
    }

    handleSubmit = text => {
        this.model.addTodo(text);
    }

    handleTodosChange = todos => {
        this.view.displayList(todos)
    }

    handleToggleCheckbox = id => {
        this.model.toggleTodo(id);
    }

    handleDelete = id => {
        this.model.handleDelete(id);
    }
}

export default Controller;