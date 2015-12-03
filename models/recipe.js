var data = require('../data/stub') || {};

exports.getAll = function() {
    return data.list || [];
}

exports.getByName = function(recipeName) {
    return data.individual[recipeName] || {};
}