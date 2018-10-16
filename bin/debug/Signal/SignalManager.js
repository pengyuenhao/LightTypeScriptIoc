/* import { IConstructorName } from "../IocConst"
import { NSignal , Signal, ISignal } from "./Signal" */
var ioc;
(function (ioc) {
    var NSignalManager = /** @class */ (function () {
        function NSignalManager() {
        }
        Object.defineProperty(NSignalManager.prototype, "constructorName", {
            get: function () {
                return "ISignalManager";
            },
            enumerable: true,
            configurable: true
        });
        return NSignalManager;
    }());
    ioc.NSignalManager = NSignalManager;
    var SignalManager = /** @class */ (function () {
        function SignalManager() {
            //维护一个信号指令映射表，注意不再使用的信号应该及时释放掉
            this._signal_dic = new Map();
            this.info = "this is a signal manager";
        }
        SignalManager.prototype.get = function (symbol) {
            //检查全局信号字典内是否存在对应的信号名称或枚举
            if (this._signal_dic.has(symbol)) {
                //获取标志对应的信号
                return this._signal_dic.get(symbol);
            }
            else {
                //创建一个信号
                var _signal = new ioc.Signal();
                //如果使用字符串作为信号识别名，则将其绑定给信号
                if (typeof symbol == "string")
                    _signal.name = symbol;
                //设置根环境
                //_signal.setRoot(this._context.getRoot);
                //建立全局信号与标志值的映射关系
                this._signal_dic.set(symbol, _signal);
                return _signal;
            }
        };
        ;
        SignalManager.prototype.delete = function (symbol) {
            //检查全局信号字典内是否存在对应的信号名称或枚举
            if (this._signal_dic.has(symbol)) {
                //获取标志对应的信号
                return this._signal_dic.delete(symbol);
            }
        };
        return SignalManager;
    }());
    ioc.SignalManager = SignalManager;
})(ioc || (ioc = {}));
//# sourceMappingURL=SignalManager.js.map