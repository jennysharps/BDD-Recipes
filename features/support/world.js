var World;

module.exports.World = World = function(callback) {
  var Recipes = require('../../models/recipes');
  this.recipes = new Recipes;
  
  this.clearRecipes = function() {
    this.recipes.clearRecipes();
  };

  this.addRecipes = function(recipeItems) {
    for(x = 0 ; x < recipeItems.length; x++) {
      this.recipes.addRecipe(recipeItems[x]);
    }
  };

  callback();
};