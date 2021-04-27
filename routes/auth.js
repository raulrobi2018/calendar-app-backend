const {Router} = require("express");
const router = Router();

/*
    Users/Auth routes:
    host + /api/auth
*/

router.get("/", (req, res) => {
    res.json({ok: true});
});

module.exports = router;
