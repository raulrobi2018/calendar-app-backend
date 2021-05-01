const {Schema, model} = require("mongoose");

const eventSchema = Schema({
    title: {
        type: String,
        // Sets the title as required and a message
        required: [true, "The title is required"]
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        //Esto le dirá a mongoose que va a ser una referencia a otro objeto
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

//Sobreescribe el método toJSON a devolver para quitar propiedades que no
//se deben setear en el request
//El segundo parámetro debe ser un function porque se precisa
//la referencia al this
eventSchema.method("toJSON", function () {
    //this.toObject retorna todo el objeto Event
    //Extrae la versión y el id y lo demás queda almacenado en object
    const {__v, _id, ...object} = this.toObject();

    //Sustituye el nombre de la propiedad _id por id y lo setea al objeto
    object.id = _id;
    return object;
});

module.exports = model("Event", eventSchema);
