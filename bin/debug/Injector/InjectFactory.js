/* import { InjectBinding } from "./InjectBinding";
import {InjectConst} from "./InjectConst";
import { Binding } from "../Bind/Binding"; */
var ioc;
(function (ioc) {
    /**
     * 注入工厂，负责从给定的构造函数创建对象
     * 可以创建单例
     */
    var InjectFactory = /** @class */ (function () {
        function InjectFactory() {
        }
        /**
         * 根据绑定状态和指定的参数创建或获取实例对象
         * @param binding 绑定状态
         * @param args 参数
         */
        InjectFactory.prototype.get = function (binding, args) {
            //检查绑定状态是否有效
            if (binding == null) {
                throw new Error("InjectorFactory cannot act on null binding");
            }
            //判断注入状态类型
            var bindingType = binding.bindingType;
            //根据不同的类型创建
            switch (bindingType) {
                case "Singleton" /* SINGLETON */:
                    return this.singletonOf(binding, args);
                    break;
                case "Value" /* VALUE */:
                    return this.valueOf(binding);
                    break;
                default:
                    break;
            }
            return this.instanceOf(binding, args);
        };
        // 生成一个新的实例
        InjectFactory.prototype.instanceOf = function (binding, args) {
            if (binding.value != null) {
                return this.createFromValue(binding.value, args);
            }
            var value = this.generateImplicit(binding.key, args);
            return this.createFromValue(value, args);
        };
        // Call the Activator to attempt instantiation the given object
        InjectFactory.prototype.createFromValue = function (c, args) {
            var instance = null;
            try {
                if (args == null || args.length == 0) {
                    instance = new c();
                }
                else {
                    instance = new c(args);
                }
            }
            catch (_a) {
                //No-op
            }
            //if(instance)console.info("[实例化]"+instance.constructor.name);
            return instance;
        };
        InjectFactory.prototype.generateImplicit = function (key, args) {
            //如果无法直接转换键值为构造函数
            if (!key)
                return null;
            //检查键值是否为构造函数
            if (ioc.Binding.isConstructor(key)) {
                return this.createFromValue(key, args);
            }
            throw new Error("InjectorFactory can't instantiate an Interface or Abstract Class. Class: " + key.ToString());
        };
        // Generate a Singleton instance
        InjectFactory.prototype.singletonOf = function (binding, args) {
            if (binding.value != null) {
                var o = this.createFromValue(binding.value, args);
                if (o == null)
                    return null;
                binding.setValue(o);
            }
            else {
                binding.setValue(this.generateImplicit(binding.key, args));
            }
            return binding.value;
        };
        InjectFactory.prototype.valueOf = function (binding) {
            return binding.value;
        };
        return InjectFactory;
    }());
    ioc.InjectFactory = InjectFactory;
})(ioc || (ioc = {}));
//# sourceMappingURL=InjectFactory.js.map