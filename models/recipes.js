var Recipes;

Recipes = (function() {
  Recipes.prototype._currentRecipes =  [];

  function Recipes() {
    return;
  }

  Recipes.prototype.clearRecipes = function() {
    this._currentRecipes = [];
  };

  Recipes.prototype.addRecipe = function(recipe) {
    this._currentRecipes.push(recipe);
  };

  return Recipes;

})();

module.exports = Recipes;