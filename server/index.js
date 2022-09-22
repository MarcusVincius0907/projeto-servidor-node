const express = require('express');
const cors = require("cors");
const app = express()
const PORT = process.env.PORT || 3000;

app.use("/static", express.static(__dirname +'/client/static'));

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
