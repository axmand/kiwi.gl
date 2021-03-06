var kiwi = (function (exports) {
	'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var jsx = function () {
	  var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7;
	  return function createRawReactElement(type, props, key, children) {
	    var defaultProps = type && type.defaultProps;
	    var childrenLength = arguments.length - 3;

	    if (!props && childrenLength !== 0) {
	      props = {};
	    }

	    if (props && defaultProps) {
	      for (var propName in defaultProps) {
	        if (props[propName] === void 0) {
	          props[propName] = defaultProps[propName];
	        }
	      }
	    } else if (!props) {
	      props = defaultProps || {};
	    }

	    if (childrenLength === 1) {
	      props.children = children;
	    } else if (childrenLength > 1) {
	      var childArray = Array(childrenLength);

	      for (var i = 0; i < childrenLength; i++) {
	        childArray[i] = arguments[i + 3];
	      }

	      props.children = childArray;
	    }

	    return {
	      $$typeof: REACT_ELEMENT_TYPE,
	      type: type,
	      key: key === undefined ? null : '' + key,
	      ref: null,
	      props: props,
	      _owner: null
	    };
	  };
	}();

	var asyncIterator = function (iterable) {
	  if (typeof Symbol === "function") {
	    if (Symbol.asyncIterator) {
	      var method = iterable[Symbol.asyncIterator];
	      if (method != null) return method.call(iterable);
	    }

	    if (Symbol.iterator) {
	      return iterable[Symbol.iterator]();
	    }
	  }

	  throw new TypeError("Object is not async iterable");
	};

	var asyncGenerator = function () {
	  function AwaitValue(value) {
	    this.value = value;
	  }

	  function AsyncGenerator(gen) {
	    var front, back;

	    function send(key, arg) {
	      return new Promise(function (resolve, reject) {
	        var request = {
	          key: key,
	          arg: arg,
	          resolve: resolve,
	          reject: reject,
	          next: null
	        };

	        if (back) {
	          back = back.next = request;
	        } else {
	          front = back = request;
	          resume(key, arg);
	        }
	      });
	    }

	    function resume(key, arg) {
	      try {
	        var result = gen[key](arg);
	        var value = result.value;

	        if (value instanceof AwaitValue) {
	          Promise.resolve(value.value).then(function (arg) {
	            resume("next", arg);
	          }, function (arg) {
	            resume("throw", arg);
	          });
	        } else {
	          settle(result.done ? "return" : "normal", result.value);
	        }
	      } catch (err) {
	        settle("throw", err);
	      }
	    }

	    function settle(type, value) {
	      switch (type) {
	        case "return":
	          front.resolve({
	            value: value,
	            done: true
	          });
	          break;

	        case "throw":
	          front.reject(value);
	          break;

	        default:
	          front.resolve({
	            value: value,
	            done: false
	          });
	          break;
	      }

	      front = front.next;

	      if (front) {
	        resume(front.key, front.arg);
	      } else {
	        back = null;
	      }
	    }

	    this._invoke = send;

	    if (typeof gen.return !== "function") {
	      this.return = undefined;
	    }
	  }

	  if (typeof Symbol === "function" && Symbol.asyncIterator) {
	    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
	      return this;
	    };
	  }

	  AsyncGenerator.prototype.next = function (arg) {
	    return this._invoke("next", arg);
	  };

	  AsyncGenerator.prototype.throw = function (arg) {
	    return this._invoke("throw", arg);
	  };

	  AsyncGenerator.prototype.return = function (arg) {
	    return this._invoke("return", arg);
	  };

	  return {
	    wrap: function (fn) {
	      return function () {
	        return new AsyncGenerator(fn.apply(this, arguments));
	      };
	    },
	    await: function (value) {
	      return new AwaitValue(value);
	    }
	  };
	}();

	var asyncGeneratorDelegate = function (inner, awaitWrap) {
	  var iter = {},
	      waiting = false;

	  function pump(key, value) {
	    waiting = true;
	    value = new Promise(function (resolve) {
	      resolve(inner[key](value));
	    });
	    return {
	      done: false,
	      value: awaitWrap(value)
	    };
	  }

	  if (typeof Symbol === "function" && Symbol.iterator) {
	    iter[Symbol.iterator] = function () {
	      return this;
	    };
	  }

	  iter.next = function (value) {
	    if (waiting) {
	      waiting = false;
	      return value;
	    }

	    return pump("next", value);
	  };

	  if (typeof inner.throw === "function") {
	    iter.throw = function (value) {
	      if (waiting) {
	        waiting = false;
	        throw value;
	      }

	      return pump("throw", value);
	    };
	  }

	  if (typeof inner.return === "function") {
	    iter.return = function (value) {
	      return pump("return", value);
	    };
	  }

	  return iter;
	};

	var asyncToGenerator = function (fn) {
	  return function () {
	    var gen = fn.apply(this, arguments);
	    return new Promise(function (resolve, reject) {
	      function step(key, arg) {
	        try {
	          var info = gen[key](arg);
	          var value = info.value;
	        } catch (error) {
	          reject(error);
	          return;
	        }

	        if (info.done) {
	          resolve(value);
	        } else {
	          return Promise.resolve(value).then(function (value) {
	            step("next", value);
	          }, function (err) {
	            step("throw", err);
	          });
	        }
	      }

	      return step("next");
	    });
	  };
	};

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var defineEnumerableProperties = function (obj, descs) {
	  for (var key in descs) {
	    var desc = descs[key];
	    desc.configurable = desc.enumerable = true;
	    if ("value" in desc) desc.writable = true;
	    Object.defineProperty(obj, key, desc);
	  }

	  return obj;
	};

	var defaults = function (obj, defaults) {
	  var keys = Object.getOwnPropertyNames(defaults);

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var value = Object.getOwnPropertyDescriptor(defaults, key);

	    if (value && value.configurable && obj[key] === undefined) {
	      Object.defineProperty(obj, key, value);
	    }
	  }

	  return obj;
	};

	var defineProperty = function (obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	var get = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = Object.getOwnPropertyDescriptor(object, property);

	  if (desc === undefined) {
	    var parent = Object.getPrototypeOf(object);

	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;

	    if (getter === undefined) {
	      return undefined;
	    }

	    return getter.call(receiver);
	  }
	};

	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	var _instanceof = function (left, right) {
	  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
	    return right[Symbol.hasInstance](left);
	  } else {
	    return left instanceof right;
	  }
	};

	var interopRequireDefault = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	};

	var interopRequireWildcard = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }

	    newObj.default = obj;
	    return newObj;
	  }
	};

	var newArrowCheck = function (innerThis, boundThis) {
	  if (innerThis !== boundThis) {
	    throw new TypeError("Cannot instantiate an arrow function");
	  }
	};

	var objectDestructuringEmpty = function (obj) {
	  if (obj == null) throw new TypeError("Cannot destructure undefined");
	};

	var objectWithoutProperties = function (obj, keys) {
	  var target = {};

	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }

	  return target;
	};

	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	var selfGlobal = typeof global === "undefined" ? self : global;

	var set = function set(object, property, value, receiver) {
	  var desc = Object.getOwnPropertyDescriptor(object, property);

	  if (desc === undefined) {
	    var parent = Object.getPrototypeOf(object);

	    if (parent !== null) {
	      set(parent, property, value, receiver);
	    }
	  } else if ("value" in desc && desc.writable) {
	    desc.value = value;
	  } else {
	    var setter = desc.set;

	    if (setter !== undefined) {
	      setter.call(receiver, value);
	    }
	  }

	  return value;
	};

	var slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

	var slicedToArrayLoose = function (arr, i) {
	  if (Array.isArray(arr)) {
	    return arr;
	  } else if (Symbol.iterator in Object(arr)) {
	    var _arr = [];

	    for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
	      _arr.push(_step.value);

	      if (i && _arr.length === i) break;
	    }

	    return _arr;
	  } else {
	    throw new TypeError("Invalid attempt to destructure non-iterable instance");
	  }
	};

	var taggedTemplateLiteral = function (strings, raw) {
	  return Object.freeze(Object.defineProperties(strings, {
	    raw: {
	      value: Object.freeze(raw)
	    }
	  }));
	};

	var taggedTemplateLiteralLoose = function (strings, raw) {
	  strings.raw = raw;
	  return strings;
	};

	var temporalRef = function (val, name, undef) {
	  if (val === undef) {
	    throw new ReferenceError(name + " is not defined - temporal dead zone");
	  } else {
	    return val;
	  }
	};

	var temporalUndefined = {};

	var toArray = function (arr) {
	  return Array.isArray(arr) ? arr : Array.from(arr);
	};

	var toConsumableArray = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  } else {
	    return Array.from(arr);
	  }
	};

	var babelHelpers = /*#__PURE__*/Object.freeze({
		jsx: jsx,
		asyncIterator: asyncIterator,
		asyncGenerator: asyncGenerator,
		asyncGeneratorDelegate: asyncGeneratorDelegate,
		asyncToGenerator: asyncToGenerator,
		classCallCheck: classCallCheck,
		createClass: createClass,
		defineEnumerableProperties: defineEnumerableProperties,
		defaults: defaults,
		defineProperty: defineProperty,
		get: get,
		inherits: inherits,
		interopRequireDefault: interopRequireDefault,
		interopRequireWildcard: interopRequireWildcard,
		newArrowCheck: newArrowCheck,
		objectDestructuringEmpty: objectDestructuringEmpty,
		objectWithoutProperties: objectWithoutProperties,
		possibleConstructorReturn: possibleConstructorReturn,
		selfGlobal: selfGlobal,
		set: set,
		slicedToArray: slicedToArray,
		slicedToArrayLoose: slicedToArrayLoose,
		taggedTemplateLiteral: taggedTemplateLiteral,
		taggedTemplateLiteralLoose: taggedTemplateLiteralLoose,
		temporalRef: temporalRef,
		temporalUndefined: temporalUndefined,
		toArray: toArray,
		toConsumableArray: toConsumableArray,
		typeof: _typeof,
		extends: _extends,
		instanceof: _instanceof
	});

	var isObject_1 = createCommonjsModule(function (module) {
	  /**
	   * reference:
	   * http://www.css88.com/doc/underscore/docs/underscore.html
	   * 
	   */

	  var isObject = function isObject(obj) {
	    var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  module.exports = isObject;
	});

	var isObject = /*#__PURE__*/Object.freeze({
		default: isObject_1,
		__moduleExports: isObject_1
	});

	var isString_1 = createCommonjsModule(function (module) {
	  /**
	   * reference:
	   *  http://www.css88.com/doc/underscore/docs/underscore.html
	   */

	  var isString = function isString(str) {
	    return typeof str == 'string' && str.constructor == String;
	  };

	  module.exports = isString;
	});

	var isString = /*#__PURE__*/Object.freeze({
		default: isString_1,
		__moduleExports: isString_1
	});

	var isObject$1 = ( isObject && isObject_1 ) || isObject;

	var isString$1 = ( isString && isString_1 ) || isString;

	var stamp_1 = createCommonjsModule(function (module) {
	    /**
	     * assign kiwi.gl object to be an unique id in the global
	     * @author yellow 2017/5/26
	     */

	    var _prefix = '_kiwi.gl_',
	        _prefixId = _prefix + 'id_';
	    /**
	     * the seed of id
	     */
	    var i = 1;
	    /**
	     * get uniqueId and count++
	     * @param {String} prefix 
	     */
	    var getId = function getId(prefix) {
	        return (prefix || _prefixId) + '_' + i++;
	    };
	    /**
	     * 
	     * @param {Object} obj 
	     * @param {String} id 
	     */
	    var setId = function setId(obj, id) {
	        if (isObject$1(obj) && isString$1(id)) {
	            obj._kiwi_gl_id_ = id;
	            return id;
	        }
	        return null;
	    };
	    /**
	     * get the unique id
	     * @method stamp
	     * @param {Object} obj 
	     * @return {String} error if returned 'null'
	     */
	    var stamp = function stamp(obj) {
	        var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _prefix;

	        if (!obj) return null;
	        if (!obj._kiwi_gl_id_) {
	            var id = getId(prefix);
	            return setId(obj, id);
	        } else {
	            return obj._kiwi_gl_id_;
	        }
	    };

	    module.exports = stamp;
	});

	var stamp = /*#__PURE__*/Object.freeze({
		default: stamp_1,
		__moduleExports: stamp_1
	});

	var stamp$1 = ( stamp && stamp_1 ) || stamp;

	/**
	 * 设计思路为.net framework 的 IDispose接口
	 * 除此之外提供额外的属性：
	 * -id
	 * -handle
	 * -create handle
	 * -dispose
	 */

	/**
	 * @class
	 */

	var Dispose = function () {
	  /**
	   * 构建一个可被销毁的资源对象,提供prefix
	   */
	  function Dispose() {
	    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	    classCallCheck(this, Dispose);

	    this._id = stamp$1(this, prefix);
	  }
	  /**
	   * 获取资源id
	   */


	  createClass(Dispose, [{
	    key: 'dispose',

	    /**
	     * 资源销毁方法，执行完一段后，统一调用
	     * must be implement be child class
	     * @abstract
	     */
	    value: function dispose() {
	      throw new Error('no implementation of function dispose');
	    }
	  }, {
	    key: 'id',
	    get: function get$$1() {
	      return this._id;
	    }
	  }]);
	  return Dispose;
	}();

	var Dispose_1 = Dispose;

	var Dispose$1 = /*#__PURE__*/Object.freeze({
		default: Dispose_1,
		__moduleExports: Dispose_1
	});

	/**
	*   @author }{yellow 2017/4/18
	*   @returns {Object} 合并后对象
	*/

	/**
	 * @func
	 */
	var merge = function merge() {
	  var _babelHelpers;

	  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
	    sources[_key] = arguments[_key];
	  }

	  return (_babelHelpers = babelHelpers).extends.apply(_babelHelpers, [{}].concat(sources));
	};

	var merge_1 = merge;

	var merge$1 = /*#__PURE__*/Object.freeze({
		default: merge_1,
		__moduleExports: merge_1
	});

	/**
	 * reference:
	 * http://www.css88.com/doc/underscore1.4.2/docs/underscore.html
	 * 
	 */

	/**
	 * 操作记单元
	 * @author yellow date 2018/1/4
	 */

	/**
	 * @class
	 */

	var Record = function () {
	  /**
	   * 
	   * @param {*} opName 
	   * @param {*} rest 
	   */
	  function Record(opName) {
	    classCallCheck(this, Record);

	    /**
	     * webgl operation name
	     */
	    this._opName = opName;
	    /**
	     * args
	     */

	    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      rest[_key - 1] = arguments[_key];
	    }

	    this._rest = this._exact(rest);
	    /**
	     * use prfix instead of value in args
	     * @type {Int}
	     */
	    this._ptMapIndex = {};
	    /**
	     * indicate this record needs to return value
	     * @type {String}
	     */
	    this._returnId = null;
	  }
	  /**
	   * operation name
	   */


	  createClass(Record, [{
	    key: '_exact',

	    /**
	     * }{debug arraybuffer.set much more faster than copy
	     * 
	     * @private
	     * @param {Array} rest 
	     */
	    value: function _exact(rest) {
	      for (var i = 0, len = rest.length; i < len; i++) {
	        var target = rest[i];
	        if (target instanceof Float32Array) {
	          rest[i] = new Float32Array(target);
	        }
	      }
	      return rest;
	    }
	    /**
	     * 修改某处指令的值
	     * @param {int} ptIndex 
	     * @param {String} ptName always represents shaderId/porgramId/
	     */

	  }, {
	    key: 'exactIndexByValue',
	    value: function exactIndexByValue(ptIndex, ptName) {
	      var arr = ptName.split('_');
	      //map to _ptIndex
	      this._ptMapIndex[ptIndex] = {
	        prefix: arr[0],
	        index: ptIndex,
	        id: ptName
	      };
	      //replace value
	      this._rest[ptIndex] = ptName;
	    }
	    /**
	     * 
	     * @param {Array} ptIndex 
	     */

	  }, {
	    key: 'exactIndexByObject',
	    value: function exactIndexByObject(ptIndexs) {
	      for (var i = 0, len = ptIndexs.length; i < len; i++) {
	        var ptIndex = ptIndexs[i],
	            ptName = stamp$1(this._rest[ptIndex]);
	        ptName && ptName.indexOf('_') !== -1 ? this.exactIndexByValue(ptIndex, ptName) : null;
	      }
	    }
	    /**
	     * 
	     * @param {Array} refs 
	     */

	  }, {
	    key: 'replace',
	    value: function replace(refs) {
	      for (var key in refs) {
	        this._rest[key] = refs[key];
	      }
	    }
	    /**
	     * 设置返回的id
	     */

	  }, {
	    key: 'setReturnId',
	    value: function setReturnId(v) {
	      var needToAnalysis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	      this._returnId = v;
	      needToAnalysis ? this._analysisReturnId(v) : null;
	    }
	    /**
	     * 
	     * @param {String} v 
	     */

	  }, {
	    key: '_analysisReturnId',
	    value: function _analysisReturnId(v) {
	      var val = isString$1(v) ? v : stamp$1(v);
	      var arr = val.split('_');
	      //map to _ptIndex
	      this._returanIdPrefix = arr[0];
	    }
	  }, {
	    key: 'opName',
	    get: function get$$1() {
	      return this._opName;
	    }
	    /**
	     * arguments of record
	     */

	  }, {
	    key: 'args',
	    get: function get$$1() {
	      return this._rest;
	    }
	    /**
	     * @returns {String}
	     */

	  }, {
	    key: 'returnId',
	    get: function get$$1() {
	      return this._returnId;
	    }
	    /**
	     * @returns {String}
	     */

	  }, {
	    key: 'returanIdPrefix',
	    get: function get$$1() {
	      return this._returanIdPrefix;
	    }
	    /**
	     * @type {Int}
	     */

	  }, {
	    key: 'ptMapIndex',
	    get: function get$$1() {
	      return this._ptMapIndex;
	    }
	  }]);
	  return Record;
	}();

	var Record_1 = Record;

	var Record$1 = /*#__PURE__*/Object.freeze({
		default: Record_1,
		__moduleExports: Record_1
	});

	var merge$2 = ( merge$1 && merge_1 ) || merge$1;

	/**
	 * reference:
	 * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext
	 * 
	 * 具有返回对象的操作
	 * -code 操作代码
	 * -return 具有返回值的操作,特指需要返回代替索引的操作
	 * -replace 需要使用新对象代替引用的操作
	 * -ptIndex 替换参数的位置索引
	 * -change 判断当前操作的program环境
	 */

	var Encrypt_WebGLContext = {
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/canvas
	   * @property
	   */
	  'canvas': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/commit
	   */
	  'commit': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawingBufferWidth
	   * @property
	   */
	  'drawingBufferWidth': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawingBufferHeight
	   * @property
	   */
	  'drawingBufferHeight': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getContextAttributes
	   */
	  'getContextAttributes': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isContextLost
	   */
	  'isContextLost': { code: 0, return: 1, replace: 0 }
	};

	var Encrypt_Viewing_And_Clipping = {
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/scissor
	   */
	  'scissor': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/viewport
	   */
	  'viewport': { code: 0, return: 0, replace: 0 }
	};

	var Encrypt_State_Information = {
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/activeTexture
	   */
	  'activeTexture': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendColor
	   */
	  'blendColor': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendEquation
	   */
	  'blendEquation': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendEquationSeparate
	   */
	  'blendEquationSeparate': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendFunc
	   */
	  'blendFunc': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendFuncSeparate
	   */
	  'blendFuncSeparate': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearColor
	   */
	  'clearColor': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearDepth
	   */
	  'clearDepth': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearStencil
	   */
	  'clearStencil': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/colorMask
	   */
	  'colorMask': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/cullFace
	   */
	  'cullFace': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/depthFunc
	   */
	  'depthFunc': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/depthMask
	   */
	  'depthMask': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/depthRange
	   */
	  'depthRange': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/disable
	   */
	  'disable': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/enable
	   */
	  'enable': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/frontFace
	   */
	  'frontFace': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter
	   * @description 
	   * warning return appropriate value by the parameter 'pname'
	   */
	  'getParameter': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getError
	   */
	  'getError': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/hint
	   */
	  'hint': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isEnabled
	   */
	  'isEnabled': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/lineWidth
	   */
	  'lineWidth': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/pixelStorei
	   */
	  'pixelStorei': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/polygonOffset
	   */
	  'polygonOffset': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/sampleCoverage
	   */
	  'sampleCoverage': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilFunc
	   */
	  'stencilFunc': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilFuncSeparate
	   */
	  'stencilFuncSeparate': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilMask
	   */
	  'stencilMask': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilMaskSeparate
	   */
	  'stencilMaskSeparate': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilOp
	   */
	  'stencilOp': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilOpSeparate
	   */
	  'stencilOpSeparate': { code: 0, return: 0, replace: 0 }
	};

	var Encrypt_Buffers = {
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer
	   */
	  'bindBuffer': { code: 0, return: 0, replace: 1, ptIndex: [1] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData
	   */
	  'bufferData': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferSubData
	   */
	  'bufferSubData': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createBuffer
	   */
	  'createBuffer': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/deleteBuffer
	   */
	  'deleteBuffer': { code: 0, return: 0, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getBufferParameter
	   */
	  'getBufferParameter': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isBuffer
	   */
	  'isBuffer': { code: 0, return: 1, replace: 0 }
	};

	var Encrypt_Framebuffers = {
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindFramebuffer
	   */
	  'bindFramebuffer': { code: 0, return: 0, replace: 1, ptIndex: [1] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/checkFramebufferStatus
	   */
	  'checkFramebufferStatus': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createFramebuffer
	   */
	  'createFramebuffer': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/deleteFramebuffer
	   */
	  'deleteFramebuffer': { code: 0, return: 0, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/framebufferRenderbuffer
	   */
	  'framebufferRenderbuffer': { code: 0, return: 0, replace: 1, ptIndex: [3] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/framebufferTexture2D
	   */
	  'framebufferTexture2D': { code: 0, return: 0, replace: 1, ptIndex: [3] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getFramebufferAttachmentParameter
	   */
	  'getFramebufferAttachmentParameter': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isFramebuffer
	   */
	  'isFramebuffer': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/readPixels
	   */
	  'readPixels': { code: 0, return: 0, replace: 0 }
	};

	var Encrypt_Renderbuffers = {
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindRenderbuffer
	   */
	  'bindRenderbuffer': { code: 0, return: 0, replace: 1, ptIndex: [1] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createRenderbuffer
	   */
	  'createRenderbuffer': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/deleteRenderbuffer
	   */
	  'deleteRenderbuffer': { code: 0, return: 0, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getRenderbufferParameter
	   */
	  'getRenderbufferParameter': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isRenderbuffer
	   */
	  'isRenderbuffer': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/renderbufferStorage
	   */
	  'renderbufferStorage': { code: 0, return: 0, replace: 0 }
	};

	var Encrypt_Textures = {
	  /**
	  * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindTexture
	  */
	  'bindTexture': { code: 0, return: 0, replace: 1, ptIndex: [1] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/compressedTexImage2D
	   */
	  'compressedTexImage2D': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/copyTexImage2D
	   */
	  'copyTexImage2D': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/copyTexSubImage2D
	   */
	  'copyTexSubImage2D': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createTexture
	   */
	  'createTexture': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/deleteTexture
	   */
	  'deleteTexture': { code: 0, return: 0, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/generateMipmap
	   */
	  'generateMipmap': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
	   */
	  'getTexParameter': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isTexture
	   */
	  'isTexture': { code: 0, return: 1, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D
	   */
	  'texImage2D': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texSubImage2D
	   */
	  'texSubImage2D': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
	   */
	  'texParameterf': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
	   */
	  'texParameteri': { code: 0, return: 0, replace: 0 }
	};

	var Encrypt_Programs_And_Shaders = {
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/attachShader
	   * @augments
	   */
	  'attachShader': { code: 0, return: 0, replace: 2, ptIndex: [0, 1] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindAttribLocation
	   * @augments
	   */
	  'bindAttribLocation': { code: 0, return: 0, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/compileShader
	   */
	  'compileShader': { code: 0, return: 0, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createProgram
	   */
	  'createProgram': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createShader
	   */
	  'createShader': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/deleteProgram
	   */
	  'deleteProgram': { code: 0, return: 0, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/deleteShader
	   */
	  'deleteShader': { code: 0, return: 0, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/detachShader
	   */
	  'detachShader': { code: 0, return: 0, replace: 2, ptIndex: [0, 1] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getAttachedShaders
	   */
	  'getAttachedShaders': { code: 0, return: 1, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getProgramParameter
	   */
	  'getProgramParameter': { code: 0, return: 1, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getProgramInfoLog
	   */
	  'getProgramInfoLog': { code: 0, return: 1, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderParameter
	   */
	  'getShaderParameter': { code: 0, return: 1, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderPrecisionFormat
	   */
	  'getShaderPrecisionFormat': { code: 0, return: 1, replace: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderInfoLog
	   */
	  'getShaderInfoLog': { code: 0, return: 1, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderSource
	   */
	  'getShaderSource': { code: 0, return: 1, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isProgram
	   */
	  'isProgram': { code: 0, return: 1, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isShader
	   */
	  'isShader': { code: 0, return: 1, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/linkProgram
	   */
	  'linkProgram': { code: 0, return: 0, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/shaderSource
	   */
	  'shaderSource': { code: 0, return: 0, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/useProgram
	   */
	  'useProgram': { code: 0, return: 0, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/validateProgram
	   */
	  'validateProgram': { code: 0, return: 0, replace: 1, ptIndex: [0] }
	};

	var Encrypt_Uniforms_And_Attributes = {
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/disableVertexAttribArray
	   */
	  'disableVertexAttribArray': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/enableVertexAttribArray
	   */
	  'enableVertexAttribArray': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getActiveAttrib
	   */
	  'getActiveAttrib': { code: 0, return: 1, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getActiveUniform
	   */
	  'getActiveUniform': { code: 0, return: 1, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getAttribLocation
	   * }{ debug return directly,no need to cache,
	   */
	  'getAttribLocation': { code: 0, return: 0, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getUniformLocation
	   */
	  'getUniformLocation': { code: 0, return: 1, replace: 1, ptIndex: [0] },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getVertexAttrib
	   */
	  'getVertexAttrib': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getVertexAttribOffset
	   */
	  'getVertexAttribOffset': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer
	   */
	  'vertexAttribPointer': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/uniformMatrix
	   */
	  'uniformMatrix2fv': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  'uniformMatrix3fv': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  'uniformMatrix4fv': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/uniform
	   */
	  'uniform1f': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  'uniform1fv': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  'uniform1i': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  'uniform1iv': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  'uniform2f': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  'uniform2fv': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  'uniform2i': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  'uniform2iv': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  'uniform3f': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  'uniform3fv': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  'uniform3i': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  'uniform3iv': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  'uniform4f': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  'uniform4fv': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  'uniform4i': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  'uniform4iv': { code: 0, return: 0, replace: 1, ptIndex: [0], change: 1 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttrib
	   */
	  'vertexAttrib1f': { code: 0, return: 0, replace: 0 },
	  'vertexAttrib2f': { code: 0, return: 0, replace: 0 },
	  'vertexAttrib3f': { code: 0, return: 0, replace: 0 },
	  'vertexAttrib4f': { code: 0, return: 0, replace: 0 },
	  'vertexAttrib1fv': { code: 0, return: 0, replace: 0 },
	  'vertexAttrib2fv': { code: 0, return: 0, replace: 0 },
	  'vertexAttrib3fv': { code: 0, return: 0, replace: 0 },
	  'vertexAttrib4fv': { code: 0, return: 0, replace: 0 }
	};

	var Encrypt_Drawing_Buffers = {
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clear
	   */
	  'clear': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays
	   */
	  'drawArrays': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements
	   */
	  'drawElements': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/finish
	   */
	  'finish': { code: 0, return: 0, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/flush
	   */
	  'flush': { code: 0, return: 0, replace: 0 }
	};

	var Encrypt_Working_With_Extensions = {
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getSupportedExtensions
	   */
	  'getSupportedExtensions': { code: 0, return: 1, replace: 0 },
	  /**
	   * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getExtension
	   */
	  'getExtension': { code: 0, return: 1, replace: 0 }

	  /** 
	   * only in webgl2
	  */
	};
	var Encrypt = merge$2({}, Encrypt_Buffers, Encrypt_Drawing_Buffers, Encrypt_Framebuffers, Encrypt_Programs_And_Shaders, Encrypt_Renderbuffers, Encrypt_State_Information, Encrypt_Textures, Encrypt_Uniforms_And_Attributes, Encrypt_Viewing_And_Clipping, Encrypt_WebGLContext, Encrypt_Working_With_Extensions);

	var Encrypt$1 = /*#__PURE__*/Object.freeze({
		default: Encrypt,
		__moduleExports: Encrypt
	});

	var Record$2 = ( Record$1 && Record_1 ) || Record$1;

	var Encrypt$2 = ( Encrypt$1 && Encrypt ) || Encrypt$1;

	/**
	 * @author yellow date 2018/1/4
	 */

	/** 
	 * 
	*/

	/**
	 * @class
	 */

	var Recorder = function () {
	  function Recorder(glContext) {
	    var storeInstance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	    classCallCheck(this, Recorder);

	    /**
	     * @type {GLContext}
	     */
	    this._glContext = glContext;
	    /**
	     * @type {Array}
	     */
	    this._records = [];
	    /**
	     * 注册到全局实例中
	     */
	    storeInstance ? Recorder.instances[glContext.id] = this : null;
	  }
	  /**
	   * 新增record
	   * @param {Record} record 
	   */


	  createClass(Recorder, [{
	    key: 'increase',
	    value: function increase(record) {
	      this._records.push(record);
	    }
	    /**
	     * convert to gl commands collection
	     */

	  }, {
	    key: 'toInstruction',
	    value: function toInstruction(programId) {
	      var reocrds = this._records,
	          len = reocrds.length,
	          record = new Record$2('useProgram', null);
	      record.exactIndexByValue(0, programId);
	      return [record].concat(reocrds.splice(0, len));
	    }
	    /** 
	     * convert to commands collection which not just webgl operation
	     * makes recorder as a general logger.(such as htmlElement logger)
	    */

	  }, {
	    key: 'toOperation',
	    value: function toOperation() {
	      var len = this._records.length,
	          list = this._records.splice(0, len);
	      return list;
	    }
	  }]);
	  return Recorder;
	}();

	Recorder.instances = {};

	var Recorder_1 = Recorder;

	var Recorder$1 = /*#__PURE__*/Object.freeze({
		default: Recorder_1,
		__moduleExports: Recorder_1
	});

	/**
	 * 执行器，用于执行Record操作，每个glCanvas自带一个Actuator
	 * @author yellow date 2018/1/3
	 */

	/**
	 * Cahce store
	 */
	var CACHE = {
	  /**
	   * store program
	   */
	  PROGRAM: {},
	  /**
	  * store shader
	  */
	  SHADER: {},
	  /**
	  * store texture
	  */
	  TEXTURE: {},
	  /**
	   * store BUFFER
	   */
	  BUFFER: {},
	  /**
	   * store FRAMEBUFFER
	   */
	  FRAMEBUFFER: {},
	  /**
	   * store RENDERBUFFER
	   */
	  RENDERBUFFER: {},
	  /**
	   * store uinform
	   */
	  UNIFOMR: {},
	  /**
	   * store vao
	   */
	  VERTEXARRAYOBJRCT: {}
	  /**
	   * @class
	   */
	};
	var Actuator = function () {
	  /**
	   * initial Actuator by gl context
	   * @param {WebGLRenderingContext} gl 
	   */
	  function Actuator(gl) {
	    classCallCheck(this, Actuator);

	    /**
	     * @type {Array}
	     */
	    this._records = [];
	    /**
	     * @type {WebGLRenderingContext}
	     */
	    this._gl = gl;
	    /**
	     * @type {Boolean}
	     */
	    this._debug = false;
	    /**
	     * debug logger
	     * @type {Array}
	     */
	    this._logger = [];
	    /**
	     * store program while in using
	     */
	    this._currentProgram = null;
	  }
	  /**
	   * 
	   */


	  createClass(Actuator, [{
	    key: 'play',

	    /**
	     * 执行
	     * @param {Array} records 
	     */
	    value: function play() {
	      var records = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	      this._records = this._records.concat(records);
	      var gl = this._gl;
	      if (gl) {
	        var record = this._records.shift();
	        while (record) {
	          var opName = record.opName,
	              encrypt = Encrypt$2[opName] || {};
	          //replace the reference object
	          if (encrypt.replace > 0) {
	            var refObjects = {};
	            for (var key in record.ptMapIndex) {
	              var target = record.ptMapIndex[key],
	                  ptIndex = target.index,
	                  ptName = target.id,
	                  cacheName = target.prefix,
	                  refObject = CACHE[cacheName][ptName];
	              refObjects[ptIndex] = refObject;
	            }
	            record.replace(refObjects);
	          }
	          //if need to return and cache,
	          if (encrypt.return) {
	            // case of uniform returned is not string
	            var returnId = isString$1(record.returnId) ? record.returnId : stamp$1(record.returnId),
	                returanIdPrefix = record.returanIdPrefix;
	            CACHE[returanIdPrefix][returnId] = gl[opName].apply(gl, record.args);
	          } else {
	            gl[opName].apply(gl, record.args);
	          }
	          //debug logger
	          this._debug ? this._logger.push(opName) : null;
	          //next record
	          record = this._records.shift();
	        }
	      }
	    }
	  }, {
	    key: 'currentProgram',
	    set: function set$$1(v) {
	      this._currentProgram = v;
	    },
	    get: function get$$1() {
	      return this._currentProgram;
	    }
	    /**
	     * 
	     * @param {WebGLRenderingContext} v
	     */

	  }, {
	    key: 'gl',
	    set: function set$$1(v) {
	      this._gl = v;
	      this.play();
	    }
	    /**
	     * get the excuted commands
	     */

	  }, {
	    key: 'logger',
	    get: function get$$1() {
	      return this._logger;
	    }
	    /**
	     * 
	     */

	  }, {
	    key: 'debug',
	    get: function get$$1() {
	      return this._debug;
	    }
	    /**
	     * @param {Boolean} v
	     */
	    ,
	    set: function set$$1(v) {
	      this._debug = v;
	      !v ? this._logger = [] : null;
	    }
	  }]);
	  return Actuator;
	}();

	var Actuator_1 = Actuator;

	var Actuator$1 = /*#__PURE__*/Object.freeze({
		default: Actuator_1,
		__moduleExports: Actuator_1
	});

	/**
	 * reference https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
	 * reference https://github.com/uber/luma.gl/blob/master/src/webgl-utils/constants.js
	 * reference https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Types
	 * Store GLEnum value the boost glContext setting
	 * webgl2 used within a WebGL2RenderingContext,add GLint64(GLuint64EXT) 
	 * @author yellow date 2017/6/15
	 */
	var GLConstants = {
	    /**
	     * 深度缓冲，常用与 gl.clear(gl.Enum)
	     * Passed to clear to clear the current depth buffer.
	     */
	    DEPTH_BUFFER_BIT: 0x00000100,
	    /**
	     * 模版缓冲，常用与 gl.clear(gl.Enum)
	     * Passed to clear to clear the current stencil buffer.
	     */
	    STENCIL_BUFFER_BIT: 0x00000400,
	    /**
	     * 当前可写的颜色缓冲，常用与 gl.clear(gl.Enum)
	     *  Passed to clear to clear the current color buffer.
	     */
	    COLOR_BUFFER_BIT: 0x00004000, //
	    // Rendering primitives
	    // Constants passed to drawElements() or drawArrays() to specify what kind of primitive to render.
	    POINTS: 0x0000, // Passed to drawElements or drawArrays to draw single points.
	    LINES: 0x0001, // Passed to drawElements or drawArrays to draw lines. Each vertex connects to the one after it.
	    LINE_LOOP: 0x0002, // Passed to drawElements or drawArrays to draw lines. Each set of two vertices is treated as a separate line segment.
	    LINE_STRIP: 0x0003, // Passed to drawElements or drawArrays to draw a connected group of line segments from the first vertex to the last.
	    TRIANGLES: 0x0004, // Passed to drawElements or drawArrays to draw triangles. Each set of three vertices creates a separate triangle.
	    TRIANGLE_STRIP: 0x0005, // Passed to drawElements or drawArrays to draw a connected group of triangles.
	    TRIANGLE_FAN: 0x0006, // Passed to drawElements or drawArrays to draw a connected group of triangles. Each vertex connects to the previous and the first vertex in the fan.
	    // Blending modes
	    // Constants passed to blendFunc() or blendFuncSeparate() to specify the blending mode (for both, RBG and alpha, or separately).
	    ZERO: 0, // Passed to blendFunc or blendFuncSeparate to turn off a component.
	    ONE: 1, // Passed to blendFunc or blendFuncSeparate to turn on a component.
	    SRC_COLOR: 0x0300, // Passed to blendFunc or blendFuncSeparate to multiply a component by the source elements color.
	    ONE_MINUS_SRC_COLOR: 0x0301, // Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the source elements color.
	    SRC_ALPHA: 0x0302, // Passed to blendFunc or blendFuncSeparate to multiply a component by the source's alpha.
	    /**
	     * 传递给BleandFunc或BlendFuncSeparate使用，用来指定混合计算颜色时，基于源颜色的aplha所占比。
	     * Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the source's alpha.
	     */
	    ONE_MINUS_SRC_ALPHA: 0x0303,
	    DST_ALPHA: 0x0304, // Passed to blendFunc or blendFuncSeparate to multiply a component by the destination's alpha.
	    ONE_MINUS_DST_ALPHA: 0x0305, // Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the destination's alpha.
	    DST_COLOR: 0x0306, // Passed to blendFunc or blendFuncSeparate to multiply a component by the destination's color.
	    ONE_MINUS_DST_COLOR: 0x0307, // Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the destination's color.
	    SRC_ALPHA_SATURATE: 0x0308, // Passed to blendFunc or blendFuncSeparate to multiply a component by the minimum of source's alpha or one minus the destination's alpha.
	    CONSTANT_COLOR: 0x8001, // Passed to blendFunc or blendFuncSeparate to specify a constant color blend function.
	    ONE_MINUS_CONSTANT_COLOR: 0x8002, // Passed to blendFunc or blendFuncSeparate to specify one minus a constant color blend function.
	    CONSTANT_ALPHA: 0x8003, // Passed to blendFunc or blendFuncSeparate to specify a constant alpha blend function.
	    ONE_MINUS_CONSTANT_ALPHA: 0x8004, // Passed to blendFunc or blendFuncSeparate to specify one minus a constant alpha blend function.
	    // Blending equations
	    // Constants passed to blendEquation() or blendEquationSeparate() to control
	    // how the blending is calculated (for both, RBG and alpha, or separately).
	    FUNC_ADD: 0x8006, // Passed to blendEquation or blendEquationSeparate to set an addition blend function.
	    FUNC_SUBSTRACT: 0x800A, // Passed to blendEquation or blendEquationSeparate to specify a subtraction blend function (source - destination).
	    FUNC_REVERSE_SUBTRACT: 0x800B, // Passed to blendEquation or blendEquationSeparate to specify a reverse subtraction blend function (destination - source).
	    // Getting GL parameter information
	    // Constants passed to getParameter() to specify what information to return.
	    BLEND_EQUATION: 0x8009, // Passed to getParameter to get the current RGB blend function.
	    BLEND_EQUATION_RGB: 0x8009, // Passed to getParameter to get the current RGB blend function. Same as BLEND_EQUATION
	    BLEND_EQUATION_ALPHA: 0x883D, // Passed to getParameter to get the current alpha blend function. Same as BLEND_EQUATION
	    BLEND_DST_RGB: 0x80C8, // Passed to getParameter to get the current destination RGB blend function.
	    BLEND_SRC_RGB: 0x80C9, // Passed to getParameter to get the current destination RGB blend function.
	    BLEND_DST_ALPHA: 0x80CA, // Passed to getParameter to get the current destination alpha blend function.
	    BLEND_SRC_ALPHA: 0x80CB, // Passed to getParameter to get the current source alpha blend function.
	    BLEND_COLOR: 0x8005, // Passed to getParameter to return a the current blend color.
	    ARRAY_BUFFER_BINDING: 0x8894, // Passed to getParameter to get the array buffer binding.
	    ELEMENT_ARRAY_BUFFER_BINDING: 0x8895, // Passed to getParameter to get the current element array buffer.
	    LINE_WIDTH: 0x0B21, // Passed to getParameter to get the current lineWidth (set by the lineWidth method).
	    ALIASED_POINT_SIZE_RANGE: 0x846D, // Passed to getParameter to get the current size of a point drawn with gl.POINTS
	    ALIASED_LINE_WIDTH_RANGE: 0x846E, // Passed to getParameter to get the range of available widths for a line. Returns a length-2 array with the lo value at 0, and hight at 1.
	    CULL_FACE_MODE: 0x0B45, // Passed to getParameter to get the current value of cullFace. Should return FRONT, BACK, or FRONT_AND_BACK
	    FRONT_FACE: 0x0B46, // Passed to getParameter to determine the current value of frontFace. Should return CW or CCW.
	    DEPTH_RANGE: 0x0B70, // Passed to getParameter to return a length-2 array of floats giving the current depth range.
	    DEPTH_WRITEMASK: 0x0B72, // Passed to getParameter to determine if the depth write mask is enabled.
	    DEPTH_CLEAR_VALUE: 0x0B73, // Passed to getParameter to determine the current depth clear value.
	    DEPTH_FUNC: 0x0B74, // Passed to getParameter to get the current depth function. Returns NEVER, ALWAYS, LESS, EQUAL, LEQUAL, GREATER, GEQUAL, or NOTEQUAL.
	    STENCIL_CLEAR_VALUE: 0x0B91, // Passed to getParameter to get the value the stencil will be cleared to.
	    STENCIL_FUNC: 0x0B92, // Passed to getParameter to get the current stencil function. Returns NEVER, ALWAYS, LESS, EQUAL, LEQUAL, GREATER, GEQUAL, or NOTEQUAL.
	    STENCIL_FAIL: 0x0B94, // Passed to getParameter to get the current stencil fail function. Should return KEEP, REPLACE, INCR, DECR, INVERT, INCR_WRAP, or DECR_WRAP.
	    STENCIL_PASS_DEPTH_FAIL: 0x0B95, // Passed to getParameter to get the current stencil fail function should the depth buffer test fail. Should return KEEP, REPLACE, INCR, DECR, INVERT, INCR_WRAP, or DECR_WRAP.
	    STENCIL_PASS_DEPTH_PASS: 0x0B96, // Passed to getParameter to get the current stencil fail function should the depth buffer test pass. Should return KEEP, REPLACE, INCR, DECR, INVERT, INCR_WRAP, or DECR_WRAP.
	    STENCIL_REF: 0x0B97, // Passed to getParameter to get the reference value used for stencil tests.
	    STENCIL_VALUE_MASK: 0x0B93,
	    STENCIL_WRITEMASK: 0x0B98,
	    STENCIL_BACK_FUNC: 0x8800,
	    STENCIL_BACK_FAIL: 0x8801,
	    STENCIL_BACK_PASS_DEPTH_FAIL: 0x8802,
	    STENCIL_BACK_PASS_DEPTH_PASS: 0x8803,
	    STENCIL_BACK_REF: 0x8CA3,
	    STENCIL_BACK_VALUE_MASK: 0x8CA4,
	    STENCIL_BACK_WRITEMASK: 0x8CA5,
	    VIEWPORT: 0x0BA2, // Returns an Int32Array with four elements for the current viewport dimensions.
	    SCISSOR_BOX: 0x0C10, // Returns an Int32Array with four elements for the current scissor box dimensions.
	    COLOR_CLEAR_VALUE: 0x0C22,
	    COLOR_WRITEMASK: 0x0C23,
	    UNPACK_ALIGNMENT: 0x0CF5,
	    PACK_ALIGNMENT: 0x0D05,
	    MAX_TEXTURE_SIZE: 0x0D33,
	    MAX_VIEWPORT_DIMS: 0x0D3A,
	    SUBPIXEL_BITS: 0x0D50,
	    RED_BITS: 0x0D52,
	    GREEN_BITS: 0x0D53,
	    BLUE_BITS: 0x0D54,
	    ALPHA_BITS: 0x0D55,
	    DEPTH_BITS: 0x0D56,
	    STENCIL_BITS: 0x0D57,
	    POLYGON_OFFSET_UNITS: 0x2A00,
	    POLYGON_OFFSET_FACTOR: 0x8038,
	    TEXTURE_BINDING_2D: 0x8069,
	    SAMPLE_BUFFERS: 0x80A8,
	    SAMPLES: 0x80A9,
	    SAMPLE_COVERAGE_VALUE: 0x80AA,
	    SAMPLE_COVERAGE_INVERT: 0x80AB,
	    COMPRESSED_TEXTURE_FORMATS: 0x86A3,
	    VENDOR: 0x1F00,
	    RENDERER: 0x1F01,
	    VERSION: 0x1F02,
	    IMPLEMENTATION_COLOR_READ_TYPE: 0x8B9A,
	    IMPLEMENTATION_COLOR_READ_FORMAT: 0x8B9B,
	    BROWSER_DEFAULT_WEBGL: 0x9244,

	    // Buffers
	    // Constants passed to bufferData(), bufferSubData(), bindBuffer(), or
	    // getBufferParameter().

	    STATIC_DRAW: 0x88E4, // Passed to bufferData as a hint about whether the contents of the buffer are likely to be used often and not change often.
	    STREAM_DRAW: 0x88E0, // Passed to bufferData as a hint about whether the contents of the buffer are likely to not be used often.
	    DYNAMIC_DRAW: 0x88E8, // Passed to bufferData as a hint about whether the contents of the buffer are likely to be used often and change often.
	    ARRAY_BUFFER: 0x8892, // Passed to bindBuffer or bufferData to specify the type of buffer being used.
	    ELEMENT_ARRAY_BUFFER: 0x8893, // Passed to bindBuffer or bufferData to specify the type of buffer being used.
	    BUFFER_SIZE: 0x8764, // Passed to getBufferParameter to get a buffer's size.
	    BUFFER_USAGE: 0x8765, // Passed to getBufferParameter to get the hint for the buffer passed in when it was created.

	    // Vertex attributes
	    // Constants passed to getVertexAttrib().

	    CURRENT_VERTEX_ATTRIB: 0x8626, // Passed to getVertexAttrib to read back the current vertex attribute.
	    VERTEX_ATTRIB_ARRAY_ENABLED: 0x8622,
	    VERTEX_ATTRIB_ARRAY_SIZE: 0x8623,
	    VERTEX_ATTRIB_ARRAY_STRIDE: 0x8624,
	    VERTEX_ATTRIB_ARRAY_TYPE: 0x8625,
	    VERTEX_ATTRIB_ARRAY_NORMALIZED: 0x886A,
	    VERTEX_ATTRIB_ARRAY_POINTER: 0x8645,
	    VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 0x889F,

	    // Culling
	    // Constants passed to cullFace().

	    CULL_FACE: 0x0B44, // Passed to enable/disable to turn on/off culling. Can also be used with getParameter to find the current culling method.
	    FRONT: 0x0404, // Passed to cullFace to specify that only front faces should be drawn.
	    BACK: 0x0405, // Passed to cullFace to specify that only back faces should be drawn.
	    FRONT_AND_BACK: 0x0408, // Passed to cullFace to specify that front and back faces should be drawn.

	    // Enabling and disabling
	    // Constants passed to enable() or disable().

	    BLEND: 0x0BE2, // Passed to enable/disable to turn on/off blending. Can also be used with getParameter to find the current blending method.
	    DEPTH_TEST: 0x0B71, // Passed to enable/disable to turn on/off the depth test. Can also be used with getParameter to query the depth test.
	    DITHER: 0x0BD0, // Passed to enable/disable to turn on/off dithering. Can also be used with getParameter to find the current dithering method.
	    POLYGON_OFFSET_FILL: 0x8037, // Passed to enable/disable to turn on/off the polygon offset. Useful for rendering hidden-line images, decals, and or solids with highlighted edges. Can also be used with getParameter to query the scissor test.
	    SAMPLE_ALPHA_TO_COVERAGE: 0x809E, // Passed to enable/disable to turn on/off the alpha to coverage. Used in multi-sampling alpha channels.
	    SAMPLE_COVERAGE: 0x80A0, // Passed to enable/disable to turn on/off the sample coverage. Used in multi-sampling.
	    SCISSOR_TEST: 0x0C11, // Passed to enable/disable to turn on/off the scissor test. Can also be used with getParameter to query the scissor test.
	    /**
	     *  模版缓冲区测试，发生在透明度测试之后，和深度测试之前
	     *  Passed to enable/disable to turn on/off the stencil test. Can also be used with getParameter to query the stencil test.
	     */
	    STENCIL_TEST: 0x0B90,

	    // Errors
	    // Constants returned from getError().

	    NO_ERROR: 0, // Returned from getError.
	    INVALID_ENUM: 0x0500, //  Returned from getError.
	    INVALID_VALUE: 0x0501, //  Returned from getError.
	    INVALID_OPERATION: 0x0502, //  Returned from getError.
	    OUT_OF_MEMORY: 0x0505, //  Returned from getError.
	    CONTEXT_LOST_WEBGL: 0x9242, //  Returned from getError.

	    // Front face directions
	    // Constants passed to frontFace().

	    CW: 0x0900, //  Passed to frontFace to specify the front face of a polygon is drawn in the clockwise direction
	    CCW: 0x0901, // Passed to frontFace to specify the front face of a polygon is drawn in the counter clockwise direction

	    // Hints
	    // Constants passed to hint()

	    DONT_CARE: 0x1100, // There is no preference for this behavior.
	    FASTEST: 0x1101, // The most efficient behavior should be used.
	    NICEST: 0x1102, // The most correct or the highest quality option should be used.
	    GENERATE_MIPMAP_HINT: 0x8192, // Hint for the quality of filtering when generating mipmap images with generateMipmap().

	    // Data types

	    BYTE: 0x1400,
	    /**
	     * 无符号byte,即每通道8bit 适合 gl.RGBA
	     */
	    UNSIGNED_BYTE: 0x1401,
	    SHORT: 0x1402,
	    UNSIGNED_SHORT: 0x1403,
	    INT: 0x1404,
	    UNSIGNED_INT: 0x1405,
	    FLOAT: 0x1406,

	    // Pixel formats

	    DEPTH_COMPONENT: 0x1902,
	    ALPHA: 0x1906,
	    /**
	     * RGB颜色表示Texture，Image颜色读取规则
	     */
	    RGB: 0x1907,
	    RGBA: 0x1908,
	    LUMINANCE: 0x1909,
	    LUMINANCE_ALPHA: 0x190A,

	    // Pixel types

	    // UNSIGNED_BYTE: 0x1401,
	    UNSIGNED_SHORT_4_4_4_4: 0x8033,
	    UNSIGNED_SHORT_5_5_5_1: 0x8034,
	    UNSIGNED_SHORT_5_6_5: 0x8363,

	    // Shaders
	    // Constants passed to createShader() or getShaderParameter()

	    FRAGMENT_SHADER: 0x8B30, // Passed to createShader to define a fragment shader.
	    VERTEX_SHADER: 0x8B31, // Passed to createShader to define a vertex shader
	    /**
	     * shader 编译状态，
	     * Passed to getShaderParamter to get the status of the compilation. Returns false if the shader was not compiled. You can then query getShaderInfoLog to find the exact error
	     */
	    COMPILE_STATUS: 0x8B81,
	    DELETE_STATUS: 0x8B80, // Passed to getShaderParamter to determine if a shader was deleted via deleteShader. Returns true if it was, false otherwise.
	    LINK_STATUS: 0x8B82, // Passed to getProgramParameter after calling linkProgram to determine if a program was linked correctly. Returns false if there were errors. Use getProgramInfoLog to find the exact error.
	    VALIDATE_STATUS: 0x8B83, // Passed to getProgramParameter after calling validateProgram to determine if it is valid. Returns false if errors were found.
	    ATTACHED_SHADERS: 0x8B85, // Passed to getProgramParameter after calling attachShader to determine if the shader was attached correctly. Returns false if errors occurred.
	    /**
	     * 获取program里可用的attributes，【map到program里方便upload属性】
	     */
	    ACTIVE_ATTRIBUTES: 0x8B89, // Passed to getProgramParameter to get the number of attributes active in a program.
	    /**
	     * 获取program里可用的uniforms，【map到program里方便upload属性】
	     */
	    ACTIVE_UNIFORMS: 0x8B86, // Passed to getProgramParamter to get the number of uniforms active in a program.
	    MAX_VERTEX_ATTRIBS: 0x8869,
	    MAX_VERTEX_UNIFORM_VECTORS: 0x8DFB,
	    MAX_VARYING_VECTORS: 0x8DFC,
	    MAX_COMBINED_TEXTURE_IMAGE_UNITS: 0x8B4D,
	    MAX_VERTEX_TEXTURE_IMAGE_UNITS: 0x8B4C,
	    MAX_TEXTURE_IMAGE_UNITS: 0x8872, // Implementation dependent number of maximum texture units. At least 8.
	    MAX_FRAGMENT_UNIFORM_VECTORS: 0x8DFD,
	    SHADER_TYPE: 0x8B4F,
	    SHADING_LANGUAGE_VERSION: 0x8B8C,
	    CURRENT_PROGRAM: 0x8B8D,

	    // Depth or stencil tests
	    // Constants passed to depthFunc() or stencilFunc().

	    NEVER: 0x0200, //  Passed to depthFunction or stencilFunction to specify depth or stencil tests will never pass. i.e. Nothing will be drawn.
	    ALWAYS: 0x0207, //  Passed to depthFunction or stencilFunction to specify depth or stencil tests will always pass. i.e. Pixels will be drawn in the order they are drawn.
	    LESS: 0x0201, //  Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is less than the stored value.
	    EQUAL: 0x0202, //  Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is equals to the stored value.
	    /**
	     * 测试对比条件，当参考值小于等于模板值时，通过测试，常用于深度测试
	     * Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is less than or equal to the stored value.
	     */
	    LEQUAL: 0x0203,
	    /**
	     * 测试对比条件，当参考值大于模版值时，通过测试
	     * Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is greater than the stored value.
	     */
	    GREATER: 0x0204,
	    GEQUAL: 0x0206, //  Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is greater than or equal to the stored value.
	    NOTEQUAL: 0x0205, //  Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is not equal to the stored value.

	    // Stencil actions
	    // Constants passed to stencilOp().

	    KEEP: 0x1E00,
	    REPLACE: 0x1E01,
	    INCR: 0x1E02,
	    DECR: 0x1E03,
	    INVERT: 0x150A,
	    INCR_WRAP: 0x8507,
	    DECR_WRAP: 0x8508,

	    // Textures
	    // Constants passed to texParameteri(),
	    // texParameterf(), bindTexture(), texImage2D(), and others.

	    NEAREST: 0x2600,
	    LINEAR: 0x2601,
	    NEAREST_MIPMAP_NEAREST: 0x2700,
	    LINEAR_MIPMAP_NEAREST: 0x2701,
	    NEAREST_MIPMAP_LINEAR: 0x2702,
	    LINEAR_MIPMAP_LINEAR: 0x2703,
	    TEXTURE_MAG_FILTER: 0x2800,
	    TEXTURE_MIN_FILTER: 0x2801,
	    TEXTURE_WRAP_S: 0x2802,
	    TEXTURE_WRAP_T: 0x2803,
	    TEXTURE_2D: 0x0DE1,
	    TEXTURE: 0x1702,
	    TEXTURE_CUBE_MAP: 0x8513,
	    TEXTURE_BINDING_CUBE_MAP: 0x8514,
	    TEXTURE_CUBE_MAP_POSITIVE_X: 0x8515,
	    TEXTURE_CUBE_MAP_NEGATIVE_X: 0x8516,
	    TEXTURE_CUBE_MAP_POSITIVE_Y: 0x8517,
	    TEXTURE_CUBE_MAP_NEGATIVE_Y: 0x8518,
	    TEXTURE_CUBE_MAP_POSITIVE_Z: 0x8519,
	    TEXTURE_CUBE_MAP_NEGATIVE_Z: 0x851A,
	    MAX_CUBE_MAP_TEXTURE_SIZE: 0x851C,
	    // TEXTURE0 - 31 0x84C0 - 0x84DF A texture unit.
	    TEXTURE0: 0x84C0, // A texture unit.
	    TEXTURE1: 0x84C1,
	    TEXTURE2: 0x84C2,
	    TEXTURE3: 0x84C3,
	    TEXTURE4: 0x84C4,
	    TEXTURE5: 0x84C5,
	    TEXTURE6: 0x84C6,
	    TEXTURE7: 0x84C7,
	    TEXTURE8: 0x84C8,
	    TEXTURE9: 0x84C9,
	    TEXTURE10: 0x84CA,
	    TEXTURE11: 0x84CB,
	    TEXTURE12: 0x84CC,
	    TEXTURE13: 0x84CD,
	    TEXTURE14: 0x84CE,
	    TEXTURE15: 0x84CF,
	    TEXTURE16: 0x84D0,
	    // The current active texture unit.
	    ACTIVE_TEXTURE: 0x84E0,
	    REPEAT: 0x2901,
	    CLAMP_TO_EDGE: 0x812F,
	    MIRRORED_REPEAT: 0x8370,

	    // Emulation
	    TEXTURE_WIDTH: 0x1000,
	    TEXTURE_HEIGHT: 0x1001,

	    // Uniform types

	    FLOAT_VEC2: 0x8B50,
	    FLOAT_VEC3: 0x8B51,
	    FLOAT_VEC4: 0x8B52,
	    INT_VEC2: 0x8B53,
	    INT_VEC3: 0x8B54,
	    INT_VEC4: 0x8B55,
	    BOOL: 0x8B56,
	    BOOL_VEC2: 0x8B57,
	    BOOL_VEC3: 0x8B58,
	    BOOL_VEC4: 0x8B59,
	    FLOAT_MAT2: 0x8B5A,
	    FLOAT_MAT3: 0x8B5B,
	    FLOAT_MAT4: 0x8B5C,
	    SAMPLER_2D: 0x8B5E,
	    SAMPLER_CUBE: 0x8B60,

	    // Shader precision-specified types

	    LOW_FLOAT: 0x8DF0,
	    MEDIUM_FLOAT: 0x8DF1,
	    HIGH_FLOAT: 0x8DF2,
	    LOW_INT: 0x8DF3,
	    MEDIUM_INT: 0x8DF4,
	    HIGH_INT: 0x8DF5,

	    // Framebuffers and renderbuffers
	    /**
	     * 绑定framebuffer
	     */
	    FRAMEBUFFER: 0x8D40,
	    /**
	     * 绑定 renderbuffer 
	     */
	    RENDERBUFFER: 0x8D41,
	    RGBA4: 0x8056,
	    RGB5_A1: 0x8057,
	    RGB565: 0x8D62,
	    DEPTH_COMPONENT16: 0x81A5,
	    STENCIL_INDEX: 0x1901,
	    STENCIL_INDEX8: 0x8D48,
	    /**
	     * 一般用于 bufferStorage，支持深度和缓冲区数据存储
	     */
	    DEPTH_STENCIL: 0x84F9,
	    RENDERBUFFER_WIDTH: 0x8D42,
	    RENDERBUFFER_HEIGHT: 0x8D43,
	    RENDERBUFFER_INTERNAL_FORMAT: 0x8D44,
	    RENDERBUFFER_RED_SIZE: 0x8D50,
	    RENDERBUFFER_GREEN_SIZE: 0x8D51,
	    RENDERBUFFER_BLUE_SIZE: 0x8D52,
	    RENDERBUFFER_ALPHA_SIZE: 0x8D53,
	    RENDERBUFFER_DEPTH_SIZE: 0x8D54,
	    RENDERBUFFER_STENCIL_SIZE: 0x8D55,
	    FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 0x8CD0,
	    FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 0x8CD1,
	    FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 0x8CD2,
	    FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 0x8CD3,
	    COLOR_ATTACHMENT0: 0x8CE0,
	    DEPTH_ATTACHMENT: 0x8D00,
	    STENCIL_ATTACHMENT: 0x8D20,
	    /**
	     * 深度和缓冲区附着，webgl2支持
	     */
	    DEPTH_STENCIL_ATTACHMENT: 0x821A,
	    NONE: 0,
	    FRAMEBUFFER_COMPLETE: 0x8CD5,
	    FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 0x8CD6,
	    FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 0x8CD7,
	    FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 0x8CD9,
	    FRAMEBUFFER_UNSUPPORTED: 0x8CDD,
	    FRAMEBUFFER_BINDING: 0x8CA6,
	    RENDERBUFFER_BINDING: 0x8CA7,
	    MAX_RENDERBUFFER_SIZE: 0x84E8,
	    INVALID_FRAMEBUFFER_OPERATION: 0x0506,

	    // READ_FRAMEBUFFER: 0x8CA8,
	    // DRAW_FRAMEBUFFER: 0x8CA9,

	    // Pixel storage modes
	    // Constants passed to pixelStorei().

	    UNPACK_FLIP_Y_WEBGL: 0x9240,
	    UNPACK_PREMULTIPLY_ALPHA_WEBGL: 0x9241,
	    UNPACK_COLORSPACE_CONVERSION_WEBGL: 0x9243,

	    // /////////////////////////////////////////////////////
	    // Additional constants defined WebGL 2
	    // These constants are defined on the WebGL2RenderingContext interface.
	    // All WebGL 1 constants are also available in a WebGL 2 context.
	    // /////////////////////////////////////////////////////

	    // Getting GL parameter information
	    // Constants passed to getParameter()
	    // to specify what information to return.

	    READ_BUFFER: 0x0C02,
	    UNPACK_ROW_LENGTH: 0x0CF2,
	    UNPACK_SKIP_ROWS: 0x0CF3,
	    UNPACK_SKIP_PIXELS: 0x0CF4,
	    PACK_ROW_LENGTH: 0x0D02,
	    PACK_SKIP_ROWS: 0x0D03,
	    PACK_SKIP_PIXELS: 0x0D04,
	    TEXTURE_BINDING_3D: 0x806A,
	    UNPACK_SKIP_IMAGES: 0x806D,
	    UNPACK_IMAGE_HEIGHT: 0x806E,
	    MAX_3D_TEXTURE_SIZE: 0x8073,
	    MAX_ELEMENTS_VERTICES: 0x80E8,
	    MAX_ELEMENTS_INDICES: 0x80E9,
	    MAX_TEXTURE_LOD_BIAS: 0x84FD,
	    MAX_FRAGMENT_UNIFORM_COMPONENTS: 0x8B49,
	    MAX_VERTEX_UNIFORM_COMPONENTS: 0x8B4A,
	    MAX_ARRAY_TEXTURE_LAYERS: 0x88FF,
	    MIN_PROGRAM_TEXEL_OFFSET: 0x8904,
	    MAX_PROGRAM_TEXEL_OFFSET: 0x8905,
	    MAX_VARYING_COMPONENTS: 0x8B4B,
	    FRAGMENT_SHADER_DERIVATIVE_HINT: 0x8B8B,
	    RASTERIZER_DISCARD: 0x8C89,
	    VERTEX_ARRAY_BINDING: 0x85B5,
	    MAX_VERTEX_OUTPUT_COMPONENTS: 0x9122,
	    MAX_FRAGMENT_INPUT_COMPONENTS: 0x9125,
	    MAX_SERVER_WAIT_TIMEOUT: 0x9111,
	    MAX_ELEMENT_INDEX: 0x8D6B,

	    // Textures
	    // Constants passed to texParameteri(),
	    // texParameterf(), bindTexture(), texImage2D(), and others.

	    RED: 0x1903,
	    RGB8: 0x8051,
	    RGBA8: 0x8058,
	    RGB10_A2: 0x8059,
	    TEXTURE_3D: 0x806F,
	    TEXTURE_WRAP_R: 0x8072,
	    TEXTURE_MIN_LOD: 0x813A,
	    TEXTURE_MAX_LOD: 0x813B,
	    TEXTURE_BASE_LEVEL: 0x813C,
	    TEXTURE_MAX_LEVEL: 0x813D,
	    TEXTURE_COMPARE_MODE: 0x884C,
	    TEXTURE_COMPARE_FUNC: 0x884D,
	    SRGB: 0x8C40,
	    SRGB8: 0x8C41,
	    SRGB8_ALPHA8: 0x8C43,
	    COMPARE_REF_TO_TEXTURE: 0x884E,
	    RGBA32F: 0x8814,
	    RGB32F: 0x8815,
	    RGBA16F: 0x881A,
	    RGB16F: 0x881B,
	    TEXTURE_2D_ARRAY: 0x8C1A,
	    TEXTURE_BINDING_2D_ARRAY: 0x8C1D,
	    R11F_G11F_B10F: 0x8C3A,
	    RGB9_E5: 0x8C3D,
	    RGBA32UI: 0x8D70,
	    RGB32UI: 0x8D71,
	    RGBA16UI: 0x8D76,
	    RGB16UI: 0x8D77,
	    RGBA8UI: 0x8D7C,
	    RGB8UI: 0x8D7D,
	    RGBA32I: 0x8D82,
	    RGB32I: 0x8D83,
	    RGBA16I: 0x8D88,
	    RGB16I: 0x8D89,
	    RGBA8I: 0x8D8E,
	    RGB8I: 0x8D8F,
	    RED_INTEGER: 0x8D94,
	    RGB_INTEGER: 0x8D98,
	    RGBA_INTEGER: 0x8D99,
	    R8: 0x8229,
	    RG8: 0x822B,
	    R16F: 0x822D,
	    R32F: 0x822E,
	    RG16F: 0x822F,
	    RG32F: 0x8230,
	    R8I: 0x8231,
	    R8UI: 0x8232,
	    R16I: 0x8233,
	    R16UI: 0x8234,
	    R32I: 0x8235,
	    R32UI: 0x8236,
	    RG8I: 0x8237,
	    RG8UI: 0x8238,
	    RG16I: 0x8239,
	    RG16UI: 0x823A,
	    RG32I: 0x823B,
	    RG32UI: 0x823C,
	    R8_SNORM: 0x8F94,
	    RG8_SNORM: 0x8F95,
	    RGB8_SNORM: 0x8F96,
	    RGBA8_SNORM: 0x8F97,
	    RGB10_A2UI: 0x906F,

	    /* covered by extension
	    COMPRESSED_R11_EAC : 0x9270,
	    COMPRESSED_SIGNED_R11_EAC: 0x9271,
	    COMPRESSED_RG11_EAC: 0x9272,
	    COMPRESSED_SIGNED_RG11_EAC : 0x9273,
	    COMPRESSED_RGB8_ETC2 : 0x9274,
	    COMPRESSED_SRGB8_ETC2: 0x9275,
	    COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 : 0x9276,
	    COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC : 0x9277,
	    COMPRESSED_RGBA8_ETC2_EAC: 0x9278,
	    COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : 0x9279,
	    */
	    TEXTURE_IMMUTABLE_FORMAT: 0x912F,
	    TEXTURE_IMMUTABLE_LEVELS: 0x82DF,

	    // Pixel types

	    UNSIGNED_INT_2_10_10_10_REV: 0x8368,
	    UNSIGNED_INT_10F_11F_11F_REV: 0x8C3B,
	    UNSIGNED_INT_5_9_9_9_REV: 0x8C3E,
	    FLOAT_32_UNSIGNED_INT_24_8_REV: 0x8DAD,
	    UNSIGNED_INT_24_8: 0x84FA,
	    HALF_FLOAT: 0x140B,
	    RG: 0x8227,
	    RG_INTEGER: 0x8228,
	    INT_2_10_10_10_REV: 0x8D9F,

	    // Queries

	    CURRENT_QUERY: 0x8865,
	    QUERY_RESULT: 0x8866,
	    QUERY_RESULT_AVAILABLE: 0x8867,
	    ANY_SAMPLES_PASSED: 0x8C2F,
	    ANY_SAMPLES_PASSED_CONSERVATIVE: 0x8D6A,

	    // Draw buffers

	    MAX_DRAW_BUFFERS: 0x8824,
	    DRAW_BUFFER0: 0x8825,
	    DRAW_BUFFER1: 0x8826,
	    DRAW_BUFFER2: 0x8827,
	    DRAW_BUFFER3: 0x8828,
	    DRAW_BUFFER4: 0x8829,
	    DRAW_BUFFER5: 0x882A,
	    DRAW_BUFFER6: 0x882B,
	    DRAW_BUFFER7: 0x882C,
	    DRAW_BUFFER8: 0x882D,
	    DRAW_BUFFER9: 0x882E,
	    DRAW_BUFFER10: 0x882F,
	    DRAW_BUFFER11: 0x8830,
	    DRAW_BUFFER12: 0x8831,
	    DRAW_BUFFER13: 0x8832,
	    DRAW_BUFFER14: 0x8833,
	    DRAW_BUFFER15: 0x8834,
	    MAX_COLOR_ATTACHMENTS: 0x8CDF,
	    COLOR_ATTACHMENT1: 0x8CE1,
	    COLOR_ATTACHMENT2: 0x8CE2,
	    COLOR_ATTACHMENT3: 0x8CE3,
	    COLOR_ATTACHMENT4: 0x8CE4,
	    COLOR_ATTACHMENT5: 0x8CE5,
	    COLOR_ATTACHMENT6: 0x8CE6,
	    COLOR_ATTACHMENT7: 0x8CE7,
	    COLOR_ATTACHMENT8: 0x8CE8,
	    COLOR_ATTACHMENT9: 0x8CE9,
	    COLOR_ATTACHMENT10: 0x8CEA,
	    COLOR_ATTACHMENT11: 0x8CEB,
	    COLOR_ATTACHMENT12: 0x8CEC,
	    COLOR_ATTACHMENT13: 0x8CED,
	    COLOR_ATTACHMENT14: 0x8CEE,
	    COLOR_ATTACHMENT15: 0x8CEF,

	    // Samplers

	    SAMPLER_3D: 0x8B5F,
	    SAMPLER_2D_SHADOW: 0x8B62,
	    SAMPLER_2D_ARRAY: 0x8DC1,
	    SAMPLER_2D_ARRAY_SHADOW: 0x8DC4,
	    SAMPLER_CUBE_SHADOW: 0x8DC5,
	    INT_SAMPLER_2D: 0x8DCA,
	    INT_SAMPLER_3D: 0x8DCB,
	    INT_SAMPLER_CUBE: 0x8DCC,
	    INT_SAMPLER_2D_ARRAY: 0x8DCF,
	    UNSIGNED_INT_SAMPLER_2D: 0x8DD2,
	    UNSIGNED_INT_SAMPLER_3D: 0x8DD3,
	    UNSIGNED_INT_SAMPLER_CUBE: 0x8DD4,
	    UNSIGNED_INT_SAMPLER_2D_ARRAY: 0x8DD7,
	    MAX_SAMPLES: 0x8D57,
	    SAMPLER_BINDING: 0x8919,

	    // Buffers

	    PIXEL_PACK_BUFFER: 0x88EB,
	    PIXEL_UNPACK_BUFFER: 0x88EC,
	    PIXEL_PACK_BUFFER_BINDING: 0x88ED,
	    PIXEL_UNPACK_BUFFER_BINDING: 0x88EF,
	    COPY_READ_BUFFER: 0x8F36,
	    COPY_WRITE_BUFFER: 0x8F37,
	    COPY_READ_BUFFER_BINDING: 0x8F36,
	    COPY_WRITE_BUFFER_BINDING: 0x8F37,

	    // Data types

	    FLOAT_MAT2x3: 0x8B65,
	    FLOAT_MAT2x4: 0x8B66,
	    FLOAT_MAT3x2: 0x8B67,
	    FLOAT_MAT3x4: 0x8B68,
	    FLOAT_MAT4x2: 0x8B69,
	    FLOAT_MAT4x3: 0x8B6A,
	    UNSIGNED_INT_VEC2: 0x8DC6,
	    UNSIGNED_INT_VEC3: 0x8DC7,
	    UNSIGNED_INT_VEC4: 0x8DC8,
	    UNSIGNED_NORMALIZED: 0x8C17,
	    SIGNED_NORMALIZED: 0x8F9C,

	    // Vertex attributes

	    VERTEX_ATTRIB_ARRAY_INTEGER: 0x88FD,
	    VERTEX_ATTRIB_ARRAY_DIVISOR: 0x88FE,

	    // Transform feedback

	    TRANSFORM_FEEDBACK_BUFFER_MODE: 0x8C7F,
	    MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: 0x8C80,
	    TRANSFORM_FEEDBACK_VARYINGS: 0x8C83,
	    TRANSFORM_FEEDBACK_BUFFER_START: 0x8C84,
	    TRANSFORM_FEEDBACK_BUFFER_SIZE: 0x8C85,
	    TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: 0x8C88,
	    MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: 0x8C8A,
	    MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: 0x8C8B,
	    INTERLEAVED_ATTRIBS: 0x8C8C,
	    SEPARATE_ATTRIBS: 0x8C8D,
	    TRANSFORM_FEEDBACK_BUFFER: 0x8C8E,
	    TRANSFORM_FEEDBACK_BUFFER_BINDING: 0x8C8F,
	    TRANSFORM_FEEDBACK: 0x8E22,
	    TRANSFORM_FEEDBACK_PAUSED: 0x8E23,
	    TRANSFORM_FEEDBACK_ACTIVE: 0x8E24,
	    TRANSFORM_FEEDBACK_BINDING: 0x8E25,

	    // Framebuffers and renderbuffers

	    FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: 0x8210,
	    FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: 0x8211,
	    FRAMEBUFFER_ATTACHMENT_RED_SIZE: 0x8212,
	    FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: 0x8213,
	    FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: 0x8214,
	    FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: 0x8215,
	    FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: 0x8216,
	    FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: 0x8217,
	    FRAMEBUFFER_DEFAULT: 0x8218,
	    // DEPTH_STENCIL_ATTACHMENT : 0x821A,
	    // DEPTH_STENCIL: 0x84F9,
	    DEPTH24_STENCIL8: 0x88F0,
	    DRAW_FRAMEBUFFER_BINDING: 0x8CA6,
	    // READ_FRAMEBUFFER : 0x8CA8,
	    // DRAW_FRAMEBUFFER : 0x8CA9,
	    READ_FRAMEBUFFER_BINDING: 0x8CAA,
	    RENDERBUFFER_SAMPLES: 0x8CAB,
	    FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: 0x8CD4,
	    FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: 0x8D56,

	    // Uniforms

	    UNIFORM_BUFFER: 0x8A11,
	    UNIFORM_BUFFER_BINDING: 0x8A28,
	    UNIFORM_BUFFER_START: 0x8A29,
	    UNIFORM_BUFFER_SIZE: 0x8A2A,
	    MAX_VERTEX_UNIFORM_BLOCKS: 0x8A2B,
	    MAX_FRAGMENT_UNIFORM_BLOCKS: 0x8A2D,
	    MAX_COMBINED_UNIFORM_BLOCKS: 0x8A2E,
	    MAX_UNIFORM_BUFFER_BINDINGS: 0x8A2F,
	    MAX_UNIFORM_BLOCK_SIZE: 0x8A30,
	    MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: 0x8A31,
	    MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: 0x8A33,
	    UNIFORM_BUFFER_OFFSET_ALIGNMENT: 0x8A34,
	    ACTIVE_UNIFORM_BLOCKS: 0x8A36,
	    UNIFORM_TYPE: 0x8A37,
	    UNIFORM_SIZE: 0x8A38,
	    UNIFORM_BLOCK_INDEX: 0x8A3A,
	    UNIFORM_OFFSET: 0x8A3B,
	    UNIFORM_ARRAY_STRIDE: 0x8A3C,
	    UNIFORM_MATRIX_STRIDE: 0x8A3D,
	    UNIFORM_IS_ROW_MAJOR: 0x8A3E,
	    UNIFORM_BLOCK_BINDING: 0x8A3F,
	    UNIFORM_BLOCK_DATA_SIZE: 0x8A40,
	    UNIFORM_BLOCK_ACTIVE_UNIFORMS: 0x8A42,
	    UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: 0x8A43,
	    UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: 0x8A44,
	    UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: 0x8A46,

	    // Sync objects

	    OBJECT_TYPE: 0x9112,
	    SYNC_CONDITION: 0x9113,
	    SYNC_STATUS: 0x9114,
	    SYNC_FLAGS: 0x9115,
	    SYNC_FENCE: 0x9116,
	    SYNC_GPU_COMMANDS_COMPLETE: 0x9117,
	    UNSIGNALED: 0x9118,
	    SIGNALED: 0x9119,
	    ALREADY_SIGNALED: 0x911A,
	    TIMEOUT_EXPIRED: 0x911B,
	    CONDITION_SATISFIED: 0x911C,
	    WAIT_FAILED: 0x911D,
	    SYNC_FLUSH_COMMANDS_BIT: 0x00000001,

	    // Miscellaneous constants

	    COLOR: 0x1800,
	    DEPTH: 0x1801,
	    STENCIL: 0x1802,
	    MIN: 0x8007,
	    MAX: 0x8008,
	    DEPTH_COMPONENT24: 0x81A6,
	    STREAM_READ: 0x88E1,
	    STREAM_COPY: 0x88E2,
	    STATIC_READ: 0x88E5,
	    STATIC_COPY: 0x88E6,
	    DYNAMIC_READ: 0x88E9,
	    DYNAMIC_COPY: 0x88EA,
	    DEPTH_COMPONENT32F: 0x8CAC,
	    DEPTH32F_STENCIL8: 0x8CAD,
	    INVALID_INDEX: 0xFFFFFFFF,
	    TIMEOUT_IGNORED: -1,
	    MAX_CLIENT_WAIT_TIMEOUT_WEBGL: 0x9247,

	    // Constants defined in WebGL extensions

	    // ANGLE_instanced_arrays

	    VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE: 0x88FE, // Describes the frequency divisor used for instanced rendering.

	    // WEBGL_debug_renderer_info

	    UNMASKED_VENDOR_WEBGL: 0x9245, // Passed to getParameter to get the vendor string of the graphics driver.
	    UNMASKED_RENDERER_WEBGL: 0x9246, // Passed to getParameter to get the renderer string of the graphics driver.

	    // EXT_texture_filter_anisotropic

	    MAX_TEXTURE_MAX_ANISOTROPY_EXT: 0x84FF, // Returns the maximum available anisotropy.
	    TEXTURE_MAX_ANISOTROPY_EXT: 0x84FE, // Passed to texParameter to set the desired maximum anisotropy for a texture.

	    // WEBGL_compressed_texture_s3tc

	    COMPRESSED_RGB_S3TC_DXT1_EXT: 0x83F0, // A DXT1-compressed image in an RGB image format.
	    COMPRESSED_RGBA_S3TC_DXT1_EXT: 0x83F1, // A DXT1-compressed image in an RGB image format with a simple on/off alpha value.
	    COMPRESSED_RGBA_S3TC_DXT3_EXT: 0x83F2, // A DXT3-compressed image in an RGBA image format. Compared to a 32-bit RGBA texture, it offers 4:1 compression.
	    COMPRESSED_RGBA_S3TC_DXT5_EXT: 0x83F3, // A DXT5-compressed image in an RGBA image format. It also provides a 4:1 compression, but differs to the DXT3 compression in how the alpha compression is done.

	    // WEBGL_compressed_texture_es3

	    COMPRESSED_R11_EAC: 0x9270, // One-channel (red) unsigned format compression.
	    COMPRESSED_SIGNED_R11_EAC: 0x9271, // One-channel (red) signed format compression.
	    COMPRESSED_RG11_EAC: 0x9272, // Two-channel (red and green) unsigned format compression.
	    COMPRESSED_SIGNED_RG11_EAC: 0x9273, // Two-channel (red and green) signed format compression.
	    COMPRESSED_RGB8_ETC2: 0x9274, // Compresses RBG8 data with no alpha channel.
	    COMPRESSED_RGBA8_ETC2_EAC: 0x9275, // Compresses RGBA8 data. The RGB part is encoded the same as RGB_ETC2, but the alpha part is encoded separately.
	    COMPRESSED_SRGB8_ETC2: 0x9276, // Compresses sRBG8 data with no alpha channel.
	    COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: 0x9277, // Compresses sRGBA8 data. The sRGB part is encoded the same as SRGB_ETC2, but the alpha part is encoded separately.
	    COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: 0x9278, // Similar to RGB8_ETC, but with ability to punch through the alpha channel, which means to make it completely opaque or transparent.
	    COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: 0x9279, // Similar to SRGB8_ETC, but with ability to punch through the alpha channel, which means to make it completely opaque or transparent.

	    // WEBGL_compressed_texture_pvrtc

	    COMPRESSED_RGB_PVRTC_4BPPV1_IMG: 0x8C00, // RGB compression in 4-bit mode. One block for each 4×4 pixels.
	    COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: 0x8C02, // RGBA compression in 4-bit mode. One block for each 4×4 pixels.
	    COMPRESSED_RGB_PVRTC_2BPPV1_IMG: 0x8C01, // RGB compression in 2-bit mode. One block for each 8×4 pixels.
	    COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: 0x8C03, // RGBA compression in 2-bit mode. One block for each 8×4 pixe

	    // WEBGL_compressed_texture_etc1

	    COMPRESSED_RGB_ETC1_WEBGL: 0x8D64, // Compresses 24-bit RGB data with no alpha channel.

	    // WEBGL_compressed_texture_atc

	    COMPRESSED_RGB_ATC_WEBGL: 0x8C92, //  Compresses RGB textures with no alpha channel.
	    COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL: 0x8C92, // Compresses RGBA textures using explicit alpha encoding (useful when alpha transitions are sharp).
	    COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL: 0x87EE, // Compresses RGBA textures using interpolated alpha encoding (useful when alpha transitions are gradient).

	    // WEBGL_depth_texture

	    UNSIGNED_INT_24_8_WEBGL: 0x84FA, // Unsigned integer type for 24-bit depth texture data.

	    // OES_texture_half_float

	    HALF_FLOAT_OES: 0x8D61, // Half floating-point type (16-bit).

	    // WEBGL_color_buffer_float

	    RGBA32F_EXT: 0x8814, // RGBA 32-bit floating-point color-renderable format.
	    RGB32F_EXT: 0x8815, // RGB 32-bit floating-point color-renderable format.
	    FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT: 0x8211,
	    UNSIGNED_NORMALIZED_EXT: 0x8C17,

	    // EXT_blend_minmax

	    MIN_EXT: 0x8007, // Produces the minimum color components of the source and destination colors.
	    MAX_EXT: 0x8008, // Produces the maximum color components of the source and destination colors.

	    // EXT_sRGB

	    SRGB_EXT: 0x8C40, // Unsized sRGB format that leaves the precision up to the driver.
	    SRGB_ALPHA_EXT: 0x8C42, // Unsized sRGB format with unsized alpha component.
	    SRGB8_ALPHA8_EXT: 0x8C43, // Sized (8-bit) sRGB and alpha formats.
	    FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT: 0x8210, // Returns the framebuffer color encoding.

	    // OES_standard_derivatives

	    FRAGMENT_SHADER_DERIVATIVE_HINT_OES: 0x8B8B, // Indicates the accuracy of the derivative calculation for the GLSL built-in functions: dFdx, dFdy, and fwidth.

	    // WEBGL_draw_buffers

	    COLOR_ATTACHMENT0_WEBGL: 0x8CE0, // Framebuffer color attachment point
	    COLOR_ATTACHMENT1_WEBGL: 0x8CE1, // Framebuffer color attachment point
	    COLOR_ATTACHMENT2_WEBGL: 0x8CE2, // Framebuffer color attachment point
	    COLOR_ATTACHMENT3_WEBGL: 0x8CE3, // Framebuffer color attachment point
	    COLOR_ATTACHMENT4_WEBGL: 0x8CE4, // Framebuffer color attachment point
	    COLOR_ATTACHMENT5_WEBGL: 0x8CE5, // Framebuffer color attachment point
	    COLOR_ATTACHMENT6_WEBGL: 0x8CE6, // Framebuffer color attachment point
	    COLOR_ATTACHMENT7_WEBGL: 0x8CE7, // Framebuffer color attachment point
	    COLOR_ATTACHMENT8_WEBGL: 0x8CE8, // Framebuffer color attachment point
	    COLOR_ATTACHMENT9_WEBGL: 0x8CE9, // Framebuffer color attachment point
	    COLOR_ATTACHMENT10_WEBGL: 0x8CEA, // Framebuffer color attachment point
	    COLOR_ATTACHMENT11_WEBGL: 0x8CEB, // Framebuffer color attachment point
	    COLOR_ATTACHMENT12_WEBGL: 0x8CEC, // Framebuffer color attachment point
	    COLOR_ATTACHMENT13_WEBGL: 0x8CED, // Framebuffer color attachment point
	    COLOR_ATTACHMENT14_WEBGL: 0x8CEE, // Framebuffer color attachment point
	    COLOR_ATTACHMENT15_WEBGL: 0x8CEF, // Framebuffer color attachment point
	    DRAW_BUFFER0_WEBGL: 0x8825, // Draw buffer
	    DRAW_BUFFER1_WEBGL: 0x8826, // Draw buffer
	    DRAW_BUFFER2_WEBGL: 0x8827, // Draw buffer
	    DRAW_BUFFER3_WEBGL: 0x8828, // Draw buffer
	    DRAW_BUFFER4_WEBGL: 0x8829, // Draw buffer
	    DRAW_BUFFER5_WEBGL: 0x882A, // Draw buffer
	    DRAW_BUFFER6_WEBGL: 0x882B, // Draw buffer
	    DRAW_BUFFER7_WEBGL: 0x882C, // Draw buffer
	    DRAW_BUFFER8_WEBGL: 0x882D, // Draw buffer
	    DRAW_BUFFER9_WEBGL: 0x882E, // Draw buffer
	    DRAW_BUFFER10_WEBGL: 0x882F, // Draw buffer
	    DRAW_BUFFER11_WEBGL: 0x8830, // Draw buffer
	    DRAW_BUFFER12_WEBGL: 0x8831, // Draw buffer
	    DRAW_BUFFER13_WEBGL: 0x8832, // Draw buffer
	    DRAW_BUFFER14_WEBGL: 0x8833, // Draw buffer
	    DRAW_BUFFER15_WEBGL: 0x8834, // Draw buffer
	    MAX_COLOR_ATTACHMENTS_WEBGL: 0x8CDF, // Maximum number of framebuffer color attachment points
	    MAX_DRAW_BUFFERS_WEBGL: 0x8824, // Maximum number of draw buffers

	    // OES_vertex_array_object

	    VERTEX_ARRAY_BINDING_OES: 0x85B5, // The bound vertex array object (VAO).

	    // EXT_disjoint_timer_query

	    QUERY_COUNTER_BITS_EXT: 0x8864, // The number of bits used to hold the query result for the given target.
	    CURRENT_QUERY_EXT: 0x8865, // The currently active query.
	    QUERY_RESULT_EXT: 0x8866, // The query result.
	    QUERY_RESULT_AVAILABLE_EXT: 0x8867, // A Boolean indicating whether or not a query result is available.
	    TIME_ELAPSED_EXT: 0x88BF, // Elapsed time (in nanoseconds).
	    TIMESTAMP_EXT: 0x8E28, // The current time.
	    GPU_DISJOINT_EXT: 0x8FBB // A Boolean indicating whether or not the GPU performed any disjoint operation.
	};

	var GLConstants_1 = GLConstants;

	var GLConstants$1 = /*#__PURE__*/Object.freeze({
		default: GLConstants_1,
		__moduleExports: GLConstants_1
	});

	var GLConstants$2 = ( GLConstants$1 && GLConstants_1 ) || GLConstants$1;

	/**
	 * @author yellow date 2018/4/4
	 */

	/**
	 * default options
	 */
	var options = {
	  buffer: null,
	  enabled: false,
	  size: 4,
	  type: GLConstants$2.FLOAT,
	  normalized: false,
	  stride: 16,
	  offset: 0
	};
	/**
	 * @class
	 */

	var GLVertexAttrib = function () {
	  /**
	   * 
	   * @param {Object} [opts]
	   * @param {GLBuffer} [opts.buffer]
	   * @param {Boolean} [opts.enabled]
	   * @param {GLuint} [opts.type]
	   * @param {Boolean} [opts.normalized]
	   * @param {Number} [opts.size]
	   * @param {Number} [opts.index]
	   * @param {Number} [opts.stride]
	   * @param {Number} [opts.offset]
	   */
	  function GLVertexAttrib(opts) {
	    classCallCheck(this, GLVertexAttrib);

	    var _opts = merge$2({}, options, opts);
	    this.enabled = _opts.enable;
	    this.buffer = _opts.buffer;
	    this.index = _opts.index;
	    this.size = _opts.size;
	    this.type = _opts.type;
	    this.normalized = _opts.normalized;
	    this.stride = _opts.stride;
	    this.offset = _opts.offset;
	    this.cached = [this.size, this.type, this.normalized, this.stride, this.offset].join(":");
	  }
	  /**
	   * recache
	   */


	  createClass(GLVertexAttrib, [{
	    key: 'recache',
	    value: function recache() {
	      this.cached = [this.size, this.type, this.normalized, this.stride, this.offset].join(":");
	    }
	    /**
	     * enable attrib
	     */

	  }, {
	    key: 'enable',
	    value: function enable() {
	      this.enable = true;
	    }
	    /**
	     * disable attrib
	     */

	  }, {
	    key: 'disable',
	    value: function disable() {
	      this.enable = false;
	    }
	  }]);
	  return GLVertexAttrib;
	}();

	var GLVertexAttrib_1 = GLVertexAttrib;

	var GLVertexAttrib$1 = /*#__PURE__*/Object.freeze({
		default: GLVertexAttrib_1,
		__moduleExports: GLVertexAttrib_1
	});

	var Dispose$2 = ( Dispose$1 && Dispose_1 ) || Dispose$1;

	/**
	 * birgde to attach shader
	 * reference:
	 * https://github.com/KhronosGroup/glslang/blob/04f4566f285beb1e3619eb40baa7629eb5eb3946/glslang/MachineIndependent/Initialize.cpp
	 * https://www.cnblogs.com/bitzhuwei/p/LALR1-library-and-a-GLSL-parser-in-csharp.html
	 * https://github.com/aras-p/glsl-optimizer
	 * 
	 * @author yellow
	 */

	/**
	 * the prefix of Shader type
	 */
	var prefix = 'SHADER';
	/**
	 * @class
	 */

	var GLShader = function (_Dispose) {
	  inherits(GLShader, _Dispose);

	  /**
	   * 
	   * @param {GLenum} type Either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
	   * @param {GLContext} glContext 
	   */
	  function GLShader(type, glContext) {
	    classCallCheck(this, GLShader);

	    /**
	     * @type {GLenum}
	     */
	    var _this = possibleConstructorReturn(this, (GLShader.__proto__ || Object.getPrototypeOf(GLShader)).call(this, prefix));

	    _this._type = type;
	    /**
	     * @type {GLContext}
	     */
	    _this._glContext = glContext;
	    /**
	     * @type {String} shaderSource 
	     */
	    _this._source = null;
	    /**
	     * @type {boolean}
	     */
	    _this._isDelete = false;
	    return _this;
	  }
	  /**
	   * @returns {GLenum}
	   */


	  createClass(GLShader, [{
	    key: 'getParameters',

	    /**
	     * bridge to shader
	     * @param {GLenum} pname 
	     */
	    value: function getParameters(pname) {
	      if (pname === GLConstants$2.DELETE_STATUS) return this._isDelete;else if (pname === GLConstants$2.COMPILE_STATUS) return this._isComplied;else if (pname === GLConstants$2.SHADER_TYPE) return this._type;
	    }
	    /**
	     * @returns {Array}
	     */

	  }, {
	    key: 'type',
	    get: function get$$1() {
	      return this._type;
	    }
	    /**
	     * @type {String}
	     */

	  }, {
	    key: 'source',
	    set: function set$$1(v) {
	      this._source = v;
	    }
	    /**
	     * @returns {String}
	     */
	    ,
	    get: function get$$1() {
	      return this._source;
	    }
	  }, {
	    key: 'uniforms',
	    get: function get$$1() {
	      return this._uniforms;
	    }
	    /**
	     * @returns {Array}
	     */

	  }, {
	    key: 'attributes',
	    get: function get$$1() {
	      return this._attributes;
	    }
	  }]);
	  return GLShader;
	}(Dispose$2);

	var GLShader_1 = GLShader;

	var GLShader$1 = /*#__PURE__*/Object.freeze({
		default: GLShader_1,
		__moduleExports: GLShader_1
	});

	var prefix$1 = 'BUFFER';
	/**
	 * @class
	 */

	var GLBuffer = function (_Dispose) {
	  inherits(GLBuffer, _Dispose);

	  /**
	   * 
	   * @param {GLContext} glContext 
	   */
	  function GLBuffer(glContext) {
	    classCallCheck(this, GLBuffer);

	    /**
	     * @type {GLContext}
	     */
	    var _this = possibleConstructorReturn(this, (GLBuffer.__proto__ || Object.getPrototypeOf(GLBuffer)).call(this, prefix$1));

	    _this._glContext = glContext;
	    return _this;
	  }

	  return GLBuffer;
	}(Dispose$2);

	var GLBuffer_1 = GLBuffer;

	var GLBuffer$1 = /*#__PURE__*/Object.freeze({
		default: GLBuffer_1,
		__moduleExports: GLBuffer_1
	});

	var prefix$2 = 'FRAMEBUFFER';

	/**
	 * @class
	 */

	var GLFramebuffer = function (_Dispose) {
	  inherits(GLFramebuffer, _Dispose);

	  /**
	   * 
	   * @param {GLContext} glContext 
	   */
	  function GLFramebuffer(glContext) {
	    classCallCheck(this, GLFramebuffer);

	    /**
	     * @type {GLContext}
	     */
	    var _this = possibleConstructorReturn(this, (GLFramebuffer.__proto__ || Object.getPrototypeOf(GLFramebuffer)).call(this, prefix$2));

	    _this._glContext = glContext;
	    return _this;
	  }

	  return GLFramebuffer;
	}(Dispose$2);

	var GLFramebuffer_1 = GLFramebuffer;

	var GLFramebuffer$1 = /*#__PURE__*/Object.freeze({
		default: GLFramebuffer_1,
		__moduleExports: GLFramebuffer_1
	});

	var prefix$3 = 'RENDERBUFFER';

	/**
	 * @class
	 */

	var GLRenderbuffer = function (_Dispose) {
	  inherits(GLRenderbuffer, _Dispose);

	  /**
	   * 
	   * @param {GLContext} glContext 
	   */
	  function GLRenderbuffer(glContext) {
	    classCallCheck(this, GLRenderbuffer);

	    /**
	     * @type {GLContext}
	     */
	    var _this = possibleConstructorReturn(this, (GLRenderbuffer.__proto__ || Object.getPrototypeOf(GLRenderbuffer)).call(this, prefix$3));

	    _this._glContext = glContext;
	    return _this;
	  }

	  return GLRenderbuffer;
	}(Dispose$2);

	var GLRenderbuffer_1 = GLRenderbuffer;

	var GLRenderbuffer$1 = /*#__PURE__*/Object.freeze({
		default: GLRenderbuffer_1,
		__moduleExports: GLRenderbuffer_1
	});

	/**
	 * @author yellow date 2018/2/27
	 */
	var prefix$4 = 'VERTEXARRAYOBJRCT ';
	/** 
	 * webgl2 vertex_array_object
	 * @class
	*/

	var GLVertexArray = function (_Dispose) {
	  inherits(GLVertexArray, _Dispose);

	  /**
	   * 
	   * @param {GLContext} glContext 
	   */
	  function GLVertexArray(glContext) {
	    classCallCheck(this, GLVertexArray);

	    var _this = possibleConstructorReturn(this, (GLVertexArray.__proto__ || Object.getPrototypeOf(GLVertexArray)).call(this, prefix$4));

	    _this._glContext = glContext;
	    return _this;
	  }

	  return GLVertexArray;
	}(Dispose$2);

	var GLVertexArray_1 = GLVertexArray;

	var GLVertexArray$1 = /*#__PURE__*/Object.freeze({
		default: GLVertexArray_1,
		__moduleExports: GLVertexArray_1
	});

	/**
	 * birgde to attach texture
	 */

	/**
	 * the prefix of Texture type
	 */
	var prefix$5 = 'TEXTURE';

	var GLTexture = function (_Dispose) {
	  inherits(GLTexture, _Dispose);

	  /**
	   * @param {GLContext} glContext 
	   */
	  function GLTexture(glContext) {
	    classCallCheck(this, GLTexture);

	    /**
	     * @type {GLContext}
	     */
	    var _this = possibleConstructorReturn(this, (GLTexture.__proto__ || Object.getPrototypeOf(GLTexture)).call(this, prefix$5));

	    _this._glContext = glContext;
	    return _this;
	  }

	  return GLTexture;
	}(Dispose$2);

	var GLTexture_1 = GLTexture;

	var GLTexture$1 = /*#__PURE__*/Object.freeze({
		default: GLTexture_1,
		__moduleExports: GLTexture_1
	});

	/**
	 * @author yellow
	 */

	/**
	 * prefix of Cache
	 */
	var prefixProgram = 'PROGRAM',
	    prefixUniform = 'UNIFOMR';
	/**
	 * @class
	 */

	var GLProgram = function (_Dispose) {
	    inherits(GLProgram, _Dispose);

	    /**
	     * 
	     * @param {GLContext} glContext 
	     */
	    function GLProgram(glContext) {
	        classCallCheck(this, GLProgram);

	        /**
	         * 索引glContext对象
	         */
	        var _this = possibleConstructorReturn(this, (GLProgram.__proto__ || Object.getPrototypeOf(GLProgram)).call(this, prefixProgram));
	        /**
	         * 
	         */


	        _this._glContext = glContext;
	        /**
	         * 映射attribute 和返回值
	         */
	        _this._attributeCache = {};
	        /**
	         * 映射uniforms
	         */
	        _this._uniformCache = {};
	        /**
	         * @type {GLShader}
	         */
	        _this._vs = null;
	        /**
	         * @type {GLShader}
	         */
	        _this._fs = null;
	        return _this;
	    }
	    /**
	     * @returns {Number}
	     */


	    createClass(GLProgram, [{
	        key: 'attachShader',

	        /**
	         * attach shader
	         * @param {GLShader} shader 
	         */
	        value: function attachShader(shader) {
	            if (shader.type === GLConstants$2.FRAGMENT_SHADER) this._fs = shader;else if (shader.type === GLConstants$2.VERTEX_SHADER) this._vs = shader;
	        }
	        /**
	         * initial shader and analysis uniform/attribute
	         */

	    }, {
	        key: 'link',
	        value: function link() {
	            //complier vShader and fShader
	            var gl = this._glContext._gl,
	                vs = this._vs,
	                fs = this._fs;
	            //vshader
	            var vShader = gl.createShader(vs.type);
	            gl.shaderSource(vShader, vs.source);
	            gl.compileShader(vShader);
	            //fshader
	            var fShader = gl.createShader(fs.type);
	            gl.shaderSource(fShader, fs.source);
	            gl.compileShader(fShader);
	            //program
	            var program = gl.createProgram();
	            gl.attachShader(program, vShader);
	            gl.attachShader(program, fShader);
	            gl.linkProgram(program);
	            //store uniforms and attributes
	            this._attributes = [];
	            this._uniforms = [];
	            //map attribute locations
	            var numAttribs = gl.getProgramParameter(program, GLConstants$2.ACTIVE_ATTRIBUTES);
	            for (var i = 0; i < numAttribs; ++i) {
	                var info = gl.getActiveAttrib(program, i);
	                this._attributes.push({
	                    name: info.name,
	                    type: info.type,
	                    size: info.size
	                });
	            }
	            var numUnifroms = gl.getProgramParameter(program, GLConstants$2.ACTIVE_UNIFORMS);
	            for (var _i = 0; _i < numUnifroms; ++_i) {
	                var _info = gl.getActiveUniform(program, _i);
	                this._uniforms.push({
	                    name: _info.name,
	                    type: _info.type,
	                    size: _info.size
	                });
	            }
	            //distory shader and program
	            gl.deleteShader(vShader);
	            gl.deleteShader(fShader);
	            gl.deleteProgram(program);
	            //reverse value and key
	            this._updateKeyValue();
	        }
	        /**
	         * 
	         */

	    }, {
	        key: '_updateKeyValue',
	        value: function _updateKeyValue() {
	            var _this2 = this;

	            var uniforms = this._uniforms,
	                attributes = this._attributes,
	                uniformCache = this._uniformCache,
	                attributeCache = this._attributeCache;
	            //attribute location index
	            var index = 0;
	            //unifrom map
	            uniforms.forEach(function (uniform) {
	                var uniformLocation = { glProgram: _this2 };
	                stamp$1(uniformLocation, prefixUniform);
	                uniformCache[uniform.name] = uniformLocation;
	            });
	            //attribute map
	            attributes.forEach(function (attribute) {
	                attributeCache[attribute.name] = index++;
	            });
	        }
	        /**
	         * no longer need to replace,return location directly
	         * @param {GLenum} pname 
	         */

	    }, {
	        key: 'getAttribLocation',
	        value: function getAttribLocation(pname) {
	            return this._attributeCache[pname];
	        }
	        /**
	         * @param {DOMString} pname 
	         */

	    }, {
	        key: 'getUnifromLocation',
	        value: function getUnifromLocation(pname) {
	            var uniformLocation = { glProgram: this };
	            stamp$1(uniformLocation, prefixUniform);
	            this._uniformCache[pname] = this._uniformCache[pname] || uniformLocation;
	            return this._uniformCache[pname];
	        }
	    }, {
	        key: 'attachNum',
	        get: function get$$1() {
	            var num = 0;
	            if (this._vs) num++;
	            if (this._fs) num++;
	            return num;
	        }
	        /**
	         * @returns {Array}
	         */

	    }, {
	        key: 'uniforms',
	        get: function get$$1() {
	            return this._uniforms;
	        }
	        /**
	         * @returns {Array}
	         */

	    }, {
	        key: 'attributes',
	        get: function get$$1() {
	            return this._attributes;
	        }
	    }]);
	    return GLProgram;
	}(Dispose$2);

	var GLProgram_1 = GLProgram;

	var GLProgram$1 = /*#__PURE__*/Object.freeze({
		default: GLProgram_1,
		__moduleExports: GLProgram_1
	});

	var GLVertexAttrib$2 = ( GLVertexAttrib$1 && GLVertexAttrib_1 ) || GLVertexAttrib$1;

	/**
	 * reference:
	 * https://github.com/greggman/oes-vertex-array-object-polyfill/blob/master/OESVertexArrayObject-polyfill.js
	 * https://github.com/KhronosGroup/WebGL/blob/master/sdk/demos/google/resources/OESVertexArrayObject.js
	 * 
	 */

	/**
	 * vao object
	 * @class
	 */

	var WebGLVertexArrayObjectOES = function () {
	    function WebGLVertexArrayObjectOES(ext) {
	        classCallCheck(this, WebGLVertexArrayObjectOES);

	        this.isAlive = true;
	        this.hasBeenBound = false;
	        this._ext = ext;
	        this._maxVertexAttribs = ext._glContext._gl.getParameter(GLConstants$2.MAX_VERTEX_ATTRIBS);
	        this.elementArrayBuffer = null;
	        this.attribs = new Array(this._maxVertexAttribs);
	        this._initVertexAttrib();
	        this.maxAttrib = 0;
	    }

	    createClass(WebGLVertexArrayObjectOES, [{
	        key: '_initVertexAttrib',
	        value: function _initVertexAttrib() {
	            var attribs = this.attribs;
	            for (var n = 0, len = attribs.length; n < len; n++) {
	                attribs[n] = new GLVertexAttrib$2();
	            }
	        }
	    }]);
	    return WebGLVertexArrayObjectOES;
	}();
	/**
	 * @class
	 */


	var OES_vertex_array_object = function () {
	    /**
	     * 
	     * @param {String} extName 
	     * @param {GLContext} glContext 
	     */
	    function OES_vertex_array_object(extName, glContext) {
	        classCallCheck(this, OES_vertex_array_object);

	        /**
	         * @type {String}
	         */
	        this._name = extName;
	        /**
	         * @type {GLContext}
	         */
	        this._glContext = glContext;
	        /**
	         * self object
	         */
	        var self = this;
	        /**
	         * @type {number}
	         */
	        this.VERTEX_ARRAY_BINDING_OES = GLConstants$2.VERTEX_ARRAY_BINDING_OES;
	        /**
	         * @type {object}
	         */
	        this.original = {
	            getParameter: this._glContext.getParameter,
	            enableVertexAttribArray: this._glContext.enableVertexAttribArray,
	            disableVertexAttribArray: this._glContext.disableVertexAttribArray,
	            bindBuffer: this._glContext.bindBuffer,
	            getVertexAttrib: this._glContext.getVertexAttrib,
	            vertexAttribPointer: this._glContext.vertexAttribPointer
	        };
	        /**
	         * overwrite
	         */
	        this._glContext.getParameter = function (pName) {
	            if (pName === GLConstants$2.VERTEX_ARRAY_BINDING_OES) {
	                if (self.currentVertexArrayObject == self.defaultVertexArrayObject) {
	                    return null;
	                } else {
	                    return self.currentVertexArrayObject;
	                }
	            }
	            return self.original.getParameter.apply(this, arguments);
	        };
	        /**
	         * 
	         */
	        this._glContext.enableVertexAttribArray = function (index) {
	            var vao = self.currentVertexArrayObject;
	            vao.maxAttrib = Math.max(vao.maxAttrib, index);
	            var attrib = vao.attribs[index];
	            attrib.enabled = true;
	            return self.original.enableVertexAttribArray.apply(this, arguments);
	        };
	        /**
	         * 
	         * @param {*} index 
	         */
	        this._glContext.disableVertexAttribArray = function disableVertexAttribArray(index) {
	            var vao = self.currentVertexArrayObject;
	            vao.maxAttrib = Math.max(vao.maxAttrib, index);
	            var attrib = vao.attribs[index];
	            attrib.enabled = false;
	            return self.original.disableVertexAttribArray.apply(this, arguments);
	        };
	        /**
	         * @param
	         */
	        this._glContext.bindBuffer = function bindBuffer(target, buffer) {
	            switch (target) {
	                case GLConstants$2.ARRAY_BUFFER:
	                    self.currentArrayBuffer = buffer;
	                    break;
	                case GLConstants$2.ELEMENT_ARRAY_BUFFER:
	                    self.currentVertexArrayObject.elementArrayBuffer = buffer;
	                    break;
	            }
	            return self.original.bindBuffer.apply(this, arguments);
	        };
	        /**
	         * 
	         * @param {*} index 
	         * @param {*} pname 
	         */
	        this._glContext.getVertexAttrib = function getVertexAttrib(index, pname) {
	            var vao = self.currentVertexArrayObject;
	            var attrib = vao.attribs[index];
	            switch (pname) {
	                case GLConstants$2.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING:
	                    return attrib.buffer;
	                case GLConstants$2.VERTEX_ATTRIB_ARRAY_ENABLED:
	                    return attrib.enabled;
	                case GLConstants$2.VERTEX_ATTRIB_ARRAY_SIZE:
	                    return attrib.size;
	                case GLConstants$2.VERTEX_ATTRIB_ARRAY_STRIDE:
	                    return attrib.stride;
	                case GLConstants$2.VERTEX_ATTRIB_ARRAY_TYPE:
	                    return attrib.type;
	                case GLConstants$2.VERTEX_ATTRIB_ARRAY_NORMALIZED:
	                    return attrib.normalized;
	                default:
	                    return self.original.getVertexAttrib.apply(this, arguments);
	            }
	        };
	        /**
	         * 
	         * @param {*} indx 
	         * @param {*} size 
	         * @param {*} type 
	         * @param {*} normalized 
	         * @param {*} stride 
	         * @param {*} offset 
	         */
	        this._glContext.vertexAttribPointer = function vertexAttribPointer(indx, size, type, normalized, stride, offset) {
	            var vao = self.currentVertexArrayObject;
	            vao.maxAttrib = Math.max(vao.maxAttrib, indx);
	            var attrib = vao.attribs[indx];
	            attrib.buffer = self.currentArrayBuffer;
	            attrib.size = size;
	            attrib.type = type;
	            attrib.normalized = normalized;
	            attrib.stride = stride;
	            attrib.offset = offset;
	            attrib.recache();
	            return self.original.vertexAttribPointer.apply(this, arguments);
	        };
	        /**
	         * 
	         */
	        if (this._glContext.instrumentExtension) {
	            gl.instrumentExtension(this, "OES_vertex_array_object");
	        }
	        /**
	         * reset all default vertex array object
	         */
	        this._reset();
	    }
	    /**
	     * reset
	     * -vertexArrayObjects
	     * -defaultVertexArrayObject
	     * -currentVertexArrayObject
	     */


	    createClass(OES_vertex_array_object, [{
	        key: '_reset',
	        value: function _reset() {
	            /**
	             * @type {WebGLVertexArrayObjectOES}
	             */
	            this.defaultVertexArrayObject = new WebGLVertexArrayObjectOES(this);
	            /**
	             * @type {Array}
	             */
	            this.vertexArrayObjects = [this.defaultVertexArrayObject];
	            /**
	             * @type {WebGLVertexArrayObjectOES}
	             */
	            this.currentVertexArrayObject;
	        }
	        /**
	         * create WebGLVertexArrayObjectOES
	         */

	    }, {
	        key: 'createVertexArrayOES',
	        value: function createVertexArrayOES() {
	            var arrayObject = new WebGLVertexArrayObjectOES(this);
	            this.vertexArrayObjects.push(arrayObject);
	            return arrayObject;
	        }
	        /**
	         * delete WebGLVertexArrayObjectOES
	         * @param {WebGLVertexArrayObjectOES} arrayObject 
	         */

	    }, {
	        key: 'deleteVertexArrayOES',
	        value: function deleteVertexArrayOES(arrayObject) {
	            arrayObject.isAlive = false;
	            var idx = this.vertexArrayObjects.indexOf(arrayObject);
	            this.vertexArrayObjects.splice(idx, 1);
	            this.currentVertexArrayObject == arrayObject ? this.bindVertexArrayOES(null) : null;
	        }
	        /**
	         * infer object
	         * @param {WebGLVertexArrayObjectOES} arrayObject 
	         */

	    }, {
	        key: 'isVertexArrayOES',
	        value: function isVertexArrayOES(arrayObject) {
	            if (arrayObject && arrayObject instanceof WebGLVertexArrayObjectOES) if (arrayObject.hasBeenBound && arrayObject._ext == this) return true;
	            return false;
	        }
	        /**
	         * 
	         * @param {WebGLVertexArrayObjectOES} arrayObject 
	         */

	    }, {
	        key: 'bindVertexArrayOES',
	        value: function bindVertexArrayOES(arrayObject) {
	            var gl = this._glContext;
	            if (arrayObject && !arrayObject.isAlive) {
	                synthesizeGLError(gl.INVALID_OPERATION, "bindVertexArrayOES: attempt to bind deleted arrayObject");
	                return;
	            }
	            var original = this.original;
	            var oldVAO = this.currentVertexArrayObject;
	            this.currentVertexArrayObject = arrayObject || this.defaultVertexArrayObject;
	            this.currentVertexArrayObject.hasBeenBound = true;
	            var newVAO = this.currentVertexArrayObject;
	            if (oldVAO == newVAO) {
	                return;
	            }
	            if (!oldVAO || newVAO.elementArrayBuffer != oldVAO.elementArrayBuffer) {
	                original.bindBuffer.call(gl, gl.ELEMENT_ARRAY_BUFFER, newVAO.elementArrayBuffer);
	            }
	            var currentBinding = this.currentArrayBuffer;
	            var maxAttrib = Math.max(oldVAO ? oldVAO.maxAttrib : 0, newVAO.maxAttrib);
	            for (var n = 0; n <= maxAttrib; n++) {
	                var attrib = newVAO.attribs[n];
	                var oldAttrib = oldVAO ? oldVAO.attribs[n] : null;
	                if (!oldVAO || attrib.enabled != oldAttrib.enabled) {
	                    if (attrib.enabled) {
	                        original.enableVertexAttribArray.call(gl, n);
	                    } else {
	                        original.disableVertexAttribArray.call(gl, n);
	                    }
	                }
	                if (attrib.enabled) {
	                    var bufferChanged = false;
	                    if (!oldVAO || attrib.buffer != oldAttrib.buffer) {
	                        if (currentBinding != attrib.buffer) {
	                            original.bindBuffer.call(gl, gl.ARRAY_BUFFER, attrib.buffer);
	                            currentBinding = attrib.buffer;
	                        }
	                        bufferChanged = true;
	                    }

	                    if (bufferChanged || attrib.cached != oldAttrib.cached) {
	                        original.vertexAttribPointer.call(gl, n, attrib.size, attrib.type, attrib.normalized, attrib.stride, attrib.offset);
	                    }
	                }
	            }
	            if (this.currentArrayBuffer != currentBinding) {
	                original.bindBuffer.call(gl, gl.ARRAY_BUFFER, this.currentArrayBuffer);
	            }
	        }
	    }]);
	    return OES_vertex_array_object;
	}();

	var OES_vertex_array_object_1 = OES_vertex_array_object;

	var OES_vertex_array_object$1 = /*#__PURE__*/Object.freeze({
		default: OES_vertex_array_object_1,
		__moduleExports: OES_vertex_array_object_1
	});

	var Recorder$2 = ( Recorder$1 && Recorder_1 ) || Recorder$1;

	var GLShader$2 = ( GLShader$1 && GLShader_1 ) || GLShader$1;

	var GLBuffer$2 = ( GLBuffer$1 && GLBuffer_1 ) || GLBuffer$1;

	var GLFramebuffer$2 = ( GLFramebuffer$1 && GLFramebuffer_1 ) || GLFramebuffer$1;

	var GLRenderbuffer$2 = ( GLRenderbuffer$1 && GLRenderbuffer_1 ) || GLRenderbuffer$1;

	var GLVertexArray$2 = ( GLVertexArray$1 && GLVertexArray_1 ) || GLVertexArray$1;

	var GLTexture$2 = ( GLTexture$1 && GLTexture_1 ) || GLTexture$1;

	var GLProgram$2 = ( GLProgram$1 && GLProgram_1 ) || GLProgram$1;

	var OES_vertex_array_object$2 = ( OES_vertex_array_object$1 && OES_vertex_array_object_1 ) || OES_vertex_array_object$1;

	/**
	 * remove current program in to gl.actuator.currentProgram
	 * @modify 2018/5/2
	 * @author yellow
	 */

	/**
	 * bridge object
	 */

	/**
	 * bridge extension
	 */

	/**
	 * the prefix of GLContext
	 */
	var prefix$6 = "WEBGLRENDERGINGCONTEXT";
	/**
	 * @class
	 */

	var GLContext = function (_Dispose) {
	    inherits(GLContext, _Dispose);

	    /**
	     * 
	     * @param {WebGLRenderingContext} gl
	     * @param {String} renderType support 'webgl' or 'webgl2'
	     * @param {Object} [options] 
	     */
	    function GLContext(gl, renderType) {
	        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	        classCallCheck(this, GLContext);

	        /**
	         * @type {String}
	         */
	        var _this = possibleConstructorReturn(this, (GLContext.__proto__ || Object.getPrototypeOf(GLContext)).call(this, prefix$6));
	        /**
	         * set element id
	         */


	        _this._renderType = renderType;
	        /**
	         * @type {Object}
	         */
	        _this._options = options;
	        /**
	         * @type {Recorder}
	         */
	        _this._recorder = new Recorder$2(_this);
	        /**
	         * @type {WebGLRenderingContext}
	         */
	        _this._gl = gl;
	        /**
	         * @type {GLBuffer}
	         */
	        _this._glBuffer = null;
	        /**
	         * index of vertex_buffer 
	         */
	        _this._bound_buffer = {};
	        /**
	         * index of attribs
	         */
	        _this._attribs = {};
	        /**
	         * @type {Object}
	         */
	        _this._extensions = {};
	        /**
	         * map funciont
	         */
	        _this._mapConst();
	        return _this;
	    }
	    /**
	     * map function and constants to Class
	     */


	    createClass(GLContext, [{
	        key: '_mapConst',
	        value: function _mapConst() {
	            var _this2 = this;

	            var recorder = this._recorder;
	            //1.map constants
	            for (var key in GLConstants$2) {
	                if (!this.hasOwnProperty(key)) {
	                    var target = GLConstants$2[key];
	                    if (!this[key]) this[key] = target;
	                }
	            }
	            //2.map void function(include replace and no replace)

	            var _loop = function _loop(_key) {
	                if (!_this2.hasOwnProperty(_key)) {
	                    var _target = Encrypt$2[_key];
	                    //2.1 void and no replace
	                    if (!_target.return && _target.replace === 0) {
	                        if (!_this2[_key] && !!_target) {
	                            _this2[_key] = function () {
	                                for (var _len = arguments.length, rest = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
	                                    rest[_key2] = arguments[_key2];
	                                }

	                                var record = new (Function.prototype.bind.apply(Record$2, [null].concat([_key], rest)))();
	                                recorder.increase(record);
	                            };
	                        }
	                    }
	                    //2.2 void and replace ,no change program
	                    else if (!_target.return && _target.replace > 0 && !_target.change) {
	                            if (!_this2[_key] && !!_target) {
	                                _this2[_key] = function () {
	                                    for (var _len2 = arguments.length, rest = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
	                                        rest[_key3] = arguments[_key3];
	                                    }

	                                    var record = new (Function.prototype.bind.apply(Record$2, [null].concat([_key], rest)))(),
	                                        index = _target.ptIndex;
	                                    record.exactIndexByObject(index);
	                                    recorder.increase(record);
	                                };
	                            }
	                        }
	                        //2.3 void replace as 1 and need to change program
	                        else if (!_target.return && _target.replace === 1 && _target.change === 1) {
	                                if (!_this2[_key] && !!_target) {
	                                    _this2[_key] = function () {
	                                        for (var _len3 = arguments.length, rest = Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
	                                            rest[_key4] = arguments[_key4];
	                                        }

	                                        var currentProgram = _this2.gl.actuator.currentProgram,
	                                            record = new (Function.prototype.bind.apply(Record$2, [null].concat([_key], rest)))(),
	                                            index = _target.ptIndex,
	                                            u = record.args[index[0]];
	                                        if (u.glProgram !== currentProgram) _this2.useProgram(u.glProgram);
	                                        record.exactIndexByObject(index);
	                                        recorder.increase(record);
	                                    };
	                                }
	                            }
	                    //2.4 return(make birdge to origin,should not to be implemented)
	                }
	            };

	            for (var _key in Encrypt$2) {
	                _loop(_key);
	            }
	        }
	        /**
	         * get the version of webgl
	         * @returns {String} 'webgl' or 'webgl2'
	         */

	    }, {
	        key: 'useProgram',

	        /**
	         * @param {GLProgram} program 
	         */
	        value: function useProgram(program) {
	            var record = new Record$2('useProgram', program);
	            record.exactIndexByValue(0, program.id);
	            this._recorder.increase(record);
	            //store current programId and program
	            this.gl.actuator.currentProgram = program;
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/shaderSource
	         * @param {GLShader} shader 
	         * @param {String} source 
	         */

	    }, {
	        key: 'shaderSource',
	        value: function shaderSource(shader, source) {
	            shader.source = source;
	            var returnId = shader.id,
	                record = new Record$2('shaderSource', shader, source);
	            record.exactIndexByValue(0, returnId);
	            this._recorder.increase(record);
	        }
	        /**
	        * 
	        * @param {GLenum} target 
	        * @param {GLBuffer} buffer 
	        */

	    }, {
	        key: 'bindBuffer',
	        value: function bindBuffer(target, buffer) {
	            //store currently bound buffer
	            if (target === GLConstants$2.ARRAY_BUFFER) {
	                this._glBuffer = buffer;
	            }
	            var record = new Record$2('bindBuffer', target, buffer);
	            record.exactIndexByObject([1]);
	            this._recorder.increase(record);
	        }
	        /**
	         * 
	         * @param {*} index 
	         * @param {*} size 
	         * @param {*} type 
	         * @param {*} normalized 
	         * @param {*} stride 
	         * @param {*} offset 
	         */

	    }, {
	        key: 'vertexAttribPointer',
	        value: function vertexAttribPointer(index, size, type, normalized, stride, offset) {
	            var glAttrib = new GLVertexAttrib$2({ buffer: this._glBuffer, size: size, index: index, type: type, stride: stride, offset: offset, normalized: normalized });
	            this._attribs[index] = glAttrib;
	            var record = new Record$2('vertexAttribPointer', index, size, type, normalized, stride, offset);
	            this._recorder.increase(record);
	        }
	        /**
	        * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/enableVertexAttribArray
	        * @param {GLuint} index 
	        */

	    }, {
	        key: 'enableVertexAttribArray',
	        value: function enableVertexAttribArray(index) {
	            //active bound
	            this._bound_buffer[index] = this._attribs[index];
	            var record = new Record$2('enableVertexAttribArray', index);
	            this._recorder.increase(record);
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/disableVertexAttribArray
	         * @param {GLunit} index 
	         */

	    }, {
	        key: 'disableVertexAttribArray',
	        value: function disableVertexAttribArray(index) {
	            //turns the vertex attribute off at the given index position
	            this._bound_buffer[index] = this._attribs[index];
	            var record = new Record$2('disableVertexAttribArray', index);
	            this._recorder.increase(record);
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/compileShader
	         * @param {GLShader} shader 
	         */

	    }, {
	        key: 'compileShader',
	        value: function compileShader(shader) {
	            var returnId = shader.id,
	                record = new Record$2('compileShader', shader);
	            record.exactIndexByValue(0, returnId);
	            shader._isComplied = true;
	            this._recorder.increase(record);
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createShader
	         * @param {String} type Either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER 
	         */

	    }, {
	        key: 'createShader',
	        value: function createShader(type) {
	            var glShader = new GLShader$2(type, this),
	                record = new Record$2('createShader', type);
	            record.setReturnId(glShader.id);
	            this._recorder.increase(record);
	            return glShader;
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createProgram
	         * @returns {GLProgram}
	         */

	    }, {
	        key: 'createProgram',
	        value: function createProgram() {
	            var glProgram = new GLProgram$2(this),
	                record = new Record$2('createProgram');
	            record.setReturnId(glProgram.id);
	            this._recorder.increase(record);
	            return glProgram;
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createProgram
	         * @returns {GLBuffer}
	         */

	    }, {
	        key: 'createBuffer',
	        value: function createBuffer() {
	            var glBuffer = new GLBuffer$2(this),
	                record = new Record$2('createBuffer');
	            record.setReturnId(glBuffer.id);
	            this._recorder.increase(record);
	            return glBuffer;
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createFramebuffer
	         * @returns {GLFramebuffer}
	         */

	    }, {
	        key: 'createFramebuffer',
	        value: function createFramebuffer() {
	            var glFramebuffer = new GLFramebuffer$2(this),
	                record = new Record$2('createFramebuffer');
	            record.setReturnId(glFramebuffer.id);
	            this._recorder.increase(record);
	            return glFramebuffer;
	        }
	        /** 
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createRenderbuffer
	         * @returns {GLRenderbuffer}
	         */

	    }, {
	        key: 'createRenderbuffer',
	        value: function createRenderbuffer() {
	            var glRenderbuffer = new GLRenderbuffer$2(this),
	                record = new Record$2('createRenderbuffer');
	            record.setReturnId(glRenderbuffer.id);
	            this._recorder.increase(record);
	            return glRenderbuffer;
	        }
	        /** 
	         * needs ext 'OES_vertex_array_object' support
	         * only avaiable in webgl2
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLVertexArrayObject
	         * @returns {GL}
	        */

	    }, {
	        key: 'createVertexArray',
	        value: function createVertexArray() {
	            var glVao = new GLVertexArray$2(this),
	                record = new Record$2('createVertexArray');
	            record.setReturnId(glVao.id);
	            this._recorder.increase(record);
	            return glVao;
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createTexture
	         * @returns {GLTexture}
	         */

	    }, {
	        key: 'createTexture',
	        value: function createTexture() {
	            var glTexture = new GLTexture$2(this),
	                record = new Record$2('createTexture');
	            record.setReturnId(glTexture.id);
	            this._recorder.increase(record);
	            return glTexture;
	        }
	        /**
	         * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/attachShader
	         * @param {GLProgram} program 
	         * @param {GLShader} shader 
	         */

	    }, {
	        key: 'attachShader',
	        value: function attachShader(program, shader) {
	            var record = new Record$2('attachShader', program, shader);
	            record.exactIndexByValue(0, program.id);
	            record.exactIndexByValue(1, shader.id);
	            this._recorder.increase(record);
	            //
	            program.attachShader(shader);
	        }
	        /**
	         * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/linkProgram
	         * @param {GLProgram} program 
	         */

	    }, {
	        key: 'linkProgram',
	        value: function linkProgram(program) {
	            var record = new Record$2('linkProgram', program);
	            record.exactIndexByValue(0, program.id);
	            this._recorder.increase(record);
	            program.link();
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getAttribLocation
	         * @modify yellow date 2018/2/3 direction return 
	         * 
	         * @param {GLProgram} program 
	         * @param {String} name 
	         */

	    }, {
	        key: 'getAttribLocation',
	        value: function getAttribLocation(program, name) {
	            var returnId = program.getAttribLocation(name),
	                record = new Record$2('getAttribLocation', program, name);
	            record.exactIndexByValue(0, program.id);
	            record.setReturnId(returnId, false);
	            this._recorder.increase(record);
	            return returnId;
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getUniformLocation
	         * @param {GLProgram} program 
	         * @param {DOMString} name 
	         */

	    }, {
	        key: 'getUniformLocation',
	        value: function getUniformLocation(program, name) {
	            var returnId = program.getUnifromLocation(name),
	                record = new Record$2('getUniformLocation', program, name);
	            record.exactIndexByValue(0, program.id);
	            record.setReturnId(returnId);
	            this._recorder.increase(record);
	            return returnId;
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderParameter
	         * @param {GLShader} shader 
	         * @param {GLenum} pname 
	         */

	    }, {
	        key: 'getShaderParameter',
	        value: function getShaderParameter(shader, pname) {
	            return shader.getParameters(pname);
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderInfoLog
	         * @param {GLShader} shader 
	         */

	    }, {
	        key: 'getShaderInfoLog',
	        value: function getShaderInfoLog(shader) {
	            return '';
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getProgramInfoLog
	         * @param {GLProgram} program 
	         */

	    }, {
	        key: 'getProgramInfoLog',
	        value: function getProgramInfoLog(program) {
	            return '';
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getActiveAttrib
	         * @param {GLProgram} program 
	         * @param {GLuint} index 
	         */

	    }, {
	        key: 'getActiveAttrib',
	        value: function getActiveAttrib(program, index) {
	            return program.attributes[index];
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getVertexAttrib
	         * @param {GLuint} index 
	         * @param {GLenum} pname 
	         */

	    }, {
	        key: 'getVertexAttrib',
	        value: function getVertexAttrib(index, pname) {
	            if (pname === GLConstants$2.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING) {
	                var gVertexAttrib = this._bound_buffer[index] || {};
	                return gVertexAttrib.buffer;
	            }
	            return null;
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getActiveUniform
	         * @param {GLProgram} program 
	         * @param {GLuint} index 
	         */

	    }, {
	        key: 'getActiveUniform',
	        value: function getActiveUniform(program, index) {
	            return program.uniforms[index];
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getProgramParameter
	         * @type {GLProgram} program
	         * @type {GLenum} pname
	         */

	    }, {
	        key: 'getProgramParameter',
	        value: function getProgramParameter(program, pname) {
	            if (pname === GLConstants$2.ACTIVE_UNIFORMS) {
	                return program.uniforms.length;
	            } else if (pname === GLConstants$2.ACTIVE_ATTRIBUTES) {
	                return program.attributes.length;
	            } else if (pname === GLConstants$2.ATTACHED_SHADERS) {
	                return program.attachNum;
	            } else if (pname === GLConstants$2.LINK_STATUS) {
	                return true;
	            } else if (pname === GLConstants$2.DELETE_STATUS) {
	                return true;
	            }
	        }
	        /**
	         * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/getError
	         */

	    }, {
	        key: 'getError',
	        value: function getError() {
	            return GLConstants$2.NO_ERROR;
	        }
	        /**
	         * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/getContextAttributes
	         */

	    }, {
	        key: 'getContextAttributes',
	        value: function getContextAttributes() {
	            var contextAttributes = this._options;
	            return contextAttributes;
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getExtension
	         * @param {String} name 
	         */

	    }, {
	        key: 'getExtension',
	        value: function getExtension(name) {
	            if (name === 'OES_vertex_array_object') {
	                this._extensions['OES_vertex_array_object'] = this._extensions['OES_vertex_array_object'] || new OES_vertex_array_object$2('OES_vertex_array_object', this);
	                return this._extensions['OES_vertex_array_object'];
	            } else {
	                var gl = this._gl;
	                return gl.getExtension(name);
	            }
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter
	         * @param {String} pname 
	         */

	    }, {
	        key: 'getParameter',
	        value: function getParameter(pname) {
	            //parameter search from limits
	            var gl = this._gl;
	            return gl.getParameter(pname);
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clear
	         */

	    }, {
	        key: 'clear',
	        value: function clear(mask) {
	            //}{hack igonre 'screen clearing operations'
	            //1.GLConstants.COLOR_BUFFER_BIT|GLConstants.DEPTH_BUFFER_BIT|GLConstants.STENCIL_BUFFER_BIT  = 17664
	            //2.mask alpah !== 0
	            if (mask !== 17664) {
	                var record = new Record$2('clear', mask);
	                this._recorder.increase(record);
	            }
	        }
	        /**
	         * }{debug
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/checkFramebufferStatus
	         * @param {GLenum} target 
	         */

	    }, {
	        key: 'checkFramebufferStatus',
	        value: function checkFramebufferStatus(target) {
	            return GLConstants$2.FRAMEBUFFER_COMPLETE;
	        }
	        /**
	         * turning function
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays
	         */

	    }, {
	        key: 'drawArrays',
	        value: function drawArrays(mode, first, count) {
	            var actuator = this.gl.actuator,
	                record = new Record$2('drawArrays', mode, first, count),
	                programId = this.gl.actuator.currentProgram.id;
	            this._recorder.increase(record);
	            actuator.play(this._recorder.toOperation());
	        }
	        /**
	         * turning function
	         * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements
	         */

	    }, {
	        key: 'drawElements',
	        value: function drawElements(mode, count, type, offset) {
	            var actuator = this.gl.actuator,
	                record = new Record$2('drawElements', mode, count, type, offset),
	                programId = this.gl.actuator.currentProgram.id;
	            this._recorder.increase(record);
	            actuator.play(this._recorder.toOperation());
	        }
	    }, {
	        key: 'renderType',
	        get: function get$$1() {
	            return this._renderType;
	        }
	        /**
	         * get webglrendercontext
	         * @returns {WebGLRenderingContext}
	         */

	    }, {
	        key: 'gl',
	        get: function get$$1() {
	            return this._gl;
	        }
	        /**
	         * get glcontext's recorder
	         * @returns {Recorder}
	         */

	    }, {
	        key: 'recorder',
	        get: function get$$1() {
	            return this._recorder;
	        }
	    }]);
	    return GLContext;
	}(Dispose$2);

	var GLContext_1 = GLContext;

	var GLContext$1 = /*#__PURE__*/Object.freeze({
		default: GLContext_1,
		__moduleExports: GLContext_1
	});

	var Actuator$2 = ( Actuator$1 && Actuator_1 ) || Actuator$1;

	var GLContext$2 = ( GLContext$1 && GLContext_1 ) || GLContext$1;

	/**
	 * the prefix of GLCanvas
	 */
	var prefix$7 = 'CANVASELEMENT';
	/**
	 * @class
	 * @example
	 * const gl = doucment.getElementById('mapCanvas').getContext('webgl');
	 * const glCavnas = new GLCanvas(gl);
	 */

	var GLCanvas = function (_Dispose) {
	    inherits(GLCanvas, _Dispose);

	    /**
	     * 
	     * @param {WebGLRenderingContext} gl
	     * @param {Object} [options] depreciated at this version
	     */
	    function GLCanvas(gl) {
	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	        classCallCheck(this, GLCanvas);

	        /**
	         * @type {Object}
	         */
	        var _this = possibleConstructorReturn(this, (GLCanvas.__proto__ || Object.getPrototypeOf(GLCanvas)).call(this, prefix$7));
	        /**
	         * super call
	         */


	        _this._options = merge$2({}, options);
	        /**
	         * @type {WebGLRenderingContext}
	         */
	        _this._gl = gl;
	        /**
	         * @type {String} 'webgl1' or 'webgl2'
	         */
	        _this._glType = null;
	        /**
	         * real html canvas element
	         * https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
	         * @type {HtmlCanvasElement}
	         */
	        _this._canvas = gl.canvas;
	        /**
	         * @type {GLContext}
	         */
	        _this._glContext = null;
	        /**
	         * @type {Object}
	         */
	        _this._style = {};
	        /**
	         * store canvas operations
	         * @type {Recorder}
	         */
	        _this._records = new Recorder$2(null, false);
	        /*
	         * initial glcanvas by WebGLRenderingContext
	         */
	        _this._initialize(gl);
	        return _this;
	    }
	    /**
	     * 
	     * @param {WebGLRenderingContext} gl 
	     */


	    createClass(GLCanvas, [{
	        key: '_initialize',
	        value: function _initialize(gl) {
	            //get webgl version
	            var glVersion = gl.getParameter(GLConstants$2.VERSION);
	            if (glVersion.indexOf('WebGL 1.0') !== -1) {
	                this._glType = 'webgl1';
	            } else if (glVersion.indexOf('WebGL 2.0') !== -1) {
	                this._glType = 'webgl2';
	            } else {
	                this._glType = 'webgl1';
	            }
	            //initial Actuator
	            gl.actuator = gl.actuator || new Actuator$2(gl);
	        }
	        /**
	         * get context attributes
	         * include webgl2 attributes
	         * reference https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
	         * @param {Object} [options] 
	         */

	    }, {
	        key: '_getContextAttributes',
	        value: function _getContextAttributes() {
	            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	            return {
	                alpha: options.alpha || false,
	                depth: options.depth || true,
	                stencil: options.stencil || true,
	                antialias: options.antialias || false,
	                premultipliedAlpha: options.premultipliedAlpha || true,
	                preserveDrawingBuffer: options.preserveDrawingBuffer || false,
	                failIfMajorPerformanceCaveat: options.failIfMajorPerformanceCaveat || false
	            };
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
	         * https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration
	         * @type {CSSStyleDeclaration}
	         */

	    }, {
	        key: 'getContext',

	        /**
	         * get GLContext
	         */
	        value: function getContext() {
	            var gl = this._gl,
	                glType = this._glType,
	                contextOptions = this._getContextAttributes();
	            this._glContext = this._glContext || new GLContext$2(gl, glType, contextOptions);
	            return this._glContext;
	        }
	        /**
	         * https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
	         * @param {String} type 
	         * @param {Function} listener 
	         * @param {Object} options 
	         */

	    }, {
	        key: 'addEventListener',
	        value: function addEventListener(type, listener, options) {
	            var canvas = this._canvas;
	            if (canvas) {
	                canvas.addEventListener(type, listener, options);
	            } else {
	                var record = new Record$2('addEventListener', type, listener, options);
	                this._records.increase(record);
	            }
	        }
	        /**
	         * 
	         * @param {*} type 
	         * @param {*} listener 
	         * @param {*} options 
	         */

	    }, {
	        key: 'removeEventListener',
	        value: function removeEventListener(type, listener, options) {
	            var canvas = this._canvas;
	            if (canvas) {
	                canvas.removeEventListener(type, listener, options);
	            } else {
	                var record = new Record$2('removeEventListener', type, listener, options);
	                this._records.increase(record);
	            }
	        }
	        /**
	         * https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName
	         */

	    }, {
	        key: 'getBoundingClientRect',

	        /**
	         * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
	         */
	        value: function getBoundingClientRect() {
	            var canvas = this._canvas;
	            if (canvas) {
	                return canvas.getBoundingClientRect();
	            } else return [0, 0, 0, 0];
	        }
	    }, {
	        key: 'style',
	        get: function get$$1() {
	            var canvas = this._canvas;
	            if (canvas) return canvas.style;else return this._style;
	        }
	        /**
	         * 
	         */

	    }, {
	        key: 'width',
	        get: function get$$1() {
	            var canvas = this._canvas;
	            if (canvas) return canvas.width;else return 0;
	        }
	        /**
	         * 
	         */
	        ,
	        set: function set$$1(v) {
	            var canvas = this._canvas;
	            if (canvas) canvas.width = v;
	        }
	        /**
	         * 
	         */

	    }, {
	        key: 'clientWidth',
	        get: function get$$1() {
	            var canvas = this._canvas;
	            if (canvas) return canvas.clientWidth;else return 0;
	        }
	        /**
	         * 
	         */
	        ,
	        set: function set$$1(v) {
	            var canvas = this._canvas;
	            if (canvas) canvas.clientWidth = v;
	        }
	        /**
	         * 
	         */

	    }, {
	        key: 'clientHeight',
	        get: function get$$1() {
	            var canvas = this._canvas;
	            if (canvas) return canvas.clientHeight;else return 0;
	        }
	        /**
	         * 
	         */
	        ,
	        set: function set$$1(v) {
	            var canvas = this._canvas;
	            if (canvas) canvas.clientHeight = v;
	        }
	        /**
	         * 
	         */

	    }, {
	        key: 'height',
	        get: function get$$1() {
	            var canvas = this._canvas;
	            if (canvas) return canvas.height;else return 0;
	        }
	        /**
	         * 
	         */
	        ,
	        set: function set$$1(v) {
	            var canvas = this._canvas;
	            if (canvas) canvas.height = v;
	        }
	    }, {
	        key: 'nodeName',
	        get: function get$$1() {
	            return 'CANVAS';
	        }
	    }]);
	    return GLCanvas;
	}(Dispose$2);

	var GLCanvas_1 = GLCanvas;

	var GLCanvas$1 = /*#__PURE__*/Object.freeze({
		default: GLCanvas_1,
		__moduleExports: GLCanvas_1
	});

	var GLCanvas$2 = ( GLCanvas$1 && GLCanvas_1 ) || GLCanvas$1;

	var init = {
	    gl: {
	        /**
	         * virtual HtmlCanvasElement
	         */
	        GLCanvas: GLCanvas$2,
	        /**
	         * debug settings
	         */
	        Debug: {
	            /**
	             * enable debug logger
	             * @param {WebGLRenderingContext} gl
	             */
	            Enable: function Enable(gl) {
	                var actuator = gl.actuator;
	                actuator.debug = true;
	            },
	            /**
	             * disable debug logger
	             * @param {WebGLRenderingContext} gl
	             */
	            Disable: function Disable(gl) {
	                var actuator = gl.actuator;
	                actuator.debug = false;
	            },
	            /**
	             * executed commands
	             * @param {WebGLRenderingContext} gl
	             */
	            GetLogger: function GetLogger(gl) {
	                var actuator = gl.actuator;
	                return actuator.logger;
	            }
	        }
	    }
	};
	var init_1 = init.gl;

	exports.default = init;
	exports.gl = init_1;

	return exports;

}({}));
