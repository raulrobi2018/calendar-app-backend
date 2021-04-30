const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        //Payload del jwt
        const payload = {uid, name};

        //Firma del jwt. Le pasa el secret sedd y expira en 2 horas
        jwt.sign(
            payload,
            process.env.SECRET_JWT_SEED,
            {
                expiresIn: "2h"
            },
            // Luego de firmado llama al callback
            //Si hubo error ejecutamos el reject y sino
            //tendremos el token
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el token");
                }

                resolve(token);
            }
        );
    });
};

module.exports = {
    generateJWT
};
