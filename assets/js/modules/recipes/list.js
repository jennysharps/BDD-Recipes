define(["exports", "utils/requirejs"],function(exports, requireUtils) {
    var sortOptions = {
        valueNames: ['cooking-time'],
        searchClass: null
    };

    var searchOptions = {
        valueNames: ['recipe-title'],
        sortClass: null
    };

    var searchList,
        sortList,
        List;

    function init(context) {
        if(!require.defined('libs/list')) {
            require(['libs/list'], function(module) {
                List = module;
                setRecipeList();
            });
        } else {
            List = require('libs/list');
            setRecipeList();
        }        
    };
    exports.init = init;

    function setRecipeList() {
        searchList = new List('recipes', searchOptions);
        sortList = new List('recipes', sortOptions);
    }
});