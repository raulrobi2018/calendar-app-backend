const {Router} = require("express");
const {check} = require("express-validator");
const router = Router();
const {validateFields} = require("../middlewares/field-validators");
const {createUser, loginUser, renewToken} = require("../controlers/auth");

/*
    Users/Auth routes:
    host + /api/auth
*/

router.post(
    "/new",
    [
        //middlewares

        //El name es obligatorio y no debe estar vacío
        check("name", "The name is required").not().isEmpty(),
        check("email", "The email is required").isEmail(),
        check(
            "password",
            "The password must be greater than 5 characters"
        ).isLength({
            min: 6
        }),
        validateFields
    ],
    createUser
);

router.post(
    "/",
    [
        //middlewares
        //El email debe ser válido
        check("email", "The email is required").isEmail(),
        check(
            "password",
            "The password must be greater than 5 characters"
        ).isLength({
            min: 6
        }),
        validateFields
    ],
    loginUser
);

router.post("/renew", renewToken);

module.exports = router;
