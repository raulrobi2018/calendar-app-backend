//No es necesario esta importación. Se hace para que funcione
//la ayuda de código
const {response} = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
    const events = await Event.f;
    res.json({ok: true, events});
};

//También aquí el " = response " se hace para que funcione
//la ayuda de código
const createEvent = async (req, res = response) => {
    console.log("create event");
    try {
        const event = new Event(req.body);

        //Tomo el uid que se setea al hacer el login
        event.user = req.uid;

        //Guarda en base de datos de Mongo
        //De acuerdo al modelo definido para Event, Mongoose ya sabe cuales son los
        //valores para los campos a grabar tomándoloes del req.body enviados en la petición
        const eventSaved = await event.save();

        res.status(201).json({ok: true, event});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Please contact the administrator"
        });
    }
};

const updateEvent = async (req, res = response) => {
    const values = req.body;

    try {
        const event = new Event({
            ...req.body
        });

        await event.update();
        res.status(201).json({ok: true, event});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Please contact the administrator"
        });
    }
};

const deleteEvent = async (req, res = response) => {
    const values = req.body;

    try {
        const event = new Event({
            ...req.body
        });

        await event.delete();
        res.status(201).json({ok: true, event});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Please contact the administrator"
        });
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};
