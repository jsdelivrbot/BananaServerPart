exports.Index = function (request, response) {
   
    response.render('index', { title: 'Index', message: 'STart!' });
};

exports.Start = function (request, response) {
    response.render('start', { title: 'Index', message: 'STarted!' });
};
