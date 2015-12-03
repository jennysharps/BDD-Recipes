var generator = require('../app/generator');
var express   = require('express');

var app = express();

var Recipes = require('../models/recipe');

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
      app.get('/recipes', function(req, res) {
          // any logic goes here
          res.render('recipes')
      });
}