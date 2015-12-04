var data = require('../data/stub') || {};

exports.getAll = function(stub) {
    var allData = data.list || [];

    if(!stub) {
        return allData;
    }

    stub = parseInt(stub, 10);
    stub = stub > 300 ? 300 : stub;

    if(stub === 0) {
        return [];
    }

    var stubAmount = stub - allData.length,
        newData = clone(allData);

    if(stubAmount > 0) {
        var i = 0;
        for(x = 0; x < stubAmount; x++) {
            newData.push(allData[i]);

            if(i === allData.length - 1) {
                i = 0;
            } else {
                i++;
            }
        }
    } else {
        console.log(newData);
        console.log(stub);
        newData = newData.splice(0, stub);
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

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}