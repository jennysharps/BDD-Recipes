define(['exports', 'utils/requirejs'], function(exports, requireJsUtils) {
	requireModules();

	function requireModules() {
		var modulesToLoad = getRequireModulesToLoad();
		requireItems(modulesToLoad);
	}

	function getRequireModulesToLoad() {
		var moduleDataAttr = 'data-require-module',
			modulesToLoadEls = document.querySelectorAll('[' + moduleDataAttr + ']'),
			modulesToLoad = [];

		for(x = 0; x < modulesToLoadEls.length; x++) {
			var moduleEl = modulesToLoadEls[x],
				moduleName = moduleEl.getAttribute(moduleDataAttr);


			if(moduleName) {
				moduleEl.removeAttribute(moduleDataAttr);

				modulesToLoad.push({
					context: moduleEl,
					name: 'modules/' + moduleName
				});
			}
		}

		return modulesToLoad;
	}

	function requireItems(itemsToReqire) {
		if(!itemsToReqire.length) {
			return;
		}

		for(x = 0; x < itemsToReqire.length; x++) {
			var item = itemsToReqire[x];

			requireJsUtils.loadModule(item.name, item.context);
		}
	}
});
