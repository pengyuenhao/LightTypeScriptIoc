/* import {IocError, IConstructorName} from "../IocConst" */
var ioc;
(function (ioc) {
    var NSignal = /** @class */ (function () {
        function NSignal() {
        }
        Object.defineProperty(NSignal.prototype, "constructorName", {
            get: function () {
                return "ISignal";
            },
            enumerable: true,
            configurable: true
        });
        ;
        return NSignal;
    }());
    ioc.NSignal = NSignal;
    var Signal = /** @class */ (function () {
        function Signal() {
            //回调监听
            this._listener = [];
            this._onceListener = [];
        }
        //执行信号
        Signal.prototype.dispatch = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var that = this;
            //如果存在回调函数
            if (that._listener && that._listener.length != 0) {
                this._listener.forEach(function (action) {
                    action.apply(void 0, [that].concat(args));
                });
            }
            //如果存在单次回调
            if (that._onceListener && that._onceListener.length != 0)
                this._listener.forEach(function (action) {
                    action.apply(void 0, [that].concat(args));
                });
            //清空单次执行的监听
            this._onceListener.length = 0;
        };
        Signal.prototype.addListener = function (callback) {
            this._listener = this.addUnique(this._listener, callback);
        };
        Signal.prototype.addOnceListener = function (callback) {
            this._onceListener = this.addUnique(this._onceListener, callback);
        };
        //清空监听
        Signal.prototype.removeAllListeners = function () {
            this._listener.length = 0;
            this._onceListener.length = 0;
        };
        //不重复添加
        Signal.prototype.addUnique = function (listeners, callback) {
            //检查监听回调是否存在
            if (listeners) {
                var isUnique = false;
                for (var i = 0; i < listeners.length; i++) {
                    //检查是否存在重复项
                    if (listeners[i] === callback) {
                        isUnique = true;
                        break;
                    }
                }
                if (!isUnique) {
                    //放入回调
                    listeners.push(callback);
                }
            }
            return listeners;
        };
        Signal.prototype.getTypes = function () {
            var retv = [];
            //retv.push(this);
            return retv;
        };
        return Signal;
    }());
    ioc.Signal = Signal;
})(ioc || (ioc = {}));
//# sourceMappingURL=Signal.js.map