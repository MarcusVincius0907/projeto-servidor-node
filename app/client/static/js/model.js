export default class Model {
  constructor() {
    this.url = "/todo";
    this.view = null;
   
  }

  setView(view) {
    this.view = view;
  }

  save() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  async getTodo() {
    return await fetch(this.url)
      .then((res) => res.json())
      .then((res) => res);
  }

  findTodo(id) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  toggleCompleted(values) {
    values.completed = !values.completed
    this.editTodo(values.id, values)
  }

  async editTodo(id, values) {
    const resp = await fetch(this.url + `/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ ...values }),
    })
      .then((res) => res.json())
      .then((res) => res);


    return { ...resp.todosList };
  }

  async addTodo(title, description) {
    const resp = await fetch(this.url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ title, description }),
    })
      .then((res) => res.json())
      .then((res) => res);


    return { ...resp.todosList };
  }

  async removeTodo(id) {
    return await fetch(this.url + `/${id}`, {method: 'DELETE'})
      .then((res) => res.json())
      .then((res) => res);
  }
}
