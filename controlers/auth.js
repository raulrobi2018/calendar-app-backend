//No es necesario esta importación. Se hace para que funcione
//la ayuda de código
const {response} = require("express");

const User = require("../models/User");

//También aquí el " = response " se hace para que funcione
//la ayuda de código
const createUser = async (req, res = response) => {
    try {
        const user = new User(req.body);

        //Guarda en base de datos de Mongo
        //De acuerdo al modelo definido para User, Mongoose ya sabe cuales son los
        //valores para los campos a grabar tomándoloes del req.body enviados en la petición
        await user.save();

        res.status(201).json({ok: true, user: req.body});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Please contact the administrator"
        });
    }
};

const loginUser = (req, res) => {
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
