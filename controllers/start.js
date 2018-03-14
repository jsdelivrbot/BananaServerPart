exports.Index = function (request, response) {
    console.log("STARTES");
    response.render('index');
};

exports.Start = function (request, response) {
    response.render('start');
};
