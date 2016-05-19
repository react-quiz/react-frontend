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
/******/ 	var hotCurrentHash = "735ee28589fb5f5082cd"; // eslint-disable-line no-unused-vars
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
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzM1ZWUyODU4OWZiNWY1MDgyY2QiLCJ3ZWJwYWNrOi8vLy4vZTUzMWZhNmYwZjlhMDY5NjU0ZWExN2MyZDI1N2NiNjYtZW50cnkuanMiLCJ3ZWJwYWNrOi8vLy92YXIvd3d3L3F1aXovcmVhY3QtcmVkdXgvc3JjL3Rlc3Qgb2JqZWN0IE9iamVjdCIsIndlYnBhY2s6Ly8vL3Zhci93d3cvcXVpei9yZWFjdC1yZWR1eC9zcmMvdGVzdC9hY3Rpb25zL3F1aXouc3BlYy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHBlY3RcIiIsIndlYnBhY2s6Ly8vL3Zhci93d3cvcXVpei9yZWFjdC1yZWR1eC9zcmMvY29uc3RhbnRzL0FjdGlvblR5cGVzLmpzIiwid2VicGFjazovLy8vdmFyL3d3dy9xdWl6L3JlYWN0LXJlZHV4L3NyYy9hY3Rpb25zL3F1aXotYWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vL3Zhci93d3cvcXVpei9yZWFjdC1yZWR1eC9zcmMvdGVzdC9jb21wb25lbnRzL3F1aXovUXVpekxpc3Quc3BlYy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWFkZG9ucy10ZXN0LXV0aWxzXCIiLCJ3ZWJwYWNrOi8vLy92YXIvd3d3L3F1aXovcmVhY3QtcmVkdXgvc3JjL2NvbXBvbmVudHMvcXVpei9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL3Zhci93d3cvcXVpei9yZWFjdC1yZWR1eC9zcmMvY29tcG9uZW50cy9xdWl6L1F1aXpGb3JtLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkYm94LXJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtdHJhbnNmb3JtLWNhdGNoLWVycm9yc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXRyYW5zZm9ybS1obXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC10b29sYm94L2lucHV0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtdG9vbGJveC9idXR0b25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy92YXIvd3d3L3F1aXovcmVhY3QtcmVkdXgvc3JjL2NvbnN0YW50cy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtYXBpXCIiLCJ3ZWJwYWNrOi8vLy92YXIvd3d3L3F1aXovcmVhY3QtcmVkdXgvc3JjL2FwaS9yZXN0LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImlzb21vcnBoaWMtZmV0Y2hcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC1hcGkvbGliL2FkYXB0ZXJzL2ZldGNoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibG9kYXNoL21hcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImltbXV0YWJsZVwiIiwid2VicGFjazovLy8vdmFyL3d3dy9xdWl6L3JlYWN0LXJlZHV4L3NyYy9jb21wb25lbnRzL3F1aXovUXVpekxpc3QuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtdG9vbGJveC9saXN0XCIiLCJ3ZWJwYWNrOi8vLy92YXIvd3d3L3F1aXovcmVhY3QtcmVkdXgvc3JjL2NvbXBvbmVudHMvcXVpei9RdWl6TGlzdEl0ZW0uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtdG9vbGJveC9mb250X2ljb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoLWFsaWFzXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQSxtRUFBMkQ7QUFDM0Q7QUFDQTtBQUNBOztBQUVBLG9EQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrREFBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCO0FBQzNCO0FBQ0EsWUFBSTtBQUNKO0FBQ0EsV0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSxzREFBOEM7QUFDOUM7QUFDQSxxQ0FBNkI7O0FBRTdCLCtDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ04sYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTCxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOENBQXNDO0FBQ3RDO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLGdCQUFnQjtBQUNwQztBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQWlCLDhCQUE4QjtBQUMvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQkFBa0IscUJBQXFCO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBLDREQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsMEJBQWtCLGNBQWM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDRCQUE0QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBa0IsNEJBQTRCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUFtQix1Q0FBdUM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQW1CLHVDQUF1QztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUJBQWlCLHdDQUF3QztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsOENBQXNDLHVCQUF1Qjs7QUFFN0Q7QUFDQTs7Ozs7Ozs7O0FDaGtCSSxLQUFJLGVBQWUsc0JBQW5COztBQUVBLEtBQUksV0FBVyxhQUFhLElBQWIsRUFBZjs7QUFFQSxVQUFTLE9BQVQsQ0FBaUIsWUFBakIsRTs7Ozs7O0FDTEo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFpQyx1REFBdUQ7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ2ZBOzs7O0FBQ0E7O0tBQVksSzs7QUFDWjs7S0FBWSxPOzs7Ozs7QUFFWixVQUFTLGNBQVQsRUFBeUIsWUFBTTtBQUM3QixNQUFHLHVDQUFILEVBQTRDLFlBQU07QUFDaEQsMkJBQU8sUUFBUSxPQUFSLENBQWdCO0FBQ3JCLFdBQUksS0FEaUI7QUFFckIsY0FBTztBQUZjLE1BQWhCLENBQVAsRUFHSSxPQUhKLENBR1k7QUFDVixhQUFNLE1BQU0sUUFERjtBQUVWLGFBQU07QUFDSixhQUFJLEtBREE7QUFFSixnQkFBTztBQUZIO0FBRkksTUFIWjtBQVVELElBWEQ7O0FBYUEsTUFBRyx5Q0FBSCxFQUE4QyxZQUFNO0FBQ2xELDJCQUFPLFFBQVEsUUFBUixDQUFpQjtBQUN0QixXQUFJLEtBRGtCO0FBRXRCLGNBQU87QUFGZSxNQUFqQixDQUFQLEVBR0ksT0FISixDQUdZO0FBQ1YsYUFBTSxNQUFNLFNBREY7QUFFVixpQkFBVTtBQUNSLGFBQUksS0FESTtBQUVSLGdCQUFPO0FBRkM7QUFGQSxNQUhaO0FBVUQsSUFYRDs7QUFhQSxNQUFHLDZDQUFILEVBQWtELFlBQU07QUFDdEQsMkJBQU8sUUFBUSxVQUFSLENBQW1CLFdBQW5CLENBQVAsRUFBd0MsT0FBeEMsQ0FBZ0Q7QUFDOUMsYUFBTSxNQUFNLFdBRGtDO0FBRTlDLFdBQUk7QUFGMEMsTUFBaEQ7QUFJRCxJQUxEO0FBT0QsRUFsQ0QsRTs7Ozs7O0FDSkEsb0M7Ozs7Ozs7Ozs7O0FDQU8sS0FBTSw4QkFBVyxVQUFqQjtBQUNBLEtBQU0sZ0NBQVksV0FBbEI7QUFDQSxLQUFNLG9DQUFjLGFBQXBCLEM7Ozs7Ozs7Ozs7O1NDQVMsTyxHQUFBLE87U0FPQSxRLEdBQUEsUTtTQU9BLFUsR0FBQSxVOztBQWhCaEI7O0tBQVksSzs7OztBQUVMLFVBQVMsT0FBVCxDQUFpQixJQUFqQixFQUF1QjtBQUMxQixZQUFPO0FBQ0wsZUFBTSxNQUFNLFFBRFA7QUFFTDtBQUZLLE1BQVA7QUFJSDs7QUFFTSxVQUFTLFFBQVQsQ0FBa0IsUUFBbEIsRUFBNEI7QUFDL0IsWUFBTztBQUNILGVBQU0sTUFBTSxTQURUO0FBRUg7QUFGRyxNQUFQO0FBSUg7O0FBRU0sVUFBUyxVQUFULENBQW9CLEVBQXBCLEVBQXdCO0FBQzNCLFlBQU87QUFDSCxlQUFNLE1BQU0sV0FEVDtBQUVIO0FBRkcsTUFBUDtBQUlILEU7Ozs7Ozs7O0FDckJEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsS0FBSSxZQUFZLG9CQUFRLEVBQVIsQ0FBaEI7OztBQUdBLFdBQVUsUUFBVixDQUFtQixlQUFuQixFQUFvQyxLQUFLLE9BQUwsQ0FBYSxTQUFiLEVBQXdCLDRDQUF4QixDQUFwQzs7OztBQUlBLFVBQVMsS0FBVCxHQUFpQjtBQUNmLE9BQU0sUUFBUSxFQUFkOztBQUlBLE9BQU0sV0FBVywrQkFBVSxjQUFWLEVBQWpCOztBQUVBLFlBQVMsTUFBVCxDQUNFLDhDQUFjLEtBQWQsQ0FERjs7QUFJQSxPQUFJLFNBQVMsU0FBUyxlQUFULEVBQWI7O0FBRUEsVUFBTztBQUNMLFlBQU8sS0FERjtBQUVMLGFBQVEsTUFGSDtBQUdMLGVBQVU7QUFITCxJQUFQO0FBS0Q7O0FBRUQsVUFBUyxZQUFULEVBQXVCLFlBQU07QUFDM0IsWUFBUyxVQUFULEVBQXFCLFlBQU07QUFDekIsUUFBRyxnQkFBSCxFQUFxQixZQUFNO0FBQUEsb0JBQ04sT0FETTs7QUFBQSxXQUNqQixNQURpQixVQUNqQixNQURpQjs7O0FBR3pCLGVBQVEsR0FBUixDQUFZLE1BQVo7QUFDRCxNQUpEO0FBS0QsSUFORDtBQU9ELEVBUkQsRTs7Ozs7OztBQ2hDQSxtQzs7Ozs7O0FDQUEscUQ7Ozs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztTQUVTLFE7U0FBVSxRO1NBQVUsWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIN0I7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7S0FBWSxXOztBQUVaOztLQUFZLE07O0FBRVo7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0UscUJBQVksS0FBWixFQUFtQixPQUFuQixFQUE0QjtBQUFBOztBQUFBLDZGQUNwQixLQURvQixFQUNiLE9BRGE7O0FBQUEsV0FHNUIsS0FINEIsR0FHcEI7QUFDTixjQUFPO0FBREQsTUFIb0I7O0FBQUEsV0FPNUIsWUFQNEIsR0FPYixVQUFDLElBQUQsRUFBTyxLQUFQLEVBQWlCO0FBQzlCLGFBQUssUUFBTCxjQUFrQixNQUFLLEtBQXZCLHNCQUErQixJQUEvQixFQUFzQyxLQUF0QztBQUNELE1BVDJCOztBQUFBLFdBVzVCLFlBWDRCLEdBV2IsVUFBQyxDQUFELEVBQU87QUFDcEIsYUFBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQixFQUFzQjtBQUNwQixlQUFNLEtBQUssU0FBTCxDQUFlO0FBQ25CLGtCQUFPLE1BQUssS0FBTCxDQUFXO0FBREMsVUFBZixDQURjO0FBSXBCLGtCQUFTO0FBQ1AsMkJBQWdCO0FBRFQ7QUFKVyxRQUF0QixFQU9HLFVBQUMsR0FBRCxFQUFNLElBQU4sRUFBZTtBQUNoQixhQUFJLENBQUMsR0FBTCxFQUFVO0FBQ1IsaUJBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsT0FBbkIsQ0FBMkIsSUFBM0I7OztBQUdBLGlCQUFLLFFBQUwsQ0FBYyxFQUFDLE9BQU8sRUFBUixFQUFkO0FBQ0QsVUFMRCxNQUtPO0FBQ0wsbUJBQVEsR0FBUixDQUFZLEdBQVo7QUFDRDtBQUNGLFFBaEJEO0FBaUJELE1BN0IyQjs7QUFBQSxXQStCNUIsYUEvQjRCLEdBK0JaLFVBQUMsQ0FBRCxFQUFPO0FBQ3JCLFdBQUksRUFBRSxLQUFGLEtBQVksRUFBaEIsRUFBb0I7QUFDbEIsZUFBSyxZQUFMLENBQWtCLENBQWxCO0FBQ0Q7QUFDRixNQW5DMkI7O0FBQUE7QUFFM0I7Ozs7OEJBbUNRO0FBQ1AsY0FDRTtBQUFBO1NBQUE7U0FDRSxpREFBTyxNQUFLLE1BQVo7QUFDRSxrQkFBTSxZQURSO0FBRUUsaUJBQUssT0FGUDtBQUdFLHNCQUFXLEtBQUssYUFBTCxDQUFtQixJQUFuQixDQUF3QixJQUF4QixDQUhiO0FBSUUsa0JBQU8sS0FBSyxLQUFMLENBQVcsS0FKcEI7QUFLRSxxQkFBVSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsRUFBNkIsT0FBN0IsQ0FMWjtBQU1FLHNCQUFXLEVBTmIsR0FERjtTQVFFLGdEQUFRLE1BQUssS0FBYixFQUFtQixPQUFNLFVBQXpCLEVBQW9DLFVBQXBDLEVBQXlDLGFBQXpDLEVBQWlELFNBQVMsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQTFEO0FBUkYsUUFERjtBQVlEOzs7O0dBbkRvQixnQkFBTSxTOztBQXVEN0IsVUFBUyxNQUFULENBQWdCLEtBQWhCLEVBQXVCO0FBQ3JCLFVBQU87QUFDTCxXQUFNLE1BQU07QUFEUCxJQUFQO0FBR0Q7O0FBRUQsVUFBUyxtQkFBVCxDQUE2QixRQUE3QixFQUF1QztBQUNyQyxVQUFPO0FBQ0wsV0FBTSwrQkFBbUIsZUFBSyxPQUFMLENBQWEsT0FBYixDQUFxQixJQUF4QyxFQUE4QyxRQUE5QyxDQUREO0FBRUwsY0FBUywrQkFBbUIsV0FBbkIsRUFBZ0MsUUFBaEM7QUFGSixJQUFQO0FBSUQ7O21CQUVjLHlCQUFRLE1BQVIsRUFBZ0IsbUJBQWhCLEVBQXFDLFFBQXJDLEM7Ozs7Ozs7QUNoRmY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNUQSwwQzs7Ozs7O0FDQUEsMEQ7Ozs7OztBQ0FBLGlEOzs7Ozs7QUNBQSxpRDs7Ozs7O0FDQUEsa0Q7Ozs7OztBQ0FBLHlDOzs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBTyxLQUFNLDRCQUFVLHVCQUFoQixDOzs7Ozs7QUNBUCx1Qzs7Ozs7Ozs7Ozs7O0FDQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0tBQVksTTs7QUFDWjs7Ozs7O21CQUVlLHdCQUFTOztBQUV0QixZQUFTO0FBQ1AsVUFBUSxPQUFPLE9BQWYsVUFETztBQUVQLGNBQVM7QUFDUCxlQUFRO0FBQ04sbUJBQVU7QUFESjtBQUREO0FBRkYsSUFGYTtBQVV0QixZQUFTO0FBQ1AsVUFBUSxPQUFPLE9BQWYsY0FETztBQUVQLFdBQU07QUFGQztBQVZhLEVBQVQsRUFjWixHQWRZLENBY1IsT0FkUSxFQWNDLHFCQUFhLEtBQWIsQ0FkRCxDOzs7Ozs7QUNQZiw4Qzs7Ozs7O0FDQUEsMEQ7Ozs7OztBQ0FBLHdDOzs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztLQUFZLFc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR1YscUJBQVksS0FBWixFQUFtQixPQUFuQixFQUE0QjtBQUFBOztBQUFBLDZGQUNwQixLQURvQixFQUNiLE9BRGE7O0FBRTFCLFdBQUssS0FBTCxHQUFhO0FBQ1gsaUJBQVUsTUFBSyxLQUFMLENBQVcsUUFEVjtBQUVYLGFBQU0sTUFBSyxLQUFMLENBQVc7QUFGTixNQUFiOztBQUtBLFdBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsTUFBSyxLQUFMLENBQVcsUUFBN0I7QUFQMEI7QUFRM0I7Ozs7OEJBRVE7QUFDUCxjQUNFO0FBQUE7U0FBQTtTQUNFO0FBQUE7V0FBQSxFQUFNLGdCQUFOLEVBQWlCLFlBQWpCO1dBQ0csS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixPQUFoQixHQUEwQixHQUExQixDQUE4QjtBQUFBLG9CQUM3Qix3REFBYyxLQUFLLEtBQUssR0FBTCxDQUFTLEtBQVQsQ0FBbkI7QUFDRSxxQkFBTSxJQURSLEdBRDZCO0FBQUEsWUFBOUI7QUFESDtBQURGLFFBREY7QUFVRDs7OztHQXRCbUMsZ0JBQU0sUzs7Ozs7QUF5QjVDLFVBQVMsTUFBVCxDQUFnQixLQUFoQixFQUF1QjtBQUNyQixPQUFJLE1BQU0sT0FBTixDQUFjLElBQWxCLEVBQXdCO0FBQUE7QUFDdEIsV0FBSSxXQUFXLG9CQUFVLElBQVYsQ0FBZSxFQUFmLEVBQWY7QUFDQSxhQUFNLE9BQU4sQ0FBYyxJQUFkLENBQW1CLElBQW5CLENBQXdCLEdBQXhCLENBQTRCLGdCQUFRO0FBQ2xDLG9CQUFXLFNBQVMsSUFBVCxDQUFjLG9CQUFVLEdBQVYsQ0FBYyxJQUFkLENBQWQsQ0FBWDtBQUNELFFBRkQ7O0FBSUE7QUFBQSxZQUFPO0FBQ0wscUJBQVUsUUFETDtBQUVMLGlCQUFNLE1BQU07QUFGUDtBQUFQO0FBTnNCOztBQUFBO0FBVXZCO0FBQ0Y7bUJBQ2MseUJBQVEsTUFBUixFQUFnQixRQUFoQixDOzs7Ozs7O0FDakRmLGdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0tBQVksVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHVix5QkFBWSxLQUFaLEVBQW1CLE9BQW5CLEVBQTRCO0FBQUE7O0FBQUEsaUdBQ3BCLEtBRG9CLEVBQ2IsT0FEYTs7QUFHMUIsV0FBSyxLQUFMLEdBQWEsTUFBSyxLQUFMLENBQVcsSUFBeEI7QUFIMEI7QUFJM0I7Ozs7b0NBRWM7QUFBQTs7QUFDYixXQUFJLEtBQUssS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEtBQWYsQ0FBVDtBQUNBLFlBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsRUFBQyxJQUFJLEVBQUwsRUFBbEIsRUFBNEIsSUFBNUIsRUFBa0MsVUFBQyxHQUFELEVBQU0sSUFBTixFQUFlO0FBQy9DLGFBQUksQ0FBQyxHQUFMLEVBQVU7QUFDUixrQkFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixVQUFuQixDQUE4QixPQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsS0FBZixDQUE5QjtBQUNELFVBRkQsTUFFTztBQUNMLG1CQUFRLEdBQVIsQ0FBWSxHQUFaOztBQUVEO0FBQ0YsUUFQRDtBQVNEOzs7OEJBQ1E7QUFDUCxXQUFJLGVBQWUsQ0FDakIsb0RBQVksTUFBSyxPQUFqQixFQUF5QixTQUFTLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixJQUF2QixDQUFsQyxFQUFnRSxZQUFoRSxFQUF3RSxLQUFJLFFBQTVFLEdBRGlCLENBQW5CO0FBR0EsY0FDRTtBQUNBLGtCQUFTLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxPQUFmLENBRFQ7QUFFQSx1QkFBYyxZQUZkLEdBREY7QUFNRDs7OztHQTdCd0IsZ0JBQU0sUzs7QUFnQ2pDLFVBQVMsTUFBVCxDQUFnQixLQUFoQixFQUF1QjtBQUNyQixVQUFPO0FBQ0wsV0FBTSxNQUFNO0FBRFAsSUFBUDtBQUdEOztBQUdELFVBQVMsbUJBQVQsQ0FBNkIsUUFBN0IsRUFBdUM7QUFDckMsVUFBTztBQUNMLGFBQVEsK0JBQW1CLGVBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsTUFBeEMsRUFBZ0QsUUFBaEQsQ0FESDtBQUVMLGNBQVMsK0JBQW1CLFdBQW5CLEVBQWdDLFFBQWhDO0FBRkosSUFBUDtBQUlEOzttQkFFYyx5QkFBUSxNQUFSLEVBQWdCLG1CQUFoQixFQUFxQyxZQUFyQyxDOzs7Ozs7O0FDdkRmLHFEOzs7Ozs7QUNBQSx3QyIsImZpbGUiOiJlNTMxZmE2ZjBmOWEwNjk2NTRlYTE3YzJkMjU3Y2I2Ni1vdXRwdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB0aGlzW1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gXHJcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xyXG4gXHRcdGlmKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XHJcbiBcdFx0c2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xyXG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xyXG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XHJcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KGNhbGxiYWNrKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRpZih0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcclxuIFx0XHR0cnkge1xyXG4gXHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuIFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xyXG4gXHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcclxuIFx0XHRcdHJlcXVlc3QudGltZW91dCA9IDEwMDAwO1xyXG4gXHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xyXG4gXHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2soZXJyKTtcclxuIFx0XHR9XHJcbiBcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuIFx0XHRcdGlmKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xyXG4gXHRcdFx0aWYocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcclxuIFx0XHRcdFx0Ly8gdGltZW91dFxyXG4gXHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpKTtcclxuIFx0XHRcdH0gZWxzZSBpZihyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XHJcbiBcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcclxuIFx0XHRcdFx0Y2FsbGJhY2soKTtcclxuIFx0XHRcdH0gZWxzZSBpZihyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcclxuIFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxyXG4gXHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcclxuIFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdC8vIHN1Y2Nlc3NcclxuIFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XHJcbiBcdFx0XHRcdH0gY2F0Y2goZSkge1xyXG4gXHRcdFx0XHRcdGNhbGxiYWNrKGUpO1xyXG4gXHRcdFx0XHRcdHJldHVybjtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRjYWxsYmFjayhudWxsLCB1cGRhdGUpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH07XHJcbiBcdH1cclxuXG4gXHRcclxuIFx0XHJcbiBcdC8vIENvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9ibG9iL2JlZjQ1YjAvc3JjL3NoYXJlZC91dGlscy9jYW5EZWZpbmVQcm9wZXJ0eS5qc1xyXG4gXHR2YXIgY2FuRGVmaW5lUHJvcGVydHkgPSBmYWxzZTtcclxuIFx0dHJ5IHtcclxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIFwieFwiLCB7XHJcbiBcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge31cclxuIFx0XHR9KTtcclxuIFx0XHRjYW5EZWZpbmVQcm9wZXJ0eSA9IHRydWU7XHJcbiBcdH0gY2F0Y2goeCkge1xyXG4gXHRcdC8vIElFIHdpbGwgZmFpbCBvbiBkZWZpbmVQcm9wZXJ0eVxyXG4gXHR9XHJcbiBcdFxyXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XHJcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiNzM1ZWUyODU4OWZiNWY1MDgyY2RcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcclxuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdGlmKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XHJcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xyXG4gXHRcdFx0aWYobWUuaG90LmFjdGl2ZSkge1xyXG4gXHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XHJcbiBcdFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpIDwgMClcclxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0XHRpZihtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpIDwgMClcclxuIFx0XHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XHJcbiBcdFx0XHRcdH0gZWxzZSBob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XHJcbiBcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXF1ZXN0ICsgXCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICsgbW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XHJcbiBcdFx0fTtcclxuIFx0XHRmb3IodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpKSB7XHJcbiBcdFx0XHRcdGlmKGNhbkRlZmluZVByb3BlcnR5KSB7XHJcbiBcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCAoZnVuY3Rpb24obmFtZSkge1xyXG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xyXG4gXHRcdFx0XHRcdFx0XHR9LFxyXG4gXHRcdFx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiBcdFx0XHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xyXG4gXHRcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHRcdH0obmFtZSkpKTtcclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHRmbltuYW1lXSA9IF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdGZ1bmN0aW9uIGVuc3VyZShjaHVua0lkLCBjYWxsYmFjaykge1xyXG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInJlYWR5XCIpXHJcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XHJcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XHJcbiBcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCwgZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0Y2FsbGJhY2suY2FsbChudWxsLCBmbik7XHJcbiBcdFx0XHRcdH0gZmluYWxseSB7XHJcbiBcdFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHJcbiBcdFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcclxuIFx0XHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XHJcbiBcdFx0XHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xyXG4gXHRcdFx0XHRcdFx0aWYoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xyXG4gXHRcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdGlmKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XHJcbiBcdFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH0pO1xyXG4gXHRcdH1cclxuIFx0XHRpZihjYW5EZWZpbmVQcm9wZXJ0eSkge1xyXG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBcImVcIiwge1xyXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHR2YWx1ZTogZW5zdXJlXHJcbiBcdFx0XHR9KTtcclxuIFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0Zm4uZSA9IGVuc3VyZTtcclxuIFx0XHR9XHJcbiBcdFx0cmV0dXJuIGZuO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBob3QgPSB7XHJcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXHJcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxyXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcclxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxyXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXHJcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcclxuIFx0XHJcbiBcdFx0XHQvLyBNb2R1bGUgQVBJXHJcbiBcdFx0XHRhY3RpdmU6IHRydWUsXHJcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXHJcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrO1xyXG4gXHRcdFx0XHRlbHNlXHJcbiBcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2s7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwibnVtYmVyXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZVxyXG4gXHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcclxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXHJcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXHJcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXHJcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0aWYoIWwpIHJldHVybiBob3RTdGF0dXM7XHJcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdH0sXHJcbiBcdFxyXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXHJcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cclxuIFx0XHR9O1xyXG4gXHRcdHJldHVybiBob3Q7XHJcbiBcdH1cclxuIFx0XHJcbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xyXG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XHJcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xyXG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcclxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcclxuIFx0fVxyXG4gXHRcclxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcclxuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XHJcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcclxuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdEF2YWlsaWJsZUZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3RDYWxsYmFjaztcclxuIFx0XHJcbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xyXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xyXG4gXHRcdHZhciBpc051bWJlciA9ICgraWQpICsgXCJcIiA9PT0gaWQ7XHJcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5LCBjYWxsYmFjaykge1xyXG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xyXG4gXHRcdGlmKHR5cGVvZiBhcHBseSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiBcdFx0XHRob3RBcHBseU9uVXBkYXRlID0gZmFsc2U7XHJcbiBcdFx0XHRjYWxsYmFjayA9IGFwcGx5O1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XHJcbiBcdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKGVycikge1xyXG4gXHRcdFx0XHRpZihlcnIpIHRocm93IGVycjtcclxuIFx0XHRcdH07XHJcbiBcdFx0fVxyXG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xyXG4gXHRcdGhvdERvd25sb2FkTWFuaWZlc3QoZnVuY3Rpb24oZXJyLCB1cGRhdGUpIHtcclxuIFx0XHRcdGlmKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XHJcbiBcdFx0XHRpZighdXBkYXRlKSB7XHJcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XHJcbiBcdFx0XHRcdGNhbGxiYWNrKG51bGwsIG51bGwpO1xyXG4gXHRcdFx0XHRyZXR1cm47XHJcbiBcdFx0XHR9XHJcbiBcdFxyXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGhvdEF2YWlsaWJsZUZpbGVzTWFwID0ge307XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCB1cGRhdGUuYy5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0aG90QXZhaWxpYmxlRmlsZXNNYXBbdXBkYXRlLmNbaV1dID0gdHJ1ZTtcclxuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcclxuIFx0XHJcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xyXG4gXHRcdFx0aG90Q2FsbGJhY2sgPSBjYWxsYmFjaztcclxuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xyXG4gXHRcdFx0dmFyIGNodW5rSWQgPSAwO1xyXG4gXHRcdFx0eyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmUtYmxvY2tzXHJcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXHJcbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xyXG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fSk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRpZighaG90QXZhaWxpYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxyXG4gXHRcdFx0cmV0dXJuO1xyXG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XHJcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFx0aWYoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xyXG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xyXG4gXHRcdGlmKCFob3RBdmFpbGlibGVGaWxlc01hcFtjaHVua0lkXSkge1xyXG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcclxuIFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xyXG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XHJcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcclxuIFx0XHR2YXIgY2FsbGJhY2sgPSBob3RDYWxsYmFjaztcclxuIFx0XHRob3RDYWxsYmFjayA9IG51bGw7XHJcbiBcdFx0aWYoIWNhbGxiYWNrKSByZXR1cm47XHJcbiBcdFx0aWYoaG90QXBwbHlPblVwZGF0ZSkge1xyXG4gXHRcdFx0aG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSwgY2FsbGJhY2spO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xyXG4gXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHRcdGNhbGxiYWNrKG51bGwsIG91dGRhdGVkTW9kdWxlcyk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zLCBjYWxsYmFjaykge1xyXG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XHJcbiBcdFx0aWYodHlwZW9mIG9wdGlvbnMgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gXHRcdFx0Y2FsbGJhY2sgPSBvcHRpb25zO1xyXG4gXHRcdFx0b3B0aW9ucyA9IHt9O1xyXG4gXHRcdH0gZWxzZSBpZihvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zID09PSBcIm9iamVjdFwiKSB7XHJcbiBcdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKGVycikge1xyXG4gXHRcdFx0XHRpZihlcnIpIHRocm93IGVycjtcclxuIFx0XHRcdH07XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdG9wdGlvbnMgPSB7fTtcclxuIFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdGlmKGVycikgdGhyb3cgZXJyO1xyXG4gXHRcdFx0fTtcclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlKSB7XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW21vZHVsZV07XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcclxuIFx0XHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWUucG9wKCk7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0aWYoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdGlmKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xyXG4gXHRcdFx0XHRcdHJldHVybiBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArIG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihtb2R1bGVJZCA9PT0gMCkge1xyXG4gXHRcdFx0XHRcdHJldHVybjtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcclxuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XHJcbiBcdFx0XHRcdFx0aWYocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XHJcbiBcdFx0XHRcdFx0XHRyZXR1cm4gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICsgbW9kdWxlSWQgKyBcIiBpbiBcIiArIHBhcmVudElkKTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0aWYob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpID49IDApIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xyXG4gXHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcclxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XHJcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xyXG4gXHRcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XHJcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xyXG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2gocGFyZW50SWQpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFxyXG4gXHRcdFx0cmV0dXJuIFtvdXRkYXRlZE1vZHVsZXMsIG91dGRhdGVkRGVwZW5kZW5jaWVzXTtcclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcclxuIFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcclxuIFx0XHRcdFx0aWYoYS5pbmRleE9mKGl0ZW0pIDwgMClcclxuIFx0XHRcdFx0XHRhLnB1c2goaXRlbSk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxyXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cclxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcclxuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcclxuIFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xyXG4gXHRcdFx0XHR2YXIgcmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdGlmKCFyZXN1bHQpIHtcclxuIFx0XHRcdFx0XHRpZihvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcclxuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcclxuIFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIikpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKHJlc3VsdCBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKHJlc3VsdCk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdFswXSk7XHJcbiBcdFx0XHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gcmVzdWx0WzFdKSB7XHJcbiBcdFx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdFsxXSwgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxyXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcclxuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSwgcmVzdWx0WzFdW21vZHVsZUlkXSk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXHJcbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xyXG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdHZhciBtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcclxuIFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XHJcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXHJcbiBcdFx0XHRcdH0pO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcclxuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcclxuIFx0XHR3aGlsZShxdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiBcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcclxuIFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdGlmKCFtb2R1bGUpIGNvbnRpbnVlO1xyXG4gXHRcclxuIFx0XHRcdHZhciBkYXRhID0ge307XHJcbiBcdFxyXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXHJcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xyXG4gXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHR2YXIgY2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XHJcbiBcdFx0XHRcdGNiKGRhdGEpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcclxuIFx0XHJcbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxyXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcclxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxyXG4gXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XHJcbiBcdFx0XHRcdGlmKCFjaGlsZCkgY29udGludWU7XHJcbiBcdFx0XHRcdHZhciBpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkge1xyXG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXHJcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHRcdHZhciBkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XHJcbiBcdFx0XHRcdFx0dmFyIGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xyXG4gXHRcdFx0XHRcdGlmKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcclxuIFx0XHJcbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xyXG4gXHRcclxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcclxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXHJcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcclxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xyXG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xyXG4gXHRcdFx0XHRcdHZhciBjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xyXG4gXHRcdFx0XHRcdGlmKGNhbGxiYWNrcy5pbmRleE9mKGNiKSA+PSAwKSBjb250aW51ZTtcclxuIFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdHZhciBjYiA9IGNhbGxiYWNrc1tpXTtcclxuIFx0XHRcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRcdFx0Y2Iob3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xyXG4gXHRcdFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcclxuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcclxuIFx0XHRcdHZhciBtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xyXG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xyXG4gXHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XHJcbiBcdFx0XHR9IGNhdGNoKGVycikge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gXHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xyXG4gXHRcdFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fSBlbHNlIGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRlcnJvciA9IGVycjtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXHJcbiBcdFx0aWYoZXJyb3IpIHtcclxuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XHJcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2soZXJyb3IpO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcclxuIFx0XHRjYWxsYmFjayhudWxsLCBvdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHR9XHJcblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlLFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiBob3RDdXJyZW50UGFyZW50cyxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL3N0YXRpYy9cIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZSgwKSgwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDczNWVlMjg1ODlmYjVmNTA4MmNkXG4gKiovIiwiXG4gICAgdmFyIHRlc3RzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dChcIi4uLy4uL3Rlc3RcIiwgZmFsc2UpO1xuXG4gICAgdmFyIHJ1bm5hYmxlID0gdGVzdHNDb250ZXh0LmtleXMoKTtcblxuICAgIHJ1bm5hYmxlLmZvckVhY2godGVzdHNDb250ZXh0KTtcbiAgICBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2U1MzFmYTZmMGY5YTA2OTY1NGVhMTdjMmQyNTdjYjY2LWVudHJ5LmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL2FjdGlvbnMvcXVpei5zcGVjLmpzXCI6IDIsXG5cdFwiLi9jb21wb25lbnRzL3F1aXovUXVpekxpc3Quc3BlYy5qc1wiOiA2XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHJldHVybiBtYXBbcmVxXSB8fCAoZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpIH0oKSk7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDE7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC92YXIvd3d3L3F1aXovcmVhY3QtcmVkdXgvc3JjL3Rlc3Qgb2JqZWN0IE9iamVjdFxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBleHBlY3QgZnJvbSAnZXhwZWN0J1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vLi4vY29uc3RhbnRzL0FjdGlvblR5cGVzJ1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICcuLi8uLi9hY3Rpb25zL3F1aXotYWN0aW9ucydcblxuZGVzY3JpYmUoJ3F1aXogYWN0aW9ucycsICgpID0+IHtcbiAgaXQoJ2FkZFF1aXogc2hvdWxkIGNyZWF0ZSBBRERfUVVJWiBhY3Rpb24nLCAoKSA9PiB7XG4gICAgZXhwZWN0KGFjdGlvbnMuYWRkUXVpeih7XG4gICAgICBpZDogJ3h5eicsXG4gICAgICB0aXRsZTogJ1Rlc3QgUXVpeidcbiAgICB9KSkudG9FcXVhbCh7XG4gICAgICB0eXBlOiB0eXBlcy5BRERfUVVJWixcbiAgICAgIHF1aXo6IHtcbiAgICAgICAgaWQ6ICd4eXonLFxuICAgICAgICB0aXRsZTogJ1Rlc3QgUXVpeidcbiAgICAgIH1cbiAgICB9KVxuICB9KTtcblxuICBpdCgnbG9hZFF1aXogc2hvdWxkIGNyZWF0ZSBMT0FEX1FVSVogYWN0aW9uJywgKCkgPT4ge1xuICAgIGV4cGVjdChhY3Rpb25zLmxvYWRRdWl6KHtcbiAgICAgIGlkOiAneHl6JyxcbiAgICAgIHRpdGxlOiAnVGVzdCBRdWl6J1xuICAgIH0pKS50b0VxdWFsKHtcbiAgICAgIHR5cGU6IHR5cGVzLkxPQURfUVVJWixcbiAgICAgIHF1aXpMaXN0OiB7XG4gICAgICAgIGlkOiAneHl6JyxcbiAgICAgICAgdGl0bGU6ICdUZXN0IFF1aXonXG4gICAgICB9XG4gICAgfSlcbiAgfSk7XG5cbiAgaXQoJ2RlbGV0ZVF1aXogc2hvdWxkIGNyZWF0ZSBERUxFVEVfUVVJWiBhY3Rpb24nLCAoKSA9PiB7XG4gICAgZXhwZWN0KGFjdGlvbnMuZGVsZXRlUXVpeignYWJjMTIzZmVnJykpLnRvRXF1YWwoe1xuICAgICAgdHlwZTogdHlwZXMuREVMRVRFX1FVSVosXG4gICAgICBpZDogJ2FiYzEyM2ZlZydcbiAgICB9KVxuICB9KTtcblxufSlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC92YXIvd3d3L3F1aXovcmVhY3QtcmVkdXgvc3JjL3Rlc3QvYWN0aW9ucy9xdWl6LnNwZWMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHBlY3RcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImV4cGVjdFwiXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IGNvbnN0IEFERF9RVUlaID0gJ0FERF9RVUlaJ1xuZXhwb3J0IGNvbnN0IExPQURfUVVJWiA9ICdMT0FEX1FVSVonXG5leHBvcnQgY29uc3QgREVMRVRFX1FVSVogPSAnREVMRVRFX1FVSVonXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvdmFyL3d3dy9xdWl6L3JlYWN0LXJlZHV4L3NyYy9jb25zdGFudHMvQWN0aW9uVHlwZXMuanNcbiAqKi8iLCJpbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi9jb25zdGFudHMvQWN0aW9uVHlwZXMnXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRRdWl6KHF1aXopIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogdHlwZXMuQUREX1FVSVosXG4gICAgICBxdWl6XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFF1aXoocXVpekxpc3QpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5MT0FEX1FVSVosXG4gICAgICAgIHF1aXpMaXN0XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlUXVpeihpZCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLkRFTEVURV9RVUlaLFxuICAgICAgICBpZFxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC92YXIvd3d3L3F1aXovcmVhY3QtcmVkdXgvc3JjL2FjdGlvbnMvcXVpei1hY3Rpb25zLmpzXG4gKiovIiwiaW1wb3J0IGV4cGVjdCBmcm9tICdleHBlY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBUZXN0VXRpbHMgZnJvbSAncmVhY3QtYWRkb25zLXRlc3QtdXRpbHMnO1xuaW1wb3J0IHsgUXVpekxpc3QgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3F1aXonO1xuXG52YXIgcGF0aEFsaWFzID0gcmVxdWlyZSgncGF0aC1hbGlhcycpO1xuXG4vL3NldHVwIGFsaWFzOlxucGF0aEFsaWFzLnNldEFsaWFzKCdyZWFjdC10b29sYm94JywgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LXRvb2xib3gvbGliLycpKTtcblxuLy9yZXF1aXJlIG1vZHVsZTpcblxuZnVuY3Rpb24gc2V0dXAoKSB7XG4gIGNvbnN0IHByb3BzID0ge1xuXG4gIH1cblxuICBjb25zdCByZW5kZXJlciA9IFRlc3RVdGlscy5jcmVhdGVSZW5kZXJlcigpXG5cbiAgcmVuZGVyZXIucmVuZGVyKFxuICAgIDxRdWl6TGlzdCB7Li4ucHJvcHN9IC8+XG4gIClcblxuICBsZXQgb3V0cHV0ID0gcmVuZGVyZXIuZ2V0UmVuZGVyT3V0cHV0KClcblxuICByZXR1cm4ge1xuICAgIHByb3BzOiBwcm9wcyxcbiAgICBvdXRwdXQ6IG91dHB1dCxcbiAgICByZW5kZXJlcjogcmVuZGVyZXJcbiAgfVxufVxuXG5kZXNjcmliZSgnY29tcG9uZW50cycsICgpID0+IHtcbiAgZGVzY3JpYmUoJ1F1aXpMaXN0JywgKCkgPT4ge1xuICAgIGl0KCdpbml0aWFsIHJlbmRlcicsICgpID0+IHtcbiAgICAgIGNvbnN0IHsgb3V0cHV0IH0gPSBzZXR1cCgpXG5cbiAgICAgIGNvbnNvbGUubG9nKG91dHB1dCk7XG4gICAgfSlcbiAgfSlcbn0pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvdmFyL3d3dy9xdWl6L3JlYWN0LXJlZHV4L3NyYy90ZXN0L2NvbXBvbmVudHMvcXVpei9RdWl6TGlzdC5zcGVjLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcInJlYWN0XCJcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1hZGRvbnMtdGVzdC11dGlsc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicmVhY3QtYWRkb25zLXRlc3QtdXRpbHNcIlxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBRdWl6Rm9ybSBmcm9tICcuL1F1aXpGb3JtJ1xuaW1wb3J0IFF1aXpMaXN0IGZyb20gJy4vUXVpekxpc3QnXG5pbXBvcnQgUXVpekxpc3RJdGVtIGZyb20gJy4vUXVpekxpc3RJdGVtJ1xuXG5leHBvcnQgeyBRdWl6Rm9ybSwgUXVpekxpc3QsIFF1aXpMaXN0SXRlbSB9O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3Zhci93d3cvcXVpei9yZWFjdC1yZWR1eC9zcmMvY29tcG9uZW50cy9xdWl6L2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IElucHV0IGZyb20gJ3JlYWN0LXRvb2xib3gvaW5wdXQnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAncmVhY3QtdG9vbGJveC9idXR0b24nO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgKiBhcyBRdWl6QWN0aW9ucyBmcm9tICcuLi8uLi9hY3Rpb25zL3F1aXotYWN0aW9ucydcblxuaW1wb3J0ICogYXMgQ09ORklHIGZyb20gJy4uLy4uL2NvbnN0YW50cy9jb25maWcnXG5cbmltcG9ydCByZWR1eEFwaSwge3RyYW5zZm9ybWVyc30gZnJvbSBcInJlZHV4LWFwaVwiO1xuaW1wb3J0IHJlc3QgZnJvbSAnLi4vLi4vYXBpL3Jlc3QnXG5cbmNsYXNzIFF1aXpGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcbiAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XG4gIH1cbiAgc3RhdGUgPSB7XG4gICAgdGl0bGU6ICcnXG4gIH07XG5cbiAgaGFuZGxlQ2hhbmdlID0gKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Li4udGhpcy5zdGF0ZSwgW25hbWVdOiB2YWx1ZX0pO1xuICB9O1xuXG4gIGhhbmRsZVN1Ym1pdCA9IChlKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5wb3N0KG51bGwsIHtcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdGl0bGU6IHRoaXMuc3RhdGUudGl0bGVcbiAgICAgIH0pLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH1cbiAgICB9LCAoZXJyLCBkYXRhKSA9PiB7XG4gICAgICBpZiAoIWVycikge1xuICAgICAgICB0aGlzLnByb3BzLmFjdGlvbnMuYWRkUXVpeihkYXRhKTtcblxuICAgICAgICAvLyBjbGVhciBmb3JtXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3RpdGxlOiAnJ30pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZUtleURvd24gPSAoZSkgPT4ge1xuICAgIGlmIChlLndoaWNoID09PSAxMykge1xuICAgICAgdGhpcy5oYW5kbGVTdWJtaXQoZSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8c2VjdGlvbj5cbiAgICAgICAgPElucHV0IHR5cGU9J3RleHQnXG4gICAgICAgICAgbGFiZWw9J1F1aXogVGl0bGUnXG4gICAgICAgICAgbmFtZT0ndGl0bGUnXG4gICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS50aXRsZX1cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzLCAndGl0bGUnKX1cbiAgICAgICAgICBtYXhMZW5ndGg9ezY0fS8+XG4gICAgICAgIDxCdXR0b24gaWNvbj0nYWRkJyBsYWJlbD0nQWRkIHRoaXMnIGZsYXQgcHJpbWFyeSBvbkNsaWNrPXt0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpfS8+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHNlbGVjdChzdGF0ZSkge1xuICByZXR1cm4ge1xuICAgIHF1aXo6IHN0YXRlLnF1aXpcbiAgfVxufVxuXG5mdW5jdGlvbiBiaW5kRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoKSB7XG4gIHJldHVybiB7XG4gICAgcG9zdDogYmluZEFjdGlvbkNyZWF0b3JzKHJlc3QuYWN0aW9ucy5hcGlRdWl6LnBvc3QsIGRpc3BhdGNoKSxcbiAgICBhY3Rpb25zOiBiaW5kQWN0aW9uQ3JlYXRvcnMoUXVpekFjdGlvbnMsIGRpc3BhdGNoKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3Qoc2VsZWN0LCBiaW5kRGlzcGF0Y2hUb1Byb3BzKShRdWl6Rm9ybSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvdmFyL3d3dy9xdWl6L3JlYWN0LXJlZHV4L3NyYy9jb21wb25lbnRzL3F1aXovUXVpekZvcm0uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZGJveC1yZWFjdFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicmVkYm94LXJlYWN0XCJcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtdHJhbnNmb3JtLWNhdGNoLWVycm9yc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicmVhY3QtdHJhbnNmb3JtLWNhdGNoLWVycm9yc1wiXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXRyYW5zZm9ybS1obXJcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcInJlYWN0LXRyYW5zZm9ybS1obXJcIlxuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC10b29sYm94L2lucHV0XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJyZWFjdC10b29sYm94L2lucHV0XCJcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtdG9vbGJveC9idXR0b25cIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcInJlYWN0LXRvb2xib3gvYnV0dG9uXCJcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtcmVkdXhcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcInJlYWN0LXJlZHV4XCJcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcInJlZHV4XCJcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IGNvbnN0IEFQSV9VUkwgPSAnaHR0cDovL2xvY2FsaG9zdDo5MDkxJztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC92YXIvd3d3L3F1aXovcmVhY3QtcmVkdXgvc3JjL2NvbnN0YW50cy9jb25maWcuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1hcGlcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcInJlZHV4LWFwaVwiXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBcImlzb21vcnBoaWMtZmV0Y2hcIjtcbmltcG9ydCByZWR1eEFwaSwge3RyYW5zZm9ybWVyc30gZnJvbSBcInJlZHV4LWFwaVwiO1xuaW1wb3J0IGFkYXB0ZXJGZXRjaCBmcm9tIFwicmVkdXgtYXBpL2xpYi9hZGFwdGVycy9mZXRjaFwiO1xuaW1wb3J0IG1hcCBmcm9tIFwibG9kYXNoL21hcFwiO1xuaW1wb3J0ICogYXMgQ09ORklHIGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnXG5pbXBvcnQge0xpc3QsIE1hcH0gZnJvbSAnaW1tdXRhYmxlJztcblxuZXhwb3J0IGRlZmF1bHQgcmVkdXhBcGkoe1xuICAvLyBzaW1wbGUgZWRwb2ludCBkZXNjcmlwdGlvblxuICBhbGxRdWl6OiB7XG4gICAgdXJsOiBgJHtDT05GSUcuQVBJX1VSTH0vcXVpemAsXG4gICAgb3B0aW9uczoge1xuICAgICAgaGVhZGVyOiB7XG4gICAgICAgIFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBhcGlRdWl6OiB7XG4gICAgdXJsOiBgJHtDT05GSUcuQVBJX1VSTH0vcXVpei86aWRgLFxuICAgIGNydWQ6IHRydWVcbiAgfVxufSkudXNlKFwiZmV0Y2hcIiwgYWRhcHRlckZldGNoKGZldGNoKSk7IC8vIGl0J3MgbmVjZXNzYXJ5IHRvIHBvaW50IHVzaW5nIFJFU1QgYmFja2VuZFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3Zhci93d3cvcXVpei9yZWFjdC1yZWR1eC9zcmMvYXBpL3Jlc3QuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpc29tb3JwaGljLWZldGNoXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJpc29tb3JwaGljLWZldGNoXCJcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtYXBpL2xpYi9hZGFwdGVycy9mZXRjaFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicmVkdXgtYXBpL2xpYi9hZGFwdGVycy9mZXRjaFwiXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaC9tYXBcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImxvZGFzaC9tYXBcIlxuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpbW11dGFibGVcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImltbXV0YWJsZVwiXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IExpc3QsIExpc3RJdGVtIH0gZnJvbSAncmVhY3QtdG9vbGJveC9saXN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xuaW1wb3J0IFF1aXpMaXN0SXRlbSBmcm9tICcuL1F1aXpMaXN0SXRlbSdcbmltcG9ydCBJbW11dGFibGUgZnJvbSAnaW1tdXRhYmxlJ1xuXG5pbXBvcnQgcmVkdXhBcGksIHt0cmFuc2Zvcm1lcnN9IGZyb20gXCJyZWR1eC1hcGlcIjtcbmltcG9ydCByZXN0IGZyb20gJy4uLy4uL2FwaS9yZXN0J1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgKiBhcyBRdWl6QWN0aW9ucyBmcm9tICcuLi8uLi9hY3Rpb25zL3F1aXotYWN0aW9ucydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVpekxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xuICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgcXVpekxpc3Q6IHRoaXMucHJvcHMucXVpekxpc3QsXG4gICAgICBxdWl6OiB0aGlzLnByb3BzLnF1aXpcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLm9uTG9hZCh0aGlzLnByb3BzLnF1aXpMaXN0KVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8c2VjdGlvbj5cbiAgICAgICAgPExpc3Qgc2VsZWN0YWJsZSByaXBwbGU+XG4gICAgICAgICAge3RoaXMucHJvcHMucXVpei50b0FycmF5KCkubWFwKHF1aXogPT4gKFxuICAgICAgICAgICAgPFF1aXpMaXN0SXRlbSBrZXk9e3F1aXouZ2V0KCdfaWQnKX1cbiAgICAgICAgICAgICAgZGF0YT17cXVpen0vPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L0xpc3Q+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZWxlY3Qoc3RhdGUpIHtcbiAgaWYgKHN0YXRlLmFsbFF1aXouc3luYykge1xuICAgIGxldCBxdWl6TGlzdCA9IEltbXV0YWJsZS5MaXN0Lm9mKCk7XG4gICAgc3RhdGUuYWxsUXVpei5kYXRhLmRhdGEubWFwKHF1aXogPT4ge1xuICAgICAgcXVpekxpc3QgPSBxdWl6TGlzdC5wdXNoKEltbXV0YWJsZS5NYXAocXVpeikpXG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcXVpekxpc3Q6IHF1aXpMaXN0LFxuICAgICAgcXVpejogc3RhdGUucXVpelxuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChzZWxlY3QpKFF1aXpMaXN0KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC92YXIvd3d3L3F1aXovcmVhY3QtcmVkdXgvc3JjL2NvbXBvbmVudHMvcXVpei9RdWl6TGlzdC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXRvb2xib3gvbGlzdFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicmVhY3QtdG9vbGJveC9saXN0XCJcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgTGlzdEl0ZW0gfSBmcm9tICdyZWFjdC10b29sYm94L2xpc3QnXG5pbXBvcnQgRm9udEljb24gZnJvbSAncmVhY3QtdG9vbGJveC9mb250X2ljb24nO1xuaW1wb3J0IHsgSWNvbkJ1dHRvbiB9IGZyb20gJ3JlYWN0LXRvb2xib3gvYnV0dG9uJztcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcbmltcG9ydCByZXN0IGZyb20gJy4uLy4uL2FwaS9yZXN0JztcbmltcG9ydCAqIGFzIFF1aXpBY3Rpb25zIGZyb20gJy4uLy4uL2FjdGlvbnMvcXVpei1hY3Rpb25zJ1xuXG5jbGFzcyBRdWl6TGlzdEl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xuICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcblxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnByb3BzLmRhdGE7XG4gIH1cblxuICBoYW5kbGVEZWxldGUoKSB7XG4gICAgbGV0IGlkID0gdGhpcy5zdGF0ZS5nZXQoJ19pZCcpO1xuICAgIHRoaXMucHJvcHMuZGVsZXRlKHtpZDogaWR9LCBudWxsLCAoZXJyLCBkYXRhKSA9PiB7XG4gICAgICBpZiAoIWVycikge1xuICAgICAgICB0aGlzLnByb3BzLmFjdGlvbnMuZGVsZXRlUXVpeih0aGlzLnN0YXRlLmdldCgnX2lkJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgLy8gVE9ETzogRG8gc29tZXRoaW5nIGlmIHBvc3QgZmFpbFxuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGxldCByaWdodEFjdGlvbnMgPSBbXG4gICAgICA8SWNvbkJ1dHRvbiBpY29uPSdjbGVhcicgb25DbGljaz17dGhpcy5oYW5kbGVEZWxldGUuYmluZCh0aGlzKX0gYWNjZW50ICBrZXk9XCJCdXR0b25cIi8+XG4gICAgXTtcbiAgICByZXR1cm4gKFxuICAgICAgPExpc3RJdGVtXG4gICAgICBjYXB0aW9uPXt0aGlzLnN0YXRlLmdldCgndGl0bGUnKX1cbiAgICAgIHJpZ2h0QWN0aW9ucz17cmlnaHRBY3Rpb25zfT5cbiAgICAgIDwvTGlzdEl0ZW0+XG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZWxlY3Qoc3RhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICBxdWl6OiBzdGF0ZS5xdWl6XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBiaW5kRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoKSB7XG4gIHJldHVybiB7XG4gICAgZGVsZXRlOiBiaW5kQWN0aW9uQ3JlYXRvcnMocmVzdC5hY3Rpb25zLmFwaVF1aXouZGVsZXRlLCBkaXNwYXRjaCksXG4gICAgYWN0aW9uczogYmluZEFjdGlvbkNyZWF0b3JzKFF1aXpBY3Rpb25zLCBkaXNwYXRjaClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KHNlbGVjdCwgYmluZERpc3BhdGNoVG9Qcm9wcykoUXVpekxpc3RJdGVtKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC92YXIvd3d3L3F1aXovcmVhY3QtcmVkdXgvc3JjL2NvbXBvbmVudHMvcXVpei9RdWl6TGlzdEl0ZW0uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC10b29sYm94L2ZvbnRfaWNvblwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicmVhY3QtdG9vbGJveC9mb250X2ljb25cIlxuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoLWFsaWFzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJwYXRoLWFsaWFzXCJcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==