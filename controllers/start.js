exports.Index = function (request, response) {
    response.send("Play");
   // response.render('index');
};

exports.Start = function (request, response) {
    response.render('start');
};
