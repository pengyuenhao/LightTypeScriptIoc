var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* import {Binder} from "../Bind/Binder";
import {BindingConst} from "../Bind/BindConst";
import {DecoratorClass} from "./DecoratorClass";
import {DecoratorClassBinding} from "./DecoratorClassBinding";
import {IBinding, Binding} from "../Bind/Binding";
import { Prototype } from "../Prototype" */
var ioc;
(function (ioc) {
    var DecoratorClassBinder = /** @class */ (function (_super) {
        __extends(DecoratorClassBinder, _super);
        function DecoratorClassBinder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //重写初始化函数
        DecoratorClassBinder.prototype.init = function () {
            //初始化绑定状态映射
            this._bindings = new Map();
            //初始化缓存映射
            this._decoratorClassBufferMap = new Map();
        };
        //检查是否存在指定的键值
        DecoratorClassBinder.prototype.has = function (key) {
            return this._bindings.has(key);
        };
        //获取需要注入的类型数据
        DecoratorClassBinder.prototype.get = function (target) {
            //检查是否为实例
            if (!(target instanceof Object))
                throw new Error("proto must is a object but" + target + "is not");
            //检查是否存在缓存
            if (!this._decoratorClassBufferMap.has(target)) {
                //获取继承列表
                var extendsList = ioc.Prototype.getPrototypeList(target);
                var injectClass = new ioc.DecoratorClass();
                var list = [];
                var dict = void 0;
                var that = this;
                var bindingMaps_1 = [];
                if (extendsList && extendsList.length > 0) {
                    for (var i = 0; i < extendsList.length; i++) {
                        dict = that.getBindingMap(extendsList[i]);
                        if (dict && dict.size > 0) {
                            dict.forEach(function (inside) {
                                bindingMaps_1.push(inside);
                            });
                        }
                    }
                }
                var inside = void 0;
                if (bindingMaps_1 && bindingMaps_1.length > 0) {
                    for (var i = 0; i < bindingMaps_1.length; i++) {
                        inside = bindingMaps_1[i];
                        if (inside && inside.size > 0) {
                            var values = inside.values();
                            for (var j = 0; j < inside.size; j++) {
                                var binding = values.next();
                                list.push(binding.value);
                            }
                        }
                    }
                }
                injectClass.list = list;
                //添加缓存
                this._decoratorClassBufferMap.set(target, injectClass);
            }
            //从缓存映射中获取对应的列表
            return this._decoratorClassBufferMap.get(target);
        };
        //重写绑定方法
        DecoratorClassBinder.prototype.bind = function (key) {
            return _super.prototype.bind.call(this, key);
        };
        //重写获取绑定状态方法
        DecoratorClassBinder.prototype.getBinding = function (key, name) {
            return _super.prototype.getBinding.call(this, key, name);
        };
        //重写绑定获取方法
        DecoratorClassBinder.prototype.getRawBinding = function () {
            return new ioc.DecoratorClassBinding(this.resolver.bind(this));
        };
        //重写解析器
        DecoratorClassBinder.prototype.resolver = function (binding) {
            _super.prototype.resolver.call(this, binding);
        };
        /**
         * 重写解析绑定状态
         * @param binding 绑定状态
         * @param key 键值
         */
        DecoratorClassBinder.prototype.resolveBinding = function (binding, key) {
            //绑定状态必须有属性名
            if (!binding.property)
                return;
            //检查绑定状态是否存在别名
            var bindingName = (binding.name == null) ? ioc.BindingConst.NULL : binding.name;
            var dict;
            //检查绑定状态字典已经存在键值
            if ((this._bindings.has(key))) {
                //获取绑定映射
                dict = this._bindings.get(key);
                //检查绑定映射是否存在别名
                if (dict.has(bindingName)) {
                    //获取内部映射
                    var insideDict_1 = dict.get(bindingName);
                    //检查映射内是否存在属性名
                    if (insideDict_1.has(binding.property)) {
                        var existingBinding = insideDict_1.get(binding.property);
                        //如果存在绑定状态
                        if (existingBinding) {
                            //检查存在对应状态绑定是否于当前相等
                            if (existingBinding != binding) {
                                //如果绑定值为空
                                if (!existingBinding.value) {
                                    //移除无效的绑定别名
                                    dict.delete(bindingName);
                                }
                            }
                        }
                    }
                }
            }
            else {
                //创建绑定映射Map< 别名, Map< 属性名, 绑定状态 >
                dict = new Map();
                //添加绑定映射
                this._bindings.set(key, dict);
            }
            //如果存在默认绑定状态并且等于当前绑定状态
            if (dict.has(ioc.BindingConst.NULL)) {
                var insideDic = dict.get(ioc.BindingConst.NULL);
                if (insideDic.has(binding.property)) {
                    var existingBinding = insideDic.get(binding.property);
                    if (binding.property === binding) {
                        //删除默认绑定
                        insideDic.delete(ioc.BindingConst.NULL);
                    }
                }
            }
            var insideDict;
            //添加或覆盖绑定状态
            if (!dict.has(bindingName)) {
                //创建内部映射
                insideDict = new Map();
                //映射绑定状态
                insideDict.set(binding.property, binding);
                //映射绑定
                dict.set(bindingName, insideDict);
            }
            else {
                //获取内部映射
                insideDict = dict.get(bindingName);
                //检查是否存在属性名映射
                if (!insideDict.has(binding.property)) {
                    //映射绑定
                    insideDict.set(binding.property, binding);
                }
            }
        };
        /**
         * 重写获取绑定状态映射表，返回键值的所有绑定状态
         * @param key 被绑定的键值
         */
        DecoratorClassBinder.prototype.getBindingMap = function (key) {
            if (this._bindings.has(key)) {
                return this._bindings.get(key);
            }
        };
        return DecoratorClassBinder;
    }(ioc.Binder));
    ioc.DecoratorClassBinder = DecoratorClassBinder;
})(ioc || (ioc = {}));
//# sourceMappingURL=DecoratorClassBinder.js.map