var World;

module.exports.World = World = function(callback) {
    var recipe = require('../../models/recipe');
  
    this.getAll = function(stubAmount) {
        return recipe.getAll(stubAmount);
    };

    this.getByName = function(name) {
        return recipe.getByName(name);
    };

    this.paginate = function(options, callback) {
        return this.paginate(options, callback);
    };

    callback();
};