const {Schema, model} = require("mongoose");

const userSchema = Schema({
    name: {
        type: String,
        // Sets the name as required and a message
        required: [true, "The name is required"]
    },
    email: {
        type: String,
        required: [true, "The e-mail is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "The password is required"]
    }
});

module.exports = model("User", userSchema);
