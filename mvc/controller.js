class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.displayList(this.model.todos);
        this.view.bindSubmit(this.handleSubmit);
        this.view.bindToggleCheckbox(this.handleToggleCheckbox);
        this.view.bindDelete(this.handleDelete);
        this.view.bindEdit(this.handleEdit);
        this.model.handleListChange(this.handleTodosChange);
    }

    handleSubmit = text => {
        this.model.addTodo(text);
    }

    handleToggleCheckbox = id => {
        this.model.toggleTodo(id);
    }

    handleDelete = id => {
        this.model.handleDelete(id);
    }

    handleEdit = (id, value) => {
        this.model.handleEdit(id, value);
    }

    handleTodosChange = todos => {
        this.view.displayList(todos);
    }
}

export default Controller;