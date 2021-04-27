const express = require("express");

//Express server
const app = express();

//Routes
app.get("/", (req, res) => {
    res.json({ok: true});
});

//Listening request
app.listen(3001, () => {
    console.log(`Server running on port ${4000}`);
});
