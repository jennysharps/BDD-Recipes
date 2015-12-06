define(["exports", "libs/list"],function(exports, List) {
    var sortOptions = {
        valueNames: ['cooking-time'],
        searchClass: null
    };

    var searchOptions = {
        valueNames: ['recipe-title', 'ingredients'],
        sortClass: null
    };

    var filterList,
        sortList,
        searchEndTimer,
        listEl;

    function init(context) {
        setRecipeList();
        attachEvents();   
    };
    /* Export this method as it works in conjunction with main.js & requirejs utils;
    if a module exposes its init method, it's called after the module is
    loaded and passed the context of the DOM element calling it */
    exports.init = init;

    function setRecipeList() {
        // TODO Find better list lib for sorting which will interact with apis
        // TODO Implement fuzzy logic for filter
        filterList = new List('recipes', searchOptions);
        sortList = new List('recipes', sortOptions);
    }

    function attachEvents() {
        filterList.on('searchComplete', function(listObj) {
            /*  Add a timer here so the text doesn't keep being cleared
            then added back immediately after every keystroke */
            clearTimeout(searchEndTimer);

            searchEndTimer = setTimeout(function() {  
                if (!listObj.matchingItems.length) {
                    listObj.list.innerHTML = '<li class="fade-in">Sorry, nothing matched your filter term</li>'
                }  
            }, 250);
        });
    }
});