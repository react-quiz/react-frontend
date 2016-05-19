/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "c71a00cb44f3a13e4760"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var testsContext = __webpack_require__(1);

	var runnable = testsContext.keys();

	runnable.forEach(testsContext);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./actions/quiz.spec.js": 2,
		"./components/quiz/QuizList.spec.js": 6
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _expect = __webpack_require__(3);

	var _expect2 = _interopRequireDefault(_expect);

	var _ActionTypes = __webpack_require__(4);

	var types = _interopRequireWildcard(_ActionTypes);

	var _quizActions = __webpack_require__(5);

	var actions = _interopRequireWildcard(_quizActions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('quiz actions', function () {
	  it('addQuiz should create ADD_QUIZ action', function () {
	    (0, _expect2.default)(actions.addQuiz({
	      id: 'xyz',
	      title: 'Test Quiz'
	    })).toEqual({
	      type: types.ADD_QUIZ,
	      quiz: {
	        id: 'xyz',
	        title: 'Test Quiz'
	      }
	    });
	  });

	  it('loadQuiz should create LOAD_QUIZ action', function () {
	    (0, _expect2.default)(actions.loadQuiz({
	      id: 'xyz',
	      title: 'Test Quiz'
	    })).toEqual({
	      type: types.LOAD_QUIZ,
	      quizList: {
	        id: 'xyz',
	        title: 'Test Quiz'
	      }
	    });
	  });

	  it('deleteQuiz should create DELETE_QUIZ action', function () {
	    (0, _expect2.default)(actions.deleteQuiz('abc123feg')).toEqual({
	      type: types.DELETE_QUIZ,
	      id: 'abc123feg'
	    });
	  });
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("expect");

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ADD_QUIZ = exports.ADD_QUIZ = 'ADD_QUIZ';
	var LOAD_QUIZ = exports.LOAD_QUIZ = 'LOAD_QUIZ';
	var DELETE_QUIZ = exports.DELETE_QUIZ = 'DELETE_QUIZ';

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addQuiz = addQuiz;
	exports.loadQuiz = loadQuiz;
	exports.deleteQuiz = deleteQuiz;

	var _ActionTypes = __webpack_require__(4);

	var types = _interopRequireWildcard(_ActionTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function addQuiz(quiz) {
	    return {
	        type: types.ADD_QUIZ,
	        quiz: quiz
	    };
	}

	function loadQuiz(quizList) {
	    return {
	        type: types.LOAD_QUIZ,
	        quizList: quizList
	    };
	}

	function deleteQuiz(id) {
	    return {
	        type: types.DELETE_QUIZ,
	        id: id
	    };
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _expect = __webpack_require__(3);

	var _expect2 = _interopRequireDefault(_expect);

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactAddonsTestUtils = __webpack_require__(8);

	var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

	var _quiz = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var pathAlias = __webpack_require__(30);

	//setup alias:
	pathAlias.setAlias('react-toolbox', path.resolve(__dirname, './../../../node_modules/react-toolbox/lib/'));

	//require module:

	function setup() {
	  var props = {};

	  var renderer = _reactAddonsTestUtils2.default.createRenderer();

	  renderer.render(_react2.default.createElement(_quiz.QuizList, props));

	  var output = renderer.getRenderOutput();

	  return {
	    props: props,
	    output: output,
	    renderer: renderer
	  };
	}

	describe('components', function () {
	  describe('QuizList', function () {
	    it('initial render', function () {
	      var _setup = setup();

	      var output = _setup.output;


	      console.log(output);
	    });
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react-addons-test-utils");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.QuizListItem = exports.QuizList = exports.QuizForm = undefined;

	var _QuizForm = __webpack_require__(10);

	var _QuizForm2 = _interopRequireDefault(_QuizForm);

	var _QuizList = __webpack_require__(26);

	var _QuizList2 = _interopRequireDefault(_QuizList);

	var _QuizListItem = __webpack_require__(28);

	var _QuizListItem2 = _interopRequireDefault(_QuizListItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.QuizForm = _QuizForm2.default;
	exports.QuizList = _QuizList2.default;
	exports.QuizListItem = _QuizListItem2.default;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redboxReact2 = __webpack_require__(12);

	var _redboxReact3 = _interopRequireDefault(_redboxReact2);

	var _reactTransformCatchErrors3 = __webpack_require__(13);

	var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

	var _react2 = __webpack_require__(7);

	var _react3 = _interopRequireDefault(_react2);

	var _reactTransformHmr3 = __webpack_require__(14);

	var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _input = __webpack_require__(15);

	var _input2 = _interopRequireDefault(_input);

	var _button = __webpack_require__(16);

	var _reactRedux = __webpack_require__(17);

	var _redux = __webpack_require__(18);

	var _quizActions = __webpack_require__(5);

	var QuizActions = _interopRequireWildcard(_quizActions);

	var _config = __webpack_require__(19);

	var CONFIG = _interopRequireWildcard(_config);

	var _reduxApi = __webpack_require__(20);

	var _reduxApi2 = _interopRequireDefault(_reduxApi);

	var _rest = __webpack_require__(21);

	var _rest2 = _interopRequireDefault(_rest);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _components = {
	  QuizForm: {
	    displayName: 'QuizForm'
	  }
	};

	var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
	  filename: '/var/www/quiz/react-redux/src/components/quiz/QuizForm.js',
	  components: _components,
	  locals: [module],
	  imports: [_react3.default]
	});

	var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
	  filename: '/var/www/quiz/react-redux/src/components/quiz/QuizForm.js',
	  components: _components,
	  locals: [],
	  imports: [_react3.default, _redboxReact3.default]
	});

	function _wrapComponent(id) {
	  return function (Component) {
	    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
	  };
	}

	var QuizForm = _wrapComponent('QuizForm')(function (_React$Component) {
	  _inherits(QuizForm, _React$Component);

	  function QuizForm(props, context) {
	    _classCallCheck(this, QuizForm);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(QuizForm).call(this, props, context));

	    _this.state = {
	      title: ''
	    };

	    _this.handleChange = function (name, value) {
	      _this.setState(_extends({}, _this.state, _defineProperty({}, name, value)));
	    };

	    _this.handleSubmit = function (e) {
	      _this.props.post(null, {
	        body: JSON.stringify({
	          title: _this.state.title
	        }),
	        headers: {
	          "Content-Type": 'application/json'
	        }
	      }, function (err, data) {
	        if (!err) {
	          _this.props.actions.addQuiz(data);

	          // clear form
	          _this.setState({ title: '' });
	        } else {
	          console.log(err);
	        }
	      });
	    };

	    _this.handleKeyDown = function (e) {
	      if (e.which === 13) {
	        _this.handleSubmit(e);
	      }
	    };

	    return _this;
	  }

	  _createClass(QuizForm, [{
	    key: 'render',
	    value: function render() {
	      return _react3.default.createElement(
	        'section',
	        null,
	        _react3.default.createElement(_input2.default, { type: 'text',
	          label: 'Quiz Title',
	          name: 'title',
	          onKeyDown: this.handleKeyDown.bind(this),
	          value: this.state.title,
	          onChange: this.handleChange.bind(this, 'title'),
	          maxLength: 64 }),
	        _react3.default.createElement(_button.Button, { icon: 'add', label: 'Add this', flat: true, primary: true, onClick: this.handleSubmit.bind(this) })
	      );
	    }
	  }]);

	  return QuizForm;
	}(_react3.default.Component));

	function select(state) {
	  return {
	    quiz: state.quiz
	  };
	}

	function bindDispatchToProps(dispatch) {
	  return {
	    post: (0, _redux.bindActionCreators)(_rest2.default.actions.apiQuiz.post, dispatch),
	    actions: (0, _redux.bindActionCreators)(QuizActions, dispatch)
	  };
	}

	exports.default = (0, _reactRedux.connect)(select, bindDispatchToProps)(QuizForm);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)(module)))

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("redbox-react");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("react-transform-catch-errors");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("react-transform-hmr");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("react-toolbox/input");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("react-toolbox/button");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var API_URL = exports.API_URL = 'http://localhost:9091';

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("redux-api");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(22);

	var _reduxApi = __webpack_require__(20);

	var _reduxApi2 = _interopRequireDefault(_reduxApi);

	var _fetch = __webpack_require__(23);

	var _fetch2 = _interopRequireDefault(_fetch);

	var _map = __webpack_require__(24);

	var _map2 = _interopRequireDefault(_map);

	var _config = __webpack_require__(19);

	var CONFIG = _interopRequireWildcard(_config);

	var _immutable = __webpack_require__(25);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _reduxApi2.default)({
	  // simple edpoint description
	  allQuiz: {
	    url: CONFIG.API_URL + "/quiz",
	    options: {
	      header: {
	        "Accept": "application/json"
	      }
	    }
	  },
	  apiQuiz: {
	    url: CONFIG.API_URL + "/quiz/:id",
	    crud: true
	  }
	}).use("fetch", (0, _fetch2.default)(fetch)); // it's necessary to point using REST backend

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("redux-api/lib/adapters/fetch");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("lodash/map");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redboxReact2 = __webpack_require__(12);

	var _redboxReact3 = _interopRequireDefault(_redboxReact2);

	var _reactTransformCatchErrors3 = __webpack_require__(13);

	var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

	var _react2 = __webpack_require__(7);

	var _react3 = _interopRequireDefault(_react2);

	var _reactTransformHmr3 = __webpack_require__(14);

	var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _list = __webpack_require__(27);

	var _reactRedux = __webpack_require__(17);

	var _QuizListItem = __webpack_require__(28);

	var _QuizListItem2 = _interopRequireDefault(_QuizListItem);

	var _immutable = __webpack_require__(25);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _reduxApi = __webpack_require__(20);

	var _reduxApi2 = _interopRequireDefault(_reduxApi);

	var _rest = __webpack_require__(21);

	var _rest2 = _interopRequireDefault(_rest);

	var _redux = __webpack_require__(18);

	var _quizActions = __webpack_require__(5);

	var QuizActions = _interopRequireWildcard(_quizActions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _components = {
	  QuizList: {
	    displayName: 'QuizList'
	  }
	};

	var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
	  filename: '/var/www/quiz/react-redux/src/components/quiz/QuizList.js',
	  components: _components,
	  locals: [module],
	  imports: [_react3.default]
	});

	var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
	  filename: '/var/www/quiz/react-redux/src/components/quiz/QuizList.js',
	  components: _components,
	  locals: [],
	  imports: [_react3.default, _redboxReact3.default]
	});

	function _wrapComponent(id) {
	  return function (Component) {
	    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
	  };
	}

	var QuizList = _wrapComponent('QuizList')(function (_React$Component) {
	  _inherits(QuizList, _React$Component);

	  function QuizList(props, context) {
	    _classCallCheck(this, QuizList);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(QuizList).call(this, props, context));

	    _this.state = {
	      quizList: _this.props.quizList,
	      quiz: _this.props.quiz
	    };

	    _this.props.onLoad(_this.props.quizList);
	    return _this;
	  }

	  _createClass(QuizList, [{
	    key: 'render',
	    value: function render() {
	      return _react3.default.createElement(
	        'section',
	        null,
	        _react3.default.createElement(
	          _list.List,
	          { selectable: true, ripple: true },
	          this.props.quiz.toArray().map(function (quiz) {
	            return _react3.default.createElement(_QuizListItem2.default, { key: quiz.get('_id'),
	              data: quiz });
	          })
	        )
	      );
	    }
	  }]);

	  return QuizList;
	}(_react3.default.Component));

	exports.default = QuizList;


	function select(state) {
	  if (state.allQuiz.sync) {
	    var _ret = function () {
	      var quizList = _immutable2.default.List.of();
	      state.allQuiz.data.data.map(function (quiz) {
	        quizList = quizList.push(_immutable2.default.Map(quiz));
	      });

	      return {
	        v: {
	          quizList: quizList,
	          quiz: state.quiz
	        }
	      };
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	}
	exports.default = (0, _reactRedux.connect)(select)(QuizList);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)(module)))

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("react-toolbox/list");

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redboxReact2 = __webpack_require__(12);

	var _redboxReact3 = _interopRequireDefault(_redboxReact2);

	var _reactTransformCatchErrors3 = __webpack_require__(13);

	var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

	var _react2 = __webpack_require__(7);

	var _react3 = _interopRequireDefault(_react2);

	var _reactTransformHmr3 = __webpack_require__(14);

	var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _list = __webpack_require__(27);

	var _font_icon = __webpack_require__(29);

	var _font_icon2 = _interopRequireDefault(_font_icon);

	var _button = __webpack_require__(16);

	var _redux = __webpack_require__(18);

	var _reactRedux = __webpack_require__(17);

	var _rest = __webpack_require__(21);

	var _rest2 = _interopRequireDefault(_rest);

	var _quizActions = __webpack_require__(5);

	var QuizActions = _interopRequireWildcard(_quizActions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _components = {
	  QuizListItem: {
	    displayName: 'QuizListItem'
	  }
	};

	var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
	  filename: '/var/www/quiz/react-redux/src/components/quiz/QuizListItem.js',
	  components: _components,
	  locals: [module],
	  imports: [_react3.default]
	});

	var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
	  filename: '/var/www/quiz/react-redux/src/components/quiz/QuizListItem.js',
	  components: _components,
	  locals: [],
	  imports: [_react3.default, _redboxReact3.default]
	});

	function _wrapComponent(id) {
	  return function (Component) {
	    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
	  };
	}

	var QuizListItem = _wrapComponent('QuizListItem')(function (_React$Component) {
	  _inherits(QuizListItem, _React$Component);

	  function QuizListItem(props, context) {
	    _classCallCheck(this, QuizListItem);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(QuizListItem).call(this, props, context));

	    _this.state = _this.props.data;
	    return _this;
	  }

	  _createClass(QuizListItem, [{
	    key: 'handleDelete',
	    value: function handleDelete() {
	      var _this2 = this;

	      var id = this.state.get('_id');
	      this.props.delete({ id: id }, null, function (err, data) {
	        if (!err) {
	          _this2.props.actions.deleteQuiz(_this2.state.get('_id'));
	        } else {
	          console.log(err);
	          // TODO: Do something if post fail
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var rightActions = [_react3.default.createElement(_button.IconButton, { icon: 'clear', onClick: this.handleDelete.bind(this), accent: true, key: 'Button' })];
	      return _react3.default.createElement(_list.ListItem, {
	        caption: this.state.get('title'),
	        rightActions: rightActions });
	    }
	  }]);

	  return QuizListItem;
	}(_react3.default.Component));

	function select(state) {
	  return {
	    quiz: state.quiz
	  };
	}

	function bindDispatchToProps(dispatch) {
	  return {
	    delete: (0, _redux.bindActionCreators)(_rest2.default.actions.apiQuiz.delete, dispatch),
	    actions: (0, _redux.bindActionCreators)(QuizActions, dispatch)
	  };
	}

	exports.default = (0, _reactRedux.connect)(select, bindDispatchToProps)(QuizListItem);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)(module)))

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("react-toolbox/font_icon");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("path-alias");

/***/ }
/******/ ]);