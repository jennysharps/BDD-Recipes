define(["exports", "utils/requirejs"],function(exports, requireUtils) {
    var sortOptions = {
        valueNames: ['cooking-time'],
        searchClass: null
    };

    var searchOptions = {
        valueNames: ['recipe-title', 'ingredients'],
        sortClass: null
    };

    var searchList,
        sortList,
        List,
        searchEndTimer;

    function init(context) {
        if(!require.defined('libs/list')) {
            require(['libs/list'], function(module) {
                List = module;
                initRecipeList();
            });
        } else {
            List = require('libs/list');
            initRecipeList();
        }        
    };
    exports.init = init;

    function initRecipeList() {
        setRecipeList();
        addEvents();
    }

    function setRecipeList() {
        searchList = new List('recipes', searchOptions);
        sortList = new List('recipes', sortOptions);
    }

    function addEvents() {
        searchList.on('searchComplete', function(listObj) {
            clearTimeout(searchEndTimer);

            searchEndTimer = setTimeout(function() {  
                if (!listObj.matchingItems.length) {
                    listObj.list.innerHTML = '<li class="fade-in">Sorry, nothing matched your filter term</li>'
                }  
            }, 250);
        });
    }
});