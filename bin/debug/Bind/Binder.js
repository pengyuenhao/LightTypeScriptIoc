/* import { IBinding,Binding } from "./Binding"
import {IConstructorName} from "../IocConst"
import { BindingConst } from "./BindConst"; */
//export namespace ioc{
var ioc;
(function (ioc) {
    var __IC_Binder = /** @class */ (function () {
        function __IC_Binder() {
        }
        Object.defineProperty(__IC_Binder.prototype, "constructorName", {
            get: function () {
                return "IBinder";
            },
            enumerable: true,
            configurable: true
        });
        return __IC_Binder;
    }());
    ioc.__IC_Binder = __IC_Binder;
    var Binder = /** @class */ (function () {
        //绑定状态白名单
        //protected _bindingWhitelist : Array<object> ;
        function Binder() {
            this.init();
        }
        /**
         * 初始化函数，通过重写该函数指定映射字典的实例
         */
        Binder.prototype.init = function () {
            //初始化绑定状态映射
            this._bindings = new Map();
        };
        /**
         * 解析器，将正在绑定中的状态信息解析，使之成为可存储的数据绑定到映射字典。
         * @param binding 绑定的状态
         */
        Binder.prototype.resolver = function (binding) {
            var key = binding.key;
            this.resolveBinding(binding, key);
        };
        /**
         * 解析绑定状态
         * @param binding 绑定状态
         * @param key 键值
         */
        Binder.prototype.resolveBinding = function (binding, key) {
            //检查绑定状态是否存在别名
            var bindingName = (binding.name == null) ? ioc.BindingConst.NULL : binding.name;
            var dict;
            //检查绑定状态字典已经存在键值
            if ((this._bindings.has(key))) {
                //获取绑定映射
                dict = this._bindings.get(key);
                //检查绑定映射是否存在别名
                if (dict.has(bindingName)) {
                    //获取已经存在的绑定映射
                    var existingBinding = dict.get(bindingName);
                    //检查合法性
                    if (existingBinding != binding) {
                        //如果绑定值为空
                        if (!existingBinding.value) {
                            //移除无效的绑定别名
                            dict.delete(bindingName);
                        }
                    }
                }
            }
            else {
                //创建绑定映射
                dict = new Map();
                //添加绑定映射
                this._bindings.set(key, dict);
            }
            //如果存在默认绑定状态并且等于当前绑定状态
            if (dict.has(ioc.BindingConst.NULL) && dict.get(ioc.BindingConst.NULL) === binding) {
                //删除默认绑定
                dict.delete(ioc.BindingConst.NULL);
            }
            //添加或覆盖绑定状态
            if (!dict.has(bindingName)) {
                dict.set(bindingName, binding);
            }
        };
        /**
         * 绑定信号容器
         * @param key 键值，可以是需要执行的全局信号名称或枚举
         */
        Binder.prototype.bind = function (key) {
            //创建一个绑定中状态
            var binding = this.getRawBinding();
            //绑定标志
            binding.bind(key);
            return binding;
        };
        /**
         * 解除绑定信号容器
         * @param key 键值，需要绑定的键值
         * @param name 别名，被绑定变量的别名
         */
        Binder.prototype.unbind = function (key, name) {
            var checkKey = ioc.Binding.checkAbstract(key);
            //如果绑定映射字典内包含键值
            if (this._bindings.has(checkKey)) {
                //直接获取键值映射的值
                var dict = this._bindings.get(checkKey);
                //检查是否存指定别名
                var bindingName = void 0;
                if (name) {
                    bindingName = name;
                }
                else {
                    bindingName = ioc.BindingConst.NULL;
                }
                if (dict.has(bindingName)) {
                    dict.delete(bindingName);
                }
            }
        };
        /**
         * 生成默认的绑定状态
         */
        Binder.prototype.getRawBinding = function () {
            return new ioc.Binding(this.resolver.bind(this));
        };
        /**
         * 根据键值和别名获取绑定器中的绑定状态
         * @param key 键值
         * @param name 别名
         */
        Binder.prototype.getBinding = function (key, name) {
            //查找是否存在键值
            if (this._bindings.has(key)) {
                var dict = this._bindings.get(key);
                //如果别名不存在则使用默认值
                if (!name) {
                    name = ioc.BindingConst.NULL;
                }
                //查找绑定状态是否存在别名
                if (dict.has(name)) {
                    return dict.get(name);
                }
                else {
                    return null;
                }
            }
        };
        /**
         * 获取绑定状态映射表，返回键值的所有绑定状态
         * @param key 被绑定的键值
         */
        Binder.prototype.getBindingMap = function (key) {
            if (this._bindings.has(key)) {
                return this._bindings.get(key);
            }
        };
        return Binder;
    }());
    ioc.Binder = Binder;
})(ioc || (ioc = {}));
//# sourceMappingURL=Binder.js.map