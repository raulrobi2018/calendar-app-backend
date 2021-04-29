//No es necesario esta importación. Se hace para que funcione
//la ayuda de código
const {response} = require("express");

const User = require("../models/User");

const bcrypt = require("bcryptjs");

//También aquí el " = response " se hace para que funcione
//la ayuda de código
const createUser = async (req, res = response) => {
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email: email});

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "The user already exist"
            });
        }

        user = new User({
            // Envio todas las propiedades del usuario y luego vuelvo a setear el password
            ...req.body,
            // Utiliza 10 número de vueltas para generarla
            password: bcrypt.hashSync(password, 10)
        });
        //Guarda en base de datos de Mongo
        //De acuerdo al modelo definido para User, Mongoose ya sabe cuales son los
        //valores para los campos a grabar tomándoloes del req.body enviados en la petición
        await user.save();

        res.status(201).json({ok: true, uid: user.id, name: user.name});
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
