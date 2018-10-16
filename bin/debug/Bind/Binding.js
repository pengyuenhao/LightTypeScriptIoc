/* import { IConstructorName } from "../IocConst"; */
var ioc;
(function (ioc) {
    var NBinding = /** @class */ (function () {
        function NBinding() {
        }
        Object.defineProperty(NBinding.prototype, "constructorName", {
            get: function () {
                return "IBinding";
            },
            enumerable: true,
            configurable: true
        });
        return NBinding;
    }());
    ioc.NBinding = NBinding;
    var Binding = /** @class */ (function () {
        function Binding(resolver) {
            this._resolver = resolver;
            this._key = null;
            this._value = null;
            this._name = null;
        }
        Object.defineProperty(Binding.prototype, "key", {
            get: function () {
                return this._key;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Binding.prototype, "value", {
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Binding.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 绑定标志到键值，返回此时的绑定状态。
         * @param key 标志值，可以是需要执行的全局信号名称或枚举
         */
        Binding.prototype.bind = function (key) {
            this._key = Binding.checkAbstract(key);
            return this;
        };
        /**
         * 从正在绑定状态映射到实例，返回此时的绑定状态。
         * @param value 绑定映射的值
         */
        Binding.prototype.to = function (value) {
            this._value = value;
            if (this._resolver != null)
                this._resolver(this);
            return this;
        };
        /**
         * 实例的别名，用于区分不同的实例，返回此时的绑定状态。
         * @param name 实例的别名
         */
        Binding.prototype.toName = function (name) {
            this._name = name;
            if (this._resolver != null)
                this._resolver(this);
            return this;
        };
        Object.defineProperty(Binding.prototype, "isKeyConstructor", {
            //判断是否为构造函数
            get: function () {
                return Binding.isConstructor(this._key);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Binding.prototype, "isValueConstructor", {
            //判断是否为构造函数
            get: function () {
                return Binding.isConstructor(this._value);
            },
            enumerable: true,
            configurable: true
        });
        Binding.isConstructor = function (value) {
            //如果不是一个函数则绝对不是构造函数
            if (typeof value !== "function") {
                return false;
            }
            //如果不能直接获取原型则不是构造函数
            if (!value.prototype) {
                return false;
            }
            return true;
        };
        Binding.checkAbstract = function (key) {
            //检查被绑定的对象是否为虚类
            var constructorName;
            if (key.constructorName !== null && key.constructorName !== undefined) {
                constructorName = key.constructorName;
                //console.info("[转化虚拟类]"+ constructorName);
            }
            else {
                constructorName = key;
                //console.info("[非虚拟类]"+ constructorName.constructor.name);
            }
            return constructorName;
        };
        return Binding;
    }());
    ioc.Binding = Binding;
})(ioc || (ioc = {}));
//# sourceMappingURL=Binding.js.map