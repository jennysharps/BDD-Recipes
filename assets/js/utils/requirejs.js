define(['exports'], function(exports) {
    function loadModule(moduleName, moduleContext, callback) {
        if(!moduleName) {
            return;
        }

        if(!require.defined(moduleName)) {
            require([moduleName], function(loadedModule) {
                callModuleInit(loadedModule, moduleContext);
                if(typeof callback === 'function') {
                    callback();
                }
                return loadedModule;
            });
        } else {
            var loadedModule = require(moduleName);
            callModuleInit(loadedModule, moduleContext);
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