//No es necesario esta importación. Se hace para que funcione
//la ayuda de código
const {response} = require("express");
const {validationResult} = require("express-validator");

//También aquí el " = response " se hace para que funcione
//la ayuda de código
//El next se llamará de manera condicional. Cada vez que se lo
//ejecuta, llama al siguiente middleware
const validateFields = (req, res = response, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    //Si no hay ningún error, llama al siguiente middleware
    next();
};

module.exports = {
    validateFields
};
