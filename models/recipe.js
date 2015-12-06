var data = require('../data/stub') || {};

exports.getAll = function(stub) {
    var allData = data.list || [];

    for(x = 0; x < allData.length; x++) {
        allData[x].ingredientsStr = allData[x].ingredients.join();
    }

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
        var i = 0,
            stubNumber = 2;

        for(x = 0; x < stubAmount; x++) {
            var dataItem = clone(allData[i]);
            dataItem.name += ' ' + stubNumber;
            newData.push(dataItem);

            if(i === allData.length - 1) {
                i = 0;
                stubNumber++;
            } else {
                i++;
            }
        }
    } else {
        newData = newData.splice(0, stub);
    }

    return newData;
}

exports.getByName = function(recipeName) {
    return data.individual[recipeName] || {};
}

exports.paginate = function(options, callback) {
    var pageNumber = options.page || 1;
    var resultsPerPage = 10;
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