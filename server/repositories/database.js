const TABLE_NAME = "todos"
const database = new Map()

database.set(TABLE_NAME, [])

exports.getTodos = function getTodos() {
  return database.get(TABLE_NAME)
}

exports.createTodo = function createTodo(params) {
  const { id, taskName, state } = params
  database.set(TABLE_NAME, [...JSON.parse(database.get(TABLE_NAME)), { id, taskName, state}])
}

exports.deleteTodo = function deleteTodo(params) {
  database.get(TABLE_NAME).map(index => index != params && index)
}

exports.updateTodo = function updateTodo(params) {}
