//No es necesario esta importación. Se hace para que funcione
//la ayuda de código
const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  try {
    //El populate lo que hace es mostrar la información del atributo 'user'
    //que es un objeto diferente. Y el segundo parámetro le dice que solo quiero
    //traer el atributo 'name' e 'email' del user
    const events = await Event.find({ user: req.uid }).populate(
      "user",
      "name email"
    );
    res.json({ ok: true, events });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator"
    });
  }
};

//También aquí el " = response " se hace para que funcione
//la ayuda de código
const createEvent = async (req, res = response) => {
  try {
    const event = new Event(req.body);

    //Tomo el uid que se setea al hacer el login
    event.user = req.uid;

    //Guarda en base de datos de Mongo
    //De acuerdo al modelo definido para Event, Mongoose ya sabe cuales son los
    //valores para los campos a grabar tomándoloes del req.body enviados en la petición
    const eventSaved = await event.save();

    res.status(201).json({ ok: true, event });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator"
    });
  }
};

const updateEvent = async (req, res = response) => {
  //Este es el id que viene como parámetro en la url
  const id = req.params.id;
  const uid = req.uid;

  try {
    let event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "The event doesn't exist"
      });
    }

    //Los eventos los puede modificar únicamente el usuario que lo creó
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "The user doesn't have privileges to edit this event"
      });
    }

    const eventToUpdate = {
      //Toma los datos del body y le agrega el uid
      ...req.body,
      user: uid
    };

    //Por defecto esta función devuelve el objeto a modificar, para que me
    //devuelva el nuevo objeto actualizado le paso en las opciones "new: true"
    const updatedEvent = await Event.findByIdAndUpdate(id, eventToUpdate, {
      new: true
    });
    res.status(201).json({ ok: true, event: updatedEvent });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator"
    });
  }
};

const deleteEvent = async (req, res = response) => {
  //Este es el id que viene como parámetro en la url
  const id = req.params.id;
  const uid = req.uid;

  try {
    let event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "The event doesn't exist"
      });
    }

    //Los eventos los puede eliminar únicamente el usuario que lo creó
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "The user doesn't have privileges to delete this event"
      });
    }

    await event.delete();
    res.status(201).json({ ok: true, event });
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
