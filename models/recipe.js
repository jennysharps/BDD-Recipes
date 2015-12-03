exports.getAll = function() {
  return require('../data/list');
}

exports.getByName = function(recipeName) {
  return require('../data/' + recipeName);
}