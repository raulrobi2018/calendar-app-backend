/*
Events routes:
host + /api/events
*/

const {Router} = require("express");
const router = Router();
const {check} = require("express-validator");
const {validateFields} = require("../middlewares/field-validators");
const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
} = require("../controlers/events");
const {validateJWT} = require("../middlewares/jwt-validator");
const {isDate} = require("../helpers/customValidators");

//Todas pasan por el validateJWT
//Cualquier petición de aquí para abajo tendrá que tener el token
//Si se pone alguna arriba no tiene que validar
router.use(validateJWT);

router.get("/", getEvents);

//Creates a new event
router.post(
    "/",
    [
        //middlewares

        //El name es obligatorio y no debe estar vacío
        check("title", "The title is required").not().isEmpty(),
        check("start", "The start date is required").not().isDate(),
        // Otra forma de validar la fecha pero con un validator personalizado
        // check("start", "The start date is required").custom(isDate),
        check("end", "The end date is required").not().isDate(),
        validateFields
    ],
    createEvent
);

router.put(
    "/:id",
    [
        //middlewares
        //El name es obligatorio y no debe estar vacío
        check("title", "The title is required").not().isEmpty(),
        check("start", "The start date is required").not().isDate(),
        // Otra forma de validar la fecha pero con un validator personalizado
        // check("start", "The start date is required").custom(isDate),
        check("end", "The end date is required").not().isDate(),
        validateFields
    ],
    updateEvent
);

router.delete("/:id", deleteEvent);

module.exports = router;
