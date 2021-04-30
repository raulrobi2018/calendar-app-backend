//Solo se trae para tener la ayuda del repsonse
const {response} = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
    //x-token header
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No token in the request"
        });
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);

        // Seteo en el body del request estos valores para
        //pasarselos al siguiente middleware
        req.uid = payload.uid;
        req.name = payload.name;
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: "Token not valid"
        });
    }

    next();
};

module.exports = {
    validateJWT
};
