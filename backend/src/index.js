// importação do express, passando todas as funcionalidades
const express = require("express");
// importar o mongoose
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

// a variável app chamará a função express que fará a "criação de um servidor" que será acessado pelo browser
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

// conectar a app ao mongoose (setar corretamente o User e o Password)
mongoose.connect(
   "mongodb+srv://rmUser:frusciante29@cluster0-1emzm.mongodb.net/test?retryWrites=true&w=majority",
   {
      useNewUrlParser: true
   }
);

// primeiro parâmero: rota raiz ('/')
/* segundo parâmetro: trata-se de um middleware, uma função com dois parâmetros que retorna alguma coisa (uma resposta). 
                      Tradução literal; interceptador de chamada e requisição
app.get("/", (req, res) => {
  return res.send(`Helloo ${req.query.name}`);
});*/

app.use((req, res, next) => {
   req.io = io;
   next();
});

app.use(cors());

app.use(
   "/files",
   express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(require("./routes"));

// para o servidor ser acessado pelo browser, é preciso ouvir uma porta setada na função .listen()
// obs: a maioria das app web usam a porta 80
server.listen(3333);
