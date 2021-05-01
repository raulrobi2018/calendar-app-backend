const moment = require("moment");

const isDate = (value, {req, localtion, path}) => {
    console.log(value, location, path);

    if (!value) {
        return false;
    }

    const date = moment(value);

    if (date.isValid()) {
        return true;
    } else {
        return false;
    }
};

module.exports = {isDate};
