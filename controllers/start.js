exports.Index = function (request, response) {
    response.send("Hello");
    //response.render('index');
};

exports.Start = function (request, response) {
    response.render('start');
};
