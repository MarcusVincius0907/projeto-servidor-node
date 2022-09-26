const express = require('express');
const cors = require("cors");
const app = express()
const todosController = require("./controllers/todos_controller")
const PORT = process.env.PORT || 3000;

app.use("/static", express.static(__dirname +'/client/static'));

app.get("/health-check", function (req, res) {
  res.json("Oi, está tudo ok!!!")
})
app.use(todosController)

app.listen(PORT, () => {
  console.log(`o servidor está de pé em: http://localhost:${PORT}`)
})

//parar poder receber arquivos json
app.use(express.json());

//habilitando cors
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/client/index.html')
})
