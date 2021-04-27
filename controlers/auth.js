//No es necesario esta importación. Se hace para que funcione
//la ayuda de código
const {response} = require("express");

//También aquí el " = response " se hace para que funcione
//la ayuda de código
const createUser = (req, res = response) => {
    res.json({ok: true});
};
const loginUser = (req, res) => {
    res.json({ok: true, msg: "Login"});
};
const renewToken = (req, res = response) => {
    res.json({ok: true, msg: "Renew token"});
};

module.exports = {
    createUser,
    loginUser,
    renewToken
};
