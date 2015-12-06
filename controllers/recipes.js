var Recipe = require('../models/recipe');
var paginate = require('express-paginate');

module.exports.controller = function(app) {
    /**
     * a root route
     */
    /*app.get("/", function(req, res) {
      var number = req.query.number;
      var helloWorldArray = generator.generateHelloWorlds(number);

      res.status(200).send(helloWorldArray);
    });*/
    app.get('/', function(req, res, next) {
        res.redirect('/recipes');
    });

    /**
    * a home page route
    */
    app.get('/recipes', function(req, res, next) {
        var options = {
            'page': parseInt(req.query.page, 10),
            'stub': req.query.stub || false
        };

        Recipe.paginate(options, function(err, recipes, pageCount, itemCount) {
            if (err) return next(err);

            res = injectDebugData(req, res);

            res.format({
                html: function() {
                    res.render('recipes/list', {
                        recipes: recipes,
                        pageCount: pageCount,
                        itemCount: itemCount,
                        pages: paginate.getArrayPages(req)(3, pageCount, options.page)
                    });
                },
                json: function() {
                    res.json({
                        object: 'list',
                        has_more: paginate.hasNextPages(req)(pageCount),
                        data: recipes
                    });
                }
            });
        });
    });

    app.get('/api/recipes', function(req, res, next) {
        var options = {
            'page': parseInt(req.query.page, 10),
            'stub': req.query.stub || false
        };

        Recipe.paginate(options, function(err, recipes, pageCount, itemCount) {
            if (err) return next(err);

            res = injectDebugData(req, res);

            res.format({
                json: function() {
                    res.json({
                        object: 'list',
                        has_more: paginate.hasNextPages(req)(pageCount),
                        data: recipes
                    });
                }
            });
        });
    });

    /**
    * single recipes
    */
    app.get('/recipes/:recipename', function(req, res, next) {
        var recipeName = req.params.recipename,
            recipeData = Recipe.getByName(recipeName);

        res = injectDebugData(req, res);

        if(isEmpty(recipeData)) {
            res.status(404).render('recipes/404.jade', {title: '404: File Not Found'});
        } else {
            res.render('recipes/detail', {recipe: recipeData});
        }
    });


    app.use(function(req, res) {
        res = injectDebugData(req, res);
        res.status(404);
        res.render('404.jade', {title: '404: File Not Found'});
    });

    function isEmpty(object) {
      return Object.getOwnPropertyNames(object).length === 0;
    }

    function isInDebugMode(req) {
        return req.query.debug === "true";
    }

    function injectDebugData(req, res) {
        if(isInDebugMode(req)) {
            res.locals.debug = true;
        }

        return res;
    }
}