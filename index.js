const express = require("express");
require("dotenv").config();

//Express server
const app = express();

//Public directory
//El use es un middlewere de express
//Un middlewere es una función que se ejecuta en el momento que alguien
//hace una petición al servidor
app.use(express.static("public"));

//Routes
// app.get("/", (req, res) => {
//     res.json({ok: true});
// });

//Listening request
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
