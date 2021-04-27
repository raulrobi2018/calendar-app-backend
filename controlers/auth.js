//No es necesario esta importación. Se hace para que funcione
//la ayuda de código
const {response} = require("express");

//También aquí el " = response " se hace para que funcione
//la ayuda de código
const createUser = (req, res = response) => {
    const {name, email, password} = req.body;

    // Esta validación es solo a modo de ejemplo para ver el uso
    //de los status del response
    if (name.length < 5) {
        return res.status(400).json({
            ok: false,
            msg: "The username must be greather than 5 letters"
        });
    }

    res.json({ok: true, user: req.body});
};
const loginUser = (req, res) => {
    const {email, password} = req.body;
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
