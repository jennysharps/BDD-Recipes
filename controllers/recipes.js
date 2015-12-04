var express   = require('express');

var app = express();

var Recipe = require('../models/recipe');

module.exports.controller = function(app) {
    /**
     * a root route
     */
    /*app.get("/", function(req, res) {
      var number = req.query.number;
      var helloWorldArray = generator.generateHelloWorlds(number);

      res.status(200).send(helloWorldArray);
    });*/
    app.get('/', function(request, response, next) {
        response.redirect('/recipes');
    });

    /**
    * a home page route
    */
    app.get('/recipes', function(request, response, next) {
        var recipeData = Recipe.getAll();

        response = injectDebugData(request, response);
        response.render('recipes/list', {recipes: Recipe.getAll()})
    });

    /**
    * single recipes
    */
    app.get('/recipes/:recipename', function(request, response, next) {
        var recipeName = request.params.recipename,
            recipeData = Recipe.getByName(recipeName);

        response = injectDebugData(request, response);

        if(isEmpty(recipeData)) {
            response.status(404).render('404.jade', {title: '404: File Not Found'});
        } else {
            response.render('recipes/detail', {recipe: recipeData});
        }
    });

    app.use(function(request, response) {
        response = injectDebugData(request, response);
        response.status(404);
        response.render('404.jade', {title: '404: File Not Found'});
    });

    function isEmpty(object) {
      return Object.getOwnPropertyNames(object).length === 0;
    }

    function isInDebugMode(request) {
        return request.query.debug === "true";
    }

    function injectDebugData(request, response) {
        if(isInDebugMode(request)) {
            response.locals.debug = true;
        }

        return response;
    }
}