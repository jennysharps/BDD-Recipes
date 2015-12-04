var data = require('../data/stub') || {};

exports.getAll = function(stub) {
    var allData = data.list || [];

    if(!stub) {
        return allData;
    }

    stub = parseInt(stub, 10);
    stub = stub > 300 ? 300 : stub;

    var stubAmount = allData.length - stub,
        newData = allData;

    if(stubAmount > 0) {
        for(x = 0; x < stubAmount; x++) {
            newData.push(allData[x]);
        }
    } else {
        newData.splice(0, stub);
    }

    return newData;
}

exports.getByName = function(recipeName) {
    return data.individual[recipeName] || {};
}

exports.paginate = function(options, callback) {
    var pageNumber = options.page || 1;
    var resultsPerPage = options.limit || 10;
    var stub = options.stub || false;

    var allData = exports.getAll(stub);

    var skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;
    var newData = allData.slice(skipFrom, skipFrom + resultsPerPage);

    callback(null, newData, Math.ceil(allData.length / resultsPerPage) || 1, newData.length);
} 