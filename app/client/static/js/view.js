import AddTodo from "./components/add-todo.js";
import Modal from "./components/modal.js";
import Filters from "./components/filters.js";

export default class View {
  constructor() {
    this.model = null;
    this.table = document.getElementById("table");
    this.addTodoForm = new AddTodo();
    this.modal = new Modal();
    //this.filters = new Filters();

    this.addTodoForm.onClick((title, description) =>
      this.addTodo(title, description)
    );
    this.modal.onClick((id, values) => this.editTodo(id, values));
    //this.filters.onClick((filters) => this.filter(filters));
  }

  setModel(model) {
    this.model = model;
  }

  tableView() {
    return `<table class="table table-striped" id="table">
    <thead>
      <tr>
        <th scope="col">Todo</th>
        <th scope="col">Description</th>
        <th scope="col">
          <div class="d-flex justify-content-center">
            Completed
          </div>
        </th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      
    </tbody>
  </table>`;
  }

  async render() {
    const resp = await this.model.getTodo();
    this.table.innerHTML = this.tableView();

    resp.todosList.forEach((todo) => this.createRow(todo));
  }

  filter(filters) {
    const { type, words } = filters;
    const [, ...rows] = this.table.getElementsByTagName("tr");
    for (const row of rows) {
      const [title, description, completed] = row.children;
      let shouldHide = false;

      if (words) {
        shouldHide =
          !title.innerText.includes(words) &&
          !description.innerText.includes(words);
      }

      const shouldBeCompleted = type === "completed";
      const isCompleted = completed.children[0].checked;

      if (type !== "all" && shouldBeCompleted !== isCompleted) {
        shouldHide = true;
      }

      if (shouldHide) {
        row.classList.add("d-none");
      } else {
        row.classList.remove("d-none");
      }
    }
  }

  async addTodo(title, description) {
    await this.model.addTodo(title, description);
    this.render();
  }

  toggleCompleted(values) {
    this.model.toggleCompleted(values);
  }

  async editTodo(id, values) {
    await this.model.editTodo(id, values);
    this.render()
  }

  removeTodo(id) {
    this.model.removeTodo(id);
    this.render()
  }

  createRow(todo) {
    const row = table.insertRow();
    row.setAttribute("id", todo.id);
    row.innerHTML = `
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td class="text-center">

      </td>
      <td class="text-right">

      </td>
    `;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.onclick = () => this.toggleCompleted(todo);
    row.children[2].appendChild(checkbox);

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-primary", "mb-1");
    editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
    editBtn.setAttribute("data-toggle", "modal");
    editBtn.setAttribute("data-target", "#modal");
    editBtn.onclick = () =>
      this.modal.setValues({
        id: todo.id,
        title: row.children[0].innerText,
        description: row.children[1].innerText,
        completed: row.children[2].children[0].checked,
      });
    row.children[3].appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn", "btn-danger", "mb-1", "ml-1");
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
    removeBtn.onclick = () => this.removeTodo(todo.id);
    row.children[3].appendChild(removeBtn);
  }
}
