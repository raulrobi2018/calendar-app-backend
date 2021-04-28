const express = require("express");
const {dbConnection} = require("./database/config");
require("dotenv").config();

//Express server
const app = express();

//DB Connection
dbConnection();

//Public directory
//El use es un middleware de express
//Un middleware es una función que se ejecuta en el momento que alguien
//hace una petición al servidor
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//Todo lo que haya en el archivo auth.js lo va a habilitar
//en la ruta api/auth
app.use("/api/auth", require("./routes/auth"));

//Listening request
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
