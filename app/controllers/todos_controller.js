const express = require("express")
const router = express.Router()
const database = require("../repositories/database")

let amountId = 0;

let todosList = [];

const todo = {
  id: 0,
  title: 'First Todo',
  description: 'This is the first todo',
  completed: false
}

createTodo(todo)

function generateId(){
  return amountId += 1
}

function createTodo(todo){
  let newTodo = {...todo, id: generateId(), completed: false}
  todosList.push(newTodo)
}

function updateTodo(params, id){
  todosList.forEach((todo,i,arr) => {
    if(todo.id === id)
      arr[i] = { ...params, id}
  });
}

function deleteTodo(id){
  todosList = todosList.filter(todo => todo.id !== id)
}


router.get("/todo", (req, res) => {
  res.status(200).json({status: 'ok', todosList})
})

router.post("/todo", (req, res) => {
  createTodo(req.body)
  res.status(200).json({status: 'ok', todosList})
})

router.put("/todo/:id", (req, res) => {
  updateTodo(req.body, Number(req.params.id))
  res.status(200).json({status: 'ok', todosList})
})

router.delete("/todo/:id", (req, res) => {
  deleteTodo(Number(req.params.id))
  res.status(200).json({status: 'ok', todosList})
})

module.exports = router
