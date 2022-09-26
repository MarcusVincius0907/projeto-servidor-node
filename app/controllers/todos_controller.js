const express = require("express")
const router = express.Router()
const database = require("../repositories/database")

router.get("/index", function (req, res) {
  let allTasks = database.getTodos()
  res.json(allTasks)
})

router.post("/", function (req, res) {
  database.createTodo(req.params)
  res.json("adicionado com sucesso!!")
})

module.exports = router
