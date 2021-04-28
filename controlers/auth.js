//No es necesario esta importación. Se hace para que funcione
//la ayuda de código
const {response} = require("express");
const {validationResult} = require("express-validator");

//También aquí el " = response " se hace para que funcione
//la ayuda de código
const createUser = (req, res = response) => {
    const {name, email, password} = req.body;

    //Manejo de errores
    const errors = validationResult(req);

    //Si hay errores retorna un json con el detalle de errores
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    res.status(201).json({ok: true, user: req.body});
};

const loginUser = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    res.status(200).json({
        ok: true
    });
};
const renewToken = (req, res = response) => {
    res.json({ok: true, msg: "Renew token"});
};

module.exports = {
    createUser,
    loginUser,
    renewToken
};
