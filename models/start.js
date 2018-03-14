
var Start = require('../controllers/start');
console.log("Playing");
module.exports = function (app) {
    app.get('/', Start.Index);

    app.get('/start', Start.Start);
}