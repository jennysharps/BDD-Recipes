define(['exports'], function(exports) {
    function loadModule(moduleName, moduleContext, callback) {
        if(!moduleName) {
            return;
        }

        /* If a module is not already loaded, load it, then
        call module init in the callback if the module has exposed
        an init method */
        if(!require.defined(moduleName)) {
            require([moduleName], function(loadedModule) {
                callModuleInit(loadedModule, moduleContext);
                /* Optional callback */
                if(typeof callback === 'function') {
                    callback();
                }
                return loadedModule;
            });
        } else {
            /* If a module is already loaded,  call module init
            if the module has exposed an init method */
            var loadedModule = require(moduleName);
            callModuleInit(loadedModule, moduleContext);
            /* Optional callback */
            if(typeof callback === 'function') {
                callback();
            }
            return loadedModule;
        }
    }
    exports.loadModule = loadModule;

    function callModuleInit(module, moduleContext) {
        if(typeof module.init === 'function') {
            module.init(moduleContext);
        }
    }
});