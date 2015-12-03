var generator = require('../app/generator');
var express   = require('express');

var app = express();

var Recipe = require('../models/recipe');

module.exports.controller = function(app) {
    /**
     * a root route
     */
    app.get("/", function(req, res) {
      var number = req.query.number;
      var helloWorldArray = generator.generateHelloWorlds(number);

      res.status(200).send(helloWorldArray);
    });

    /**
     * a home page route
     */
      app.get('/recipes', function(request, response) {
            response.render('recipes/recipes', {recipes: Recipe.getAll()})
      });

      /**
     * single recipes
     */
      app.get('/recipes/:recipename', function(request, response) {
            var recipeName = request.params.recipename,
                recipeData = Recipe.getByName(recipeName);
                
          response.render('recipes/recipe', {recipe: recipeData});
      });
}