

const weather = require("./weather.js");

//joining the multiple values passed as arguments and replace all spaces with underscores
const query = process.argv.splice(2).join("_").replace(" ","_");
//query: 90201
//query: cleveland_OH
//query: london_England
weather.get(query);