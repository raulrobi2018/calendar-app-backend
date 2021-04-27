const {Router} = require("express");
const router = Router();
const {createUser, loginUser, renewToken} = require("../controlers/auth");

/*
    Users/Auth routes:
    host + /api/auth
*/

router.post("/new", createUser);

router.post("/", loginUser);

router.post("/renew", renewToken);

module.exports = router;
