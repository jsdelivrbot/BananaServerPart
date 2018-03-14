
var Start = require('../controllers/start');
module.exports = function (app) {
    app.get('/', Start.Index);

    app.get('/start', Start.Start);
}