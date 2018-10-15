var ioc;
(function (ioc) {
    var IocError;
    (function (IocError) {
        IocError.IC_ERROR = "can't implement class that is only as interface";
    })(IocError = ioc.IocError || (ioc.IocError = {}));
    var IConstructorName = /** @class */ (function () {
        function IConstructorName() {
        }
        return IConstructorName;
    }());
    ioc.IConstructorName = IConstructorName;
})(ioc || (ioc = {}));
//# sourceMappingURL=IocConst.js.map
var ioc;
(function (ioc) {
    /**
     * 原型缓存字典，用于检测一个对象的基类
     */
    var Prototype = /** @class */ (function () {
        function Prototype() {
        }
        /**
         * 基类检测函数
         * @param instance 实例
         * @param prototype 基类
         */
        Prototype.isProtetype = function (type, prototype) {
            //let b = type instanceof prototype;
            return type instanceof prototype;
            /*         if(!(type instanceof Object))return false;
                    let constructor = type.constructor;
                    if(this.prototypeMap.has(constructor)){
                        let sett = this.prototypeMap.get(constructor);
                        if(sett.has(prototype)){
                            return true;
                        }else{
                            return false;
                        }
                    }
                    return false; */
        };
        /**
         * 获取继承列表
         * @param instance 实例
         */
        Prototype.getPrototypeList = function (target) {
            var that = this;
            if (!this.hasPrototypeList(target)) {
                var extendsList = void 0;
                //获取继承列表
                extendsList = [];
                //用构造函数代替类型来使用
                var types = [];
                //types.push(target.constructor);
                //继承类型
                var prototype = target.__proto__;
                //构造函数
                var constructor_1;
                while (true) {
                    //如果继承存在
                    if (prototype) {
                        //因为压缩代码会把所有对象的名称都压缩掉，所以这里使用构造函数作为键值
                        constructor_1 = prototype.constructor;
                        //搜索到基类一层
                        if (constructor_1 === Object)
                            break;
                        //排除以__IC__开头模拟接口的临时替代类型
                        if (!constructor_1.name.startsWith("__IC_")) {
                            extendsList.push(constructor_1);
                            types.push(constructor_1);
                            //为每一个类都添加继承关系
                            types.forEach(function (type) {
                                that.AddPrototype(type, constructor_1);
                            });
                        }
                        prototype = prototype.__proto__;
                    }
                    else {
                        break;
                    }
                }
            }
            var values = this.prototypeMap.get(target.constructor);
            return Array.from(values);
        };
        /**
         * 添加继承关系
         */
        Prototype.AddPrototype = function (tpye, prototype) {
            var extendSet;
            if (this.prototypeMap.has(tpye)) {
                extendSet = this.prototypeMap.get(tpye);
            }
            else {
                extendSet = new Set();
                this.prototypeMap.set(tpye, extendSet);
            }
            //为继承队列加入新的继承
            extendSet.add(prototype);
        };
        /**
         * 是否存在继承列表
         * @param instance 实例
         */
        Prototype.hasPrototypeList = function (target) {
            if (this.prototypeMap.has(target.constructor)) {
                return true;
            }
            else {
                return false;
            }
        };
        //继承映射表
        Prototype.prototypeMap = new Map();
        return Prototype;
    }());
    ioc.Prototype = Prototype;
})(ioc || (ioc = {}));
//# sourceMappingURL=Prototype.js.map
/* import { IConstructorName } from "../IocConst"; */
var ioc;
(function (ioc) {
    var __IC_Binding = /** @class */ (function () {
        function __IC_Binding() {
        }
        Object.defineProperty(__IC_Binding.prototype, "constructorName", {
            get: function () {
                return "IBinding";
            },
            enumerable: true,
            configurable: true
        });
        return __IC_Binding;
    }());
    ioc.__IC_Binding = __IC_Binding;
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
var ioc;
(function (ioc) {
    var BindingConst;
    (function (BindingConst) {
        //定义空常量
        BindingConst.NULL = Symbol("NULL");
    })(BindingConst = ioc.BindingConst || (ioc.BindingConst = {}));
})(ioc || (ioc = {}));
//# sourceMappingURL=BindConst.js.map
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
/* import { Binding } from "../Bind/Binding"; */
var ioc;
(function (ioc) {
    var DecoratorClassBinding = /** @class */ (function (_super) {
        __extends(DecoratorClassBinding, _super);
        function DecoratorClassBinding() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(DecoratorClassBinding.prototype, "property", {
            get: function () {
                return this._property;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 从正在绑定状态映射到属性，返回此时的绑定状态。
         * @param property 绑定映射的值
         */
        DecoratorClassBinding.prototype.toProperty = function (property) {
            this._property = property;
            if (this._resolver != null)
                this._resolver(this);
            return this;
        };
        //重写绑定到值
        DecoratorClassBinding.prototype.to = function (value) {
            return _super.prototype.to.call(this, value);
        };
        //重写绑定别名
        DecoratorClassBinding.prototype.toName = function (name) {
            return _super.prototype.toName.call(this, name);
        };
        return DecoratorClassBinding;
    }(ioc.Binding));
    ioc.DecoratorClassBinding = DecoratorClassBinding;
})(ioc || (ioc = {}));
//# sourceMappingURL=DecoratorClassBinding.js.map
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
/* import { DecoratorClassBinder } from "./DecoratorClassBinder"; */
var ioc;
(function (ioc) {
    var DecoratorConst;
    (function (DecoratorConst) {
        /**
         * 全局注册接入点
         * 使用属性的类型和属性的别名识别被注入的属性
         */
        DecoratorConst.DECORATOR_CLASS_BINDER = new ioc.DecoratorClassBinder();
    })(DecoratorConst = ioc.DecoratorConst || (ioc.DecoratorConst = {}));
})(ioc || (ioc = {}));
//# sourceMappingURL=DecoratorConst.js.map
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
/* import { InjectFactory } from "./InjectFactory"
import { InjectBinder } from "./InjectBinder";
import { InjectBinding } from "./InjectBinding";
import { InjectConst} from "./InjectConst";
import { DecoratorClass } from "../Decorator/DecoratorClass";
import { DecoratorClassBinder } from "../Decorator/DecoratorClassBinder";
import { Binding } from "../Bind/Binding";
 */
var ioc;
(function (ioc) {
    var Injector = /** @class */ (function () {
        function Injector() {
            this.factory = new ioc.InjectFactory();
        }
        Injector.prototype.uninject = function (target) {
            if (!this.binder || !target)
                throw new Error("Attempt to inject into Injector without a Binder or null instance");
            //排除一些不能被注入的类型
            var type = typeof target;
            if (type === "string" || type === "boolean" || type === "number" || type === "symbol" || type === "undefined" || type === "function") {
                return target;
            }
            //获取注入类
            var injectClass = this.injectClassBinder.get(target);
            this.decoratorUnInject(target, injectClass);
        };
        Injector.prototype.decoratorUnInject = function (target, injectClass) {
            var that = this;
            //遍历注入类
            injectClass.list.forEach(function (binding) {
                //尝试获绑定状态
                var injectBinding = that.binder.getBinding(binding.value, binding.name);
                //不能注入一个未绑定的值
                if (injectBinding) {
                    //将注入值赋给目标对象
                    target[binding.property] = null;
                }
            });
        };
        //实例化对象
        Injector.prototype.instantiate = function (binding, tryInjectHere) {
            //检查是否具备注入条件
            if (!this.binder || !this.factory)
                throw new Error("Attempt to instantiate from Injector without a Binder or inject into Injector without a Factory");
            //构造函数
            var constructor = null;
            //实例对象
            var instance = null;
            //检查绑定状态的值是否为构造函数
            if (binding.isValueConstructor) {
                //传入构造函数
                constructor = binding.value;
            }
            else {
                //直接赋值
                instance = binding.value;
            }
            //如果没有设置注入值但是键值是一个构造函数
            if (!constructor && binding.isKeyConstructor) {
                //指定绑定状态的键值为构造函数
                constructor = binding.key;
            }
            //如果没有直接赋值实例并且存在构造函数
            if (!instance && constructor) {
                //参数
                var args = binding.args;
                instance = this.factory.get(binding, args);
                //如果尝试在这里直接注入
                if (tryInjectHere) {
                    this.tryInject(binding, instance);
                }
            }
            return instance;
        };
        Injector.prototype.tryInject = function (binding, target) {
            //如果工厂不能创建实例则这里直接返回
            if (target != null) {
                if (binding.isInject) {
                    target = this.inject(target, false);
                }
                if (binding.bindingType == "Singleton" /* SINGLETON */ || binding.bindingType == "Value" /* VALUE */) {
                    //prevent double-injection
                    binding.toInject(false);
                }
            }
            return target;
        };
        //注入目标中所有被@Inject标记的属性
        Injector.prototype.inject = function (target, attemptConstructorInjection) {
            if (!this.binder || !target)
                throw new Error("Attempt to inject into Injector without a Binder or null instance");
            //排除一些不能被注入的类型
            var type = typeof target;
            if (type === "string" || type === "boolean" || type === "number" || type === "symbol" || type === "undefined" || type === "function") {
                return target;
            }
            //因为TS中无法获得类型名称，所以使用目标的构造函数名称代替类型名称
            //let typeName : string = target.constructor;
            //获取注入类
            var injectClass = this.injectClassBinder.get(target);
            //是否允许使用构造器注入
            if (attemptConstructorInjection) {
                //target = performConstructorInject(target, reflection);
            }
            this.decoratorInject(target, injectClass);
            //performSetterInject(target, reflection);
            //postInject(target, reflection);
            return target;
        };
        /**
         * 装饰器注入，使用注入类进行注入
         */
        Injector.prototype.decoratorInject = function (target, injectClass) {
            var that = this;
            //遍历注入类
            injectClass.list.forEach(function (binding) {
                //console.info("[装饰器注入]"+binding.value + "[别名]"+binding.name);
                //尝试获绑定状态
                var injectBinding = that.binder.getBinding(binding.value, binding.name);
                //不能注入一个未绑定的值
                if (injectBinding) {
                    var instance = that.getInjectValue(injectBinding.key, injectBinding.name);
                    //将注入值赋给目标对象
                    target[binding.property] = instance;
                }
            });
        };
        /**
         * 获取需要注入的值，这个过程会递归调用
         * @see 注意循环依赖会严重消耗性能
         */
        Injector.prototype.getInjectValue = function (type, name) {
            //尝试获取绑定状态
            var binding = this.binder.getBinding(type, name);
            if (!binding)
                return null;
            //if(binding.key.name)console.info("[获取注入值]"+binding.key.name+"[别名]"+name+"[绑定状态]"+binding.bindingType + ","+binding.isInject);
            //else console.info("[获取注入值]"+binding.key+"[别名]"+name+"[绑定状态]"+binding.bindingType + "[需要注入]"+binding.isInject);
            //如果是值类型绑定
            if (binding.bindingType === "Value" /* VALUE */) {
                //如果需要注入
                if (binding.isInject) {
                    //if(Binding.isConstructor(binding.value))console.info("[对值(构造函数))]"+binding.value.constructor.name + "[进行注入]");
                    //else console.info("[对值(对象)]"+binding.value.__proto__.constructor + "[进行注入]");
                    var injv = this.inject(binding.value, false);
                    binding.toInject(false);
                    //if(binding.key.name)console.info("[绑定状态]"+binding.key.name+"[完成注入]"+binding.isInject);
                    //else console.info("[绑定状态]"+binding.key+"[完成注入]"+binding.isInject);
                    return injv;
                }
                else {
                    return binding.value;
                }
                //如果是单例注入
            }
            else if (binding.bindingType == "Singleton" /* SINGLETON */) {
                //如果绑定状态的值是一个构造函数
                if (binding.isValueConstructor || binding.value == null) {
                    this.instantiate(binding, true);
                }
                return binding.value;
            }
            else {
                return this.instantiate(binding, true);
            }
        };
        return Injector;
    }());
    ioc.Injector = Injector;
})(ioc || (ioc = {}));
//# sourceMappingURL=Injector.js.map
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
/* import { Binding } from "../Bind/Binding";
import {InjectConst} from "./InjectConst"; */
var ioc;
(function (ioc) {
    var InjectBinding = /** @class */ (function (_super) {
        __extends(InjectBinding, _super);
        function InjectBinding() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._isUnbind = false;
            //默认绑定状态
            _this._bindingType = "Default" /* DEFAULT */;
            //默认自动注入
            _this._isInject = true;
            return _this;
        }
        Object.defineProperty(InjectBinding.prototype, "isInject", {
            /*     //键值是否为构造函数
                protected _isKeyConstructor = false;
                //值是否为构造函数
                protected _isValueConstructor = false; */
            /*     public get isKeyConstructor(){
                    return this._isKeyConstructor;
                }
                public get isValueConstructor(){
                    return this._isValueConstructor;
                } */
            get: function () {
                return this._isInject;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InjectBinding.prototype, "args", {
            //参数列表
            get: function () {
                return this._args;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InjectBinding.prototype, "bindingType", {
            get: function () {
                return this._bindingType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InjectBinding.prototype, "isUnbind", {
            get: function () {
                return this._isUnbind;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 参数列表
         */
        InjectBinding.prototype.toArgs = function () {
            this._args = arguments;
            if (this._resolver != null) {
                this._resolver(this);
            }
            return this;
        };
        /**
         * 设置为单例模式时，每次都会得到相同的实例
         */
        InjectBinding.prototype.toSingleton = function () {
            //如果已经存在一个值了, 那么这次映射就被视为多余的
            if (this._bindingType === "Value" /* VALUE */) {
                return this;
            }
            //设定为单例注入
            this._bindingType = "Singleton" /* SINGLETON */;
            if (this._resolver != null) {
                this._resolver(this);
            }
            return this;
        };
        /**
         * 设置为解绑时，调用解绑方法将会解绑所有被标记的绑定状态
         */
        InjectBinding.prototype.unBind = function () {
            this._isUnbind = true;
            return this;
        };
        InjectBinding.prototype.toValue = function (value) {
            this._bindingType = "Value" /* VALUE */;
            this.setValue(value);
            return this;
        };
        InjectBinding.prototype.setValue = function (o) {
            this.to(o);
            return this;
        };
        InjectBinding.prototype.toInject = function (value) {
            this._isInject = value;
            return this;
        };
        //重写基类的赋值函数
        InjectBinding.prototype.to = function (value) {
            return _super.prototype.to.call(this, value);
        };
        InjectBinding.prototype.toName = function (name) {
            return _super.prototype.toName.call(this, name);
        };
        return InjectBinding;
    }(ioc.Binding));
    ioc.InjectBinding = InjectBinding;
})(ioc || (ioc = {}));
//# sourceMappingURL=InjectBinding.js.map
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
/* import {Binder, IBinder} from "../Bind/Binder"
import {IBinding, Binding} from "../Bind/Binding"
import {BindingConst} from "../Bind/BindConst"
import { Injector } from "./Injector";
import { InjectBinding } from "./InjectBinding";
import {DecoratorConst} from "../Decorator/DecoratorConst"
import {IocError, IConstructorName} from "../IocConst" */
var ioc;
(function (ioc) {
    //全局注入数据绑定器
    var ClassBinder = ioc.DecoratorConst.DECORATOR_CLASS_BINDER;
    var __IC_InjectBinder = /** @class */ (function () {
        function __IC_InjectBinder() {
        }
        Object.defineProperty(__IC_InjectBinder.prototype, "constructorName", {
            get: function () {
                return "IInjectBinder";
            },
            enumerable: true,
            configurable: true
        });
        return __IC_InjectBinder;
    }());
    ioc.__IC_InjectBinder = __IC_InjectBinder;
    var InjectBinder = /** @class */ (function (_super) {
        __extends(InjectBinder, _super);
        function InjectBinder() {
            var _this = _super.call(this) || this;
            _this._injector = new ioc.Injector();
            _this._injector.binder = _this;
            _this._injector.injectClassBinder = ClassBinder;
            return _this;
        }
        Object.defineProperty(InjectBinder.prototype, "injector", {
            get: function () {
                return this._injector;
            },
            enumerable: true,
            configurable: true
        });
        //绑定状态映射字典
        InjectBinder.prototype.getInstance = function (key, name) {
            //如果未设置别名则使用默认设置
            if (!name)
                name = ioc.BindingConst.NULL;
            //获取绑定状态
            var binding = this.getBinding(ioc.Binding.checkAbstract(key), name);
            //尝试获取一个未绑定的键值对时抛出绑定失败异常
            if (binding == null) {
                throw new Error("InjectionBinder has no binding for:\n\tkey: " + key + "\nname: " + name);
            }
            //根据绑定状态从注入器中获取实例
            //console.info("[实例化]"+binding.key);
            var instance = this._injector.instantiate(binding, false);
            //console.info("[尝试注入]"+Binding.checkAbstract(binding.key));
            this._injector.tryInject(binding, instance);
            return instance;
        };
        //重写获取绑定状态方法
        InjectBinder.prototype.getBinding = function (key, name) {
            return _super.prototype.getBinding.call(this, key, name);
        };
        //重写基类的绑定函数
        InjectBinder.prototype.bind = function (key) {
            return _super.prototype.bind.call(this, key);
        };
        InjectBinder.prototype.getRawBinding = function () {
            return new ioc.InjectBinding(this.resolver.bind(this));
        };
        InjectBinder.prototype.unbindAllMark = function () {
            var that = this;
            var unbinds = [];
            this._bindings.forEach(function (dict) {
                dict.forEach(function (binding) {
                    if (binding.isUnbind) {
                        unbinds.push(binding);
                    }
                });
            });
            //解除被标记的绑定
            unbinds.forEach(function (binding) {
                that.unbind(binding.key, binding.name);
            });
        };
        return InjectBinder;
    }(ioc.Binder));
    ioc.InjectBinder = InjectBinder;
})(ioc || (ioc = {}));
//# sourceMappingURL=InjectBinder.js.map
/* import {DecoratorConst} from "../Decorator/DecoratorConst"
import { Binding } from "../Bind/Binding"; */
var ioc;
(function (ioc) {
    //全局注入数据绑定器
    var ClassBinder = ioc.DecoratorConst.DECORATOR_CLASS_BINDER;
    /**
     * 使用默认的方式注入属性值
     */
    //export function inject<T>(_target: Object, _key: any, _desc ? : any) : void;
    //利用重载的形式定义注入属性的方法
    function inject() {
        switch (arguments.length) {
            case 0:
                break;
            case 1:
                return injectNoNameFunc(arguments[0]);
                break;
            case 2:
                return injectToNameFunc(arguments[0], arguments[1]);
                break;
            case 3:
                break;
        }
    }
    ioc.inject = inject;
    /**
     * 无别名的属性装饰器
     * @param _constructor 类型T的构造函数
     */
    var injectNoNameFunc = function (_constructor) {
        return function (_target, _property) {
            injectFunc(_target, _constructor, _property);
        };
    };
    /**
     * 带别名的属性装饰器
     * @param _constructor 类型T的构造函数
     */
    var injectToNameFunc = function (_constructor, _name) {
        return function (_target, _property) {
            injectFunc(_target, _constructor, _property, _name);
        };
    };
    /**
     *
     * @param _target 被注入的目标类
     * @param _constructor 注入的类
     * @param _property 注入的类的属性名
     * @param _name 注入的类的别名
     */
    function injectFunc(_target, _constructor, _property, _name) {
        //所有实现了IConstructorName的类都属于虚类，这里获取虚类对应的接口名作为键值传递给绑定器
        //因为压缩代码会把所有对象的名称都压缩掉，所以这里使用构造函数作为键值
        ClassBinder.bind(_target.constructor).to(ioc.Binding.checkAbstract(_constructor)).toProperty(_property).toName(_name);
    }
})(ioc || (ioc = {}));
//# sourceMappingURL=InjectDecorator.js.map
/* import { CommandBinding } from "./CommandBinding";
import { IBinding } from "../Bind/Binding";
import { Binder } from "../Bind/Binder";
import { IConstructorName } from "../IocConst"; */
var ioc;
(function (ioc) {
    var __IC_CommandBinder = /** @class */ (function () {
        function __IC_CommandBinder() {
        }
        Object.defineProperty(__IC_CommandBinder.prototype, "constructorName", {
            get: function () {
                return "ICommandBinder";
            },
            enumerable: true,
            configurable: true
        });
        return __IC_CommandBinder;
    }());
    ioc.__IC_CommandBinder = __IC_CommandBinder;
})(ioc || (ioc = {}));
//# sourceMappingURL=ICommandBinder.js.map
var ioc;
(function (ioc) {
    //注入状态类型枚举
    var CommandConst;
    (function (CommandConst) {
        /// Temporary marker for any pool instantiated by the CommandBinder
        CommandConst["COMMAND_POOL"] = "COMMAND_POOL";
    })(CommandConst = ioc.CommandConst || (ioc.CommandConst = {}));
})(ioc || (ioc = {}));
//# sourceMappingURL=CommandConst.js.map
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
/* import { Binding } from "../Bind/Binding"; */
var ioc;
(function (ioc) {
    var CommandBinding = /** @class */ (function (_super) {
        __extends(CommandBinding, _super);
        function CommandBinding() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(CommandBinding.prototype, "isSequence", {
            get: function () {
                return this._isSequence;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommandBinding.prototype, "isOnce", {
            get: function () {
                return this._isOnce;
            },
            enumerable: true,
            configurable: true
        });
        CommandBinding.prototype.to = function (value) {
            return _super.prototype.to.call(this, value);
        };
        CommandBinding.prototype.toName = function (name) {
            return _super.prototype.toName.call(this, name);
        };
        /**
         * 是否进入池
         */
        CommandBinding.prototype.Pooled = function () {
            this.isPooled = true;
            this._resolver(this);
            return this;
        };
        return CommandBinding;
    }(ioc.Binding));
    ioc.CommandBinding = CommandBinding;
})(ioc || (ioc = {}));
//# sourceMappingURL=CommandBinding.js.map
/* import {IBinding,Binding} from "../Bind/Binding"
import {__IC_InjectBinder,IInjectBinder} from "../Injector/InjectBinder";
import {CommandBinding} from "./CommandBinding";
import {ISignal} from "../Signal/Signal"
import {InjectBinding} from "../Injector/InjectBinding";
import {ICommand,__IC_Command} from "./Command";
import {Pool} from "../Pool";
import {CommandConst} from "./CommandConst"
import {inject} from "../Injector/InjectDecorator";
import {Binder} from "../Bind/Binder";
import {ICommandBinder} from "./ICommandBinder"; */
//全局注入数据绑定器
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ioc;
(function (ioc) {
    /**
     * 指令绑定器
     */
    var CommandBinder = /** @class */ (function (_super) {
        __extends(CommandBinder, _super);
        function CommandBinder() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            //指令池
            _this.pools = new Map();
            // Tracker for parallel commands in progress
            _this.activeCommands = new Set();
            // Tracker for sequences in progress
            _this.activeSequences = new Map();
            //是否使用池
            _this.usePooling = false;
            return _this;
        }
        CommandBinder.prototype.getPool = function (type) {
            if (this.pools.has(type))
                return this.pools.get(type);
            return null;
        };
        CommandBinder.prototype.resolver = function (binding) {
            var _this = this;
            _super.prototype.resolver.call(this, binding);
            if (this.usePooling && binding.isPooled) {
                if (binding.value != null) {
                    var that_1 = this;
                    //检查被绑定的值是否有效
                    var values = binding.value;
                    if (values.length === 0) {
                        values = [];
                        values.push(binding.value);
                    }
                    if (values && values.length > 0) {
                        values.forEach(function (value) {
                            //如果找不到对应的池则创建
                            if (that_1.pools.has(value) == false) {
                                var myPool = _this.makePoolFromType(value);
                                that_1.pools.set(value, myPool);
                            }
                        });
                    }
                }
            }
        };
        CommandBinder.prototype.makePoolFromType = function (type) {
            //池构造函数作为类型使用
            var poolType = type;
            //预制实例缓存
            this.injectBinder.bind(type).to(type);
            //获取一个池实例
            this.injectBinder.bind(ioc.Pool).to(ioc.Pool).toName(ioc.CommandConst.COMMAND_POOL);
            var pool = this.injectBinder.getInstance(ioc.Pool, ioc.CommandConst.COMMAND_POOL);
            this.injectBinder.unbind(ioc.Pool, ioc.CommandConst.COMMAND_POOL);
            pool.bind(poolType);
            return pool;
        };
        //绑定状态映射字典
        CommandBinder.prototype.getRawBinding = function () {
            return new ioc.CommandBinding(this.resolver.bind(this));
        };
        CommandBinder.prototype.bind = function (key) {
            return _super.prototype.bind.call(this, key);
        };
        //调用指令
        CommandBinder.prototype.invokeCommand = function (cmd, binding, args, depth) {
            var command = this.createCommand(cmd, args);
            command.sequenceId = depth;
            this.trackCommand(command, binding);
            this.executeCommand(command, args);
            return command;
        };
        //
        CommandBinder.prototype.createCommand = function (cmd, data) {
            var command = this.getCommand(cmd);
            if (command == null) {
                var msg = "A Command ";
                if (data != null) {
                    msg += "tied to data " + data.toString();
                }
                msg += " could not be instantiated.\nThis might be caused by a null pointer during instantiation or failing to override Execute (generally you shouldn't have constructor code in Commands).";
                throw new Error(msg);
            }
            command.data = data;
            return command;
        };
        //获取指令实例
        CommandBinder.prototype.getCommand = function (type) {
            //如果使用池则检查是否已经存在相应的实例
            if (this.usePooling && this.pools.has(type)) {
                var pool = this.pools.get(type);
                var command = pool.getInstance();
                //是否存在对应的实例
                if (command) {
                    //检查是否已经清理
                    if (command.isClean) {
                        this.injectBinder.injector.inject(command, null);
                        command.deploy();
                    }
                }
                else {
                    //获取实例
                    command = this.injectBinder.getInstance(type, null);
                    //为池添加实例缓存
                    pool.add(command);
                }
                return command;
            }
            else {
                this.injectBinder.bind(ioc.__IC_Command).to(type);
                var command = this.injectBinder.getInstance(ioc.__IC_Command, null);
                this.injectBinder.unbind(ioc.__IC_Command, null);
                return command;
            }
        };
        CommandBinder.prototype.trackCommand = function (command, binding) {
            if (binding.isSequence) {
                this.activeSequences.set(command, binding);
            }
            else {
                this.activeCommands.add(command);
            }
        };
        //执行指令
        CommandBinder.prototype.executeCommand = function (command, args) {
            if (command == null) {
                return;
            }
            command.execute.apply(command, args);
        };
        /**
         * 信号调用回掉函数
         * @param trigger 触发的信号
         * @param data 数据
         */
        CommandBinder.prototype.onDispose = function (trigger) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            //尝试获取绑定状态
            var binding = this.getBinding(trigger, null);
            if (binding != null) {
                //是否处于执行序列中
                if (binding.isSequence) {
                    //加入执行队列
                    this.next(binding, args, 0);
                }
                else {
                    //获取被绑定的指令对象
                    var values = binding.value;
                    var aa = values.length + 1;
                    for (var a = 0; a < aa; a++) {
                        this.next(binding, args, a);
                    }
                }
            }
        };
        //下一次即将执行的指令
        CommandBinder.prototype.next = function (binding, args, depth) {
            var values = binding.value;
            if (values.length === 0) {
                values = [];
                values.push(binding.value);
            }
            if (depth < values.length) {
                var cmd = values[depth];
                var command = this.invokeCommand(cmd, binding, args, depth);
                this.releaseCommand(command);
            }
            else {
                this.disposeOfSequencedData(args);
                //是否仅执行一次
                if (binding.isOnce) {
                    //解除绑定
                    this.unbind(binding, null);
                }
            }
        };
        //EventCommandBinder (and perhaps other sub-classes) use this method to dispose of the data in sequenced commands
        CommandBinder.prototype.disposeOfSequencedData = function (data) {
            //No-op. Override if necessary.
        };
        //释放指令，使其进入池
        CommandBinder.prototype.releaseCommand = function (command) {
            //有时会需要执行一些耗时的异步操作，如果指令被用户保持则不进行释放，默认情况下都是自动释放的
            if (!command.isRetain) {
                //使用构造函数作为类型
                var t = command.constructor;
                if (this.usePooling && this.pools.has(t)) {
                    this.pools.get(t).returnInstance(command);
                }
                if (this.activeCommands.has(command)) {
                    this.activeCommands.delete(command);
                }
                else if (this.activeSequences.has(command)) {
                    var binding = this.activeSequences.get(command);
                    var data = command.data;
                    this.activeSequences.delete(command);
                    this.next(binding, data, command.sequenceId + 1);
                }
            }
        };
        __decorate([
            ioc.inject(ioc.__IC_InjectBinder)
        ], CommandBinder.prototype, "injectBinder", void 0);
        return CommandBinder;
    }(ioc.Binder));
    ioc.CommandBinder = CommandBinder;
    var SignalCommandBinder = /** @class */ (function (_super) {
        __extends(SignalCommandBinder, _super);
        function SignalCommandBinder() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            //启用池
            _this.usePooling = true;
            return _this;
        }
        //重写解析绑定状态函数
        SignalCommandBinder.prototype.resolveBinding = function (binding, key) {
            _super.prototype.resolveBinding.call(this, binding, key);
            //如果已经存在了则不能再次绑定
            if (this._bindings.has(key)) {
                var signal = key;
                signal.addListener(this.onDispose.bind(this)); //Do normal bits, then assign the commandlistener to be reactTo
            }
        };
        //重写绑定方法
        SignalCommandBinder.prototype.bind = function (value) {
            //获取绑定状态
            var binding = this.injectBinder.getBinding(value, null);
            var signal = null;
            //检查参数值是否为构造函数
            if (ioc.Binding.isConstructor(value)) {
                //如果尚未进行注入则注入一个单例
                if (binding == null) {
                    binding = this.injectBinder.bind(value);
                    binding.toSingleton();
                }
                signal = this.injectBinder.getInstance(value, null);
            }
            //如果信号存在则绑定信号，否则直接绑定值
            if (signal) {
                return _super.prototype.bind.call(this, signal);
            }
            else {
                return _super.prototype.bind.call(this, value);
            }
        };
        //重写获取绑定状态方法
        SignalCommandBinder.prototype.getBinding = function (key, name) {
            var signal;
            //检查键值是否为构造函数
            if (ioc.Binding.isConstructor(key)) {
                //参数应该是一个信号或信号的构造函数，而不是其他的值
                signal = this.injectBinder.getInstance(key, name);
            }
            else {
                //信号是一个实例
                signal = key;
            }
            return _super.prototype.getBinding.call(this, signal, name);
        };
        SignalCommandBinder.prototype.invokeCommand = function (cmd, binding, args, depth) {
            var signal = binding.key;
            var command = this.createCommandForSignal(cmd, args); //Special signal-only command creation
            command.sequenceId = depth;
            this.trackCommand(command, binding);
            this.executeCommand(command, args);
            return command;
        };
        // Create a Command and bind its injectable parameters to the Signal types
        SignalCommandBinder.prototype.createCommandForSignal = function (cmd, args) {
            var that = this;
            if (args != null) {
                var signalData = args;
                //Iterate each signal type, in order. 
                //Iterate values and find a match
                //If we cannot find a match, throw an error
                var injectedTypes = new Set();
                var values = [signalData];
                /* if(signalTypes&&signalTypes.length>0){
                signalTypes.forEach((type)=>{
                    if (!injectedTypes.has(type)) // Do not allow more than one injection of the same Type
                    {
                        let foundValue : boolean= false;
                        for(let i = 0;i<values.length;i++){
                            if (values[i] != null)
                            {
                                that.injectBinder.bind(type).toValue(values[i]).toInject(false);
                                injectedTypes.add(type);
                                //values[i]=null;
                                foundValue = true;
                                break;
                            }
                            else //Do not allow null injections
                            {
                                throw new Error("SignalCommandBinder attempted to bind a null value from a signal to Command: " + cmd.GetType() + " to type: " + type);
                            }
                        }
                        if (!foundValue)
                        {
                            throw new Error("Could not find an unused injectable value to inject in to Command: " + cmd.GetType() + " for Type: " + type);
                        }
                    }
                    else
                    {
                        throw new Error("SignalCommandBinder: You have attempted to map more than one value of type: " + type +
                            " in Command: " + cmd.GetType() + ". Only the first value of a type will be injected. You may want to place your values in a VO, instead.");
                    }
                })
                }*/
            }
            var command = that.getCommand(cmd);
            command.data = args;
            /*         if (signalTypes && signalTypes.length > 0) {
                        signalTypes.forEach((typeToRemove) => {
                            that.injectBinder.unbind(typeToRemove, null);
                        })
                    } */
            return command;
        };
        return SignalCommandBinder;
    }(CommandBinder));
    ioc.SignalCommandBinder = SignalCommandBinder;
})(ioc || (ioc = {}));
//# sourceMappingURL=CommandBinder.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* import { ICommandBinder, __IC_CommandBinder } from "./ICommandBinder";
import { __IC_InjectBinder, IInjectBinder } from "../Injector/InjectBinder";
import { inject } from "../Injector/InjectDecorator";
import { IConstructorName } from "../IocConst";
 */
var ioc;
(function (ioc) {
    var __IC_Command = /** @class */ (function () {
        function __IC_Command() {
        }
        Object.defineProperty(__IC_Command.prototype, "constructorName", {
            get: function () {
                return "ICommand";
            },
            enumerable: true,
            configurable: true
        });
        return __IC_Command;
    }());
    ioc.__IC_Command = __IC_Command;
    var Command = /** @class */ (function () {
        function Command() {
            this._clean = false;
            this._retain = false;
        }
        Command.prototype.deploy = function () {
            this._clean = false;
        };
        Command.prototype.clean = function () {
            this._clean = true;
        };
        Object.defineProperty(Command.prototype, "isClean", {
            get: function () {
                return this._clean;
            },
            enumerable: true,
            configurable: true
        });
        ;
        //保持指令
        Command.prototype.retain = function () {
            this._retain = true;
        };
        Command.prototype.release = function () {
            this._retain = false;
        };
        Object.defineProperty(Command.prototype, "isRetain", {
            get: function () {
                return this._retain;
            },
            enumerable: true,
            configurable: true
        });
        //重新释放
        Command.prototype.restore = function () {
            this.injectBinder.injector.uninject(this);
            this.clean();
        };
        //执行指令
        Command.prototype.execute = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        __decorate([
            ioc.inject(ioc.__IC_InjectBinder)
        ], Command.prototype, "injectBinder", void 0);
        __decorate([
            ioc.inject(ioc.__IC_CommandBinder)
        ], Command.prototype, "commandBinder", void 0);
        return Command;
    }());
    ioc.Command = Command;
})(ioc || (ioc = {}));
//# sourceMappingURL=Command.js.map
/* import {IRoot} from "./IRoot"
import {__IC_InjectBinder,InjectBinder, IInjectBinder} from "../Injector/InjectBinder";
import {CommandBinder , SignalCommandBinder } from "../Command/CommandBinder";
import {IocError, IConstructorName} from "../IocConst"
import { __IC_CommandBinder } from "../Command/ICommandBinder"; */
var ioc;
(function (ioc) {
    var __IC_Context = /** @class */ (function () {
        function __IC_Context() {
        }
        Object.defineProperty(__IC_Context.prototype, "constructorName", {
            get: function () {
                return "IContext";
            },
            enumerable: true,
            configurable: true
        });
        return __IC_Context;
    }());
    ioc.__IC_Context = __IC_Context;
    var Context = /** @class */ (function () {
        function Context(root) {
            if (Context.firstContext == null || Context.firstContext.getRoot() == null) {
                Context.firstContext = this;
                this.crossContextBinder = this.injectBinder;
            }
            else {
                Context.firstContext.addCrossContext(this);
            }
            //设置根节点
            this.setRoot(root);
            //添加核心
            this.addCore();
            //启动环境容器
            this.start();
        }
        Object.defineProperty(Context.prototype, "injectBinder", {
            //注入绑定器
            get: function () {
                if (!this._injectBinder) {
                    this._injectBinder = new ioc.InjectBinder();
                }
                return this._injectBinder;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "crossContextBinder", {
            //这里使用注入绑定器代替全局绑定器
            get: function () {
                return this._crossContextBinder;
            },
            //设置全局注入绑定器
            set: function (value) {
                this._crossContextBinder = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "commandBinder", {
            //指令绑定器
            get: function () {
                /*         //指令绑定器应该由注入产生
                        if(!this._commandBinder){
                            this._commandBinder = new CommandBinder();
                        } */
                return this._commandBinder;
            },
            enumerable: true,
            configurable: true
        });
        //获取根节点
        Context.prototype.getRoot = function () {
            return this.root;
        };
        //添加全局环境容器
        Context.prototype.addCrossContext = function (context) {
            //共用注入绑定器
            context.crossContextBinder = this.injectBinder;
            return this;
        };
        //移除全局环境容器
        Context.prototype.removeCrossContext = function (childContext) {
            /*         if (childContext.crossContextBinder != null)
                    {
                        childContext.crossContextBinder = null;
                    } */
        };
        Context.prototype.setRoot = function (root) {
            this.root = root;
            return this;
        };
        Context.prototype.restart = function () {
            this.addCore();
            this.start();
            //console.info("[重启Ioc容器]");
            return this;
        };
        Context.prototype.start = function () {
            this.instantiateCore();
            this.mapBindings();
            this.postBindings();
            this.launch();
            return this;
        };
        //启动容器
        Context.prototype.launch = function () {
            //console.info("Ioc容器启动");
        };
        /**
         * 初始化核心组件
         */
        Context.prototype.instantiateCore = function () {
            //实例化信号绑定器
            this._commandBinder = this.injectBinder.getInstance(ioc.__IC_CommandBinder, null);
        };
        Context.prototype.mapBindings = function () {
        };
        Context.prototype.postBindings = function () {
        };
        Context.prototype.addCore = function () {
            //注入注入绑定器
            this.injectBinder.bind(ioc.__IC_InjectBinder).toValue(this.injectBinder);
            //注入信号绑定器
            this.injectBinder.bind(ioc.__IC_CommandBinder).to(ioc.SignalCommandBinder).toSingleton();
        };
        return Context;
    }());
    ioc.Context = Context;
})(ioc || (ioc = {}));
//# sourceMappingURL=Context.js.map
/* import { IContext } from "./Context"
import { IConstructorName } from "../IocConst"; */
var ioc;
(function (ioc) {
    var __IC_Root = /** @class */ (function () {
        function __IC_Root() {
        }
        Object.defineProperty(__IC_Root.prototype, "constructorName", {
            get: function () {
                return "IRoot";
            },
            enumerable: true,
            configurable: true
        });
        return __IC_Root;
    }());
    ioc.__IC_Root = __IC_Root;
})(ioc || (ioc = {}));
//# sourceMappingURL=IRoot.js.map
/* import { DecoratorClassBinding } from "./DecoratorClassBinding"; */
var ioc;
(function (ioc) {
    /**
     * 存储装饰器获取的信息
     */
    var DecoratorClass = /** @class */ (function () {
        function DecoratorClass() {
        }
        Object.defineProperty(DecoratorClass.prototype, "list", {
            get: function () {
                return this._list;
            },
            set: function (value) {
                this._list = value;
            },
            enumerable: true,
            configurable: true
        });
        return DecoratorClass;
    }());
    ioc.DecoratorClass = DecoratorClass;
})(ioc || (ioc = {}));
//# sourceMappingURL=DecoratorClass.js.map
//# sourceMappingURL=InjectConst.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* import {Stack} from "./Stack"
import { IConstructorName } from "./IocConst";
import {inject} from "./Injector/InjectDecorator";
import {Prototype} from "./Prototype" */
var ioc;
(function (ioc) {
    var PoolOverflowBehavior;
    (function (PoolOverflowBehavior) {
        /// Requesting more than the fixed size will throw an exception.
        PoolOverflowBehavior[PoolOverflowBehavior["EXCEPTION"] = 0] = "EXCEPTION";
        /// Requesting more than the fixed size will throw a warning.
        PoolOverflowBehavior[PoolOverflowBehavior["WARNING"] = 1] = "WARNING";
        /// Requesting more than the fixed size will return null and not throw an error.
        PoolOverflowBehavior[PoolOverflowBehavior["IGNORE"] = 2] = "IGNORE";
    })(PoolOverflowBehavior = ioc.PoolOverflowBehavior || (ioc.PoolOverflowBehavior = {}));
    var BindingConstraintType;
    (function (BindingConstraintType) {
        /// Constrains a SemiBinding to carry no more than one item in its Value
        BindingConstraintType[BindingConstraintType["ONE"] = 0] = "ONE";
        /// Constrains a SemiBinding to carry a list of items in its Value
        BindingConstraintType[BindingConstraintType["MANY"] = 1] = "MANY";
        /// Instructs the Binding to apply a Pool instead of a SemiBinding
        BindingConstraintType[BindingConstraintType["POOL"] = 2] = "POOL";
    })(BindingConstraintType = ioc.BindingConstraintType || (ioc.BindingConstraintType = {}));
    var PoolInflationType;
    (function (PoolInflationType) {
        /// When a dynamic pool inflates, add one to the pool.
        PoolInflationType[PoolInflationType["INCREMENT"] = 0] = "INCREMENT";
        /// When a dynamic pool inflates, double the size of the pool
        PoolInflationType[PoolInflationType["DOUBLE"] = 1] = "DOUBLE";
    })(PoolInflationType = ioc.PoolInflationType || (ioc.PoolInflationType = {}));
    var __IC_InstanceProvider = /** @class */ (function () {
        function __IC_InstanceProvider() {
        }
        Object.defineProperty(__IC_InstanceProvider.prototype, "constructorName", {
            //getInstance<T>() : T{return;} 
            get: function () {
                return "IInstanceProvider";
            },
            enumerable: true,
            configurable: true
        });
        return __IC_InstanceProvider;
    }());
    ioc.__IC_InstanceProvider = __IC_InstanceProvider;
    var Pool = /** @class */ (function () {
        function Pool() {
            /// Stack of instances still in the Pool.
            this.instancesAvailable = new ioc.Stack();
            /// A HashSet of the objects checked out of the Pool.
            this.instancesInUse = new Set();
        }
        Pool.prototype.Pool = function () {
            this.size = 0;
            this.constraint = BindingConstraintType.POOL;
            this.uniqueValues = true;
            this.overflowBehavior = PoolOverflowBehavior.EXCEPTION;
            this.inflationType = PoolInflationType.DOUBLE;
        };
        Pool.prototype.bind = function (type) {
            this.poolType = type;
        };
        Pool.prototype.add = function (value) {
            //检查对象原型是否相同
            this.failIf(!ioc.Prototype.isProtetype(value, this.poolType), " Pool Type mismatch. Pools must consist of a common concrete type.\n\t\tPool type: " + this.poolType + "\n\t\tMismatch type: " + value);
            this._instanceCount++;
            this.instancesAvailable.push(value);
            return this;
        };
        Pool.prototype.addList = function (list) {
            var _this = this;
            if (list && list.length > 0) {
                list.forEach(function (item) {
                    _this.add(item);
                });
            }
            return this;
        };
        Pool.prototype.remove = function (value) {
            this._instanceCount--;
            this.removeInstance(value);
            return this;
        };
        Pool.prototype.removeList = function (list) {
            var _this = this;
            if (list && list.length > 0) {
                list.forEach(function (item) {
                    _this.remove(item);
                });
            }
            return this;
        };
        Object.defineProperty(Pool.prototype, "value", {
            get: function () {
                return this.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pool.prototype, "instanceCount", {
            /// The object Type of the first object added to the pool.
            /// Pool objects must be of the same concrete type. This property enforces that requirement. 
            get: function () {
                return this._instanceCount;
            },
            enumerable: true,
            configurable: true
        });
        Pool.prototype.getInstance = function () {
            // Is an instance available?
            if (this.instancesAvailable.size > 0) {
                var retv = this.instancesAvailable.pop();
                this.instancesInUse.add(retv);
                return retv;
            }
            var instancesToCreate = 0;
            //New fixed-size pool. Populate.
            if (this.size > 0) {
                if (this.instanceCount == 0) {
                    //New pool. Add instances.
                    instancesToCreate = this.size;
                }
                else {
                    //Illegal overflow. Report and return null
                    this.failIf(this.overflowBehavior == PoolOverflowBehavior.EXCEPTION, "A pool has overflowed its limit.\n\t\tPool type: " + this.poolType);
                    if (this.overflowBehavior == PoolOverflowBehavior.WARNING) {
                        //console.warn ("WARNING: A pool has overflowed its limit.\n\t\tPool type: " + this.poolType);
                    }
                    return null;
                }
            }
            else {
                //Zero-sized pools will expand.
                if (this.instanceCount == 0 || this.inflationType == PoolInflationType.INCREMENT) {
                    instancesToCreate = 1;
                }
                else {
                    instancesToCreate = this.instanceCount;
                }
            }
            if (instancesToCreate > 0) {
                this.failIf(this.instanceProvider == null, "A Pool of type: " + this.poolType + " has no instance provider.");
                for (var a = 0; a < instancesToCreate; a++) {
                    var newInstance = this.instanceProvider.getInstance(this.poolType);
                    this.add(newInstance);
                }
                return this.getInstance();
            }
            //If not, return null
            return null;
        };
        Pool.prototype.returnInstance = function (value) {
            if (this.instancesInUse.has(value)) {
                /* if (value extends IPoolable)
                {
                    (value as IPoolable).Restore ();
                } */
                value.restore();
                this.instancesInUse.delete(value);
                this.instancesAvailable.push(value);
            }
        };
        Pool.prototype.clean = function () {
            this.instancesAvailable.clear();
            this.instancesInUse = new Set();
            this._instanceCount = 0;
        };
        Object.defineProperty(Pool.prototype, "available", {
            get: function () {
                return this.instancesAvailable.size;
            },
            enumerable: true,
            configurable: true
        });
        Pool.prototype.restore = function () {
            this.clean();
            this.size = 0;
        };
        Pool.prototype.retain = function () {
            this.isRetain = true;
        };
        Pool.prototype.release = function () {
            this.isRetain = false;
        };
        /// <summary>
        /// Permanently removes an instance from the Pool
        /// </summary>
        /// In the event that the removed Instance is in use, it is removed from instancesInUse.
        /// Otherwise, it is presumed inactive, and the next available object is popped from
        /// instancesAvailable.
        /// <param name="value">An instance to remove permanently from the Pool.</param>
        Pool.prototype.removeInstance = function (value) {
            this.failIf(value != this.poolType, "Attempt to remove a instance from a pool that is of the wrong Type:\n\t\tPool type: " + this.poolType.toString() + "\n\t\tInstance type: " + value.toString());
            if (this.instancesInUse.has(value)) {
                this.instancesInUse.delete(value);
            }
            else {
                this.instancesAvailable.pop();
            }
        };
        Pool.prototype.failIf = function (condition, message) {
            if (condition) {
                throw new Error(message);
            }
        };
        __decorate([
            ioc.inject(__IC_InstanceProvider)
        ], Pool.prototype, "instanceProvider", void 0);
        return Pool;
    }());
    ioc.Pool = Pool;
})(ioc || (ioc = {}));
//# sourceMappingURL=Pool.js.map
/* import {IocError, IConstructorName} from "../IocConst" */
var ioc;
(function (ioc) {
    var __IC_Signal = /** @class */ (function () {
        function __IC_Signal() {
        }
        Object.defineProperty(__IC_Signal.prototype, "constructorName", {
            get: function () {
                return "ISignal";
            },
            enumerable: true,
            configurable: true
        });
        ;
        return __IC_Signal;
    }());
    ioc.__IC_Signal = __IC_Signal;
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
/* import { IConstructorName } from "../IocConst"
import { __IC_Signal , Signal, ISignal } from "./Signal" */
var ioc;
(function (ioc) {
    var __IC_SignalManager = /** @class */ (function () {
        function __IC_SignalManager() {
        }
        Object.defineProperty(__IC_SignalManager.prototype, "constructorName", {
            get: function () {
                return "ISignalManager";
            },
            enumerable: true,
            configurable: true
        });
        return __IC_SignalManager;
    }());
    ioc.__IC_SignalManager = __IC_SignalManager;
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
var ioc;
(function (ioc) {
    var Item = /** @class */ (function () {
        function Item(value, next) {
            if (next === void 0) { next = null; }
            this._value = value;
            this._next = next;
        }
        Object.defineProperty(Item.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "next", {
            get: function () {
                return this._next;
            },
            set: function (next) {
                this._next = next;
            },
            enumerable: true,
            configurable: true
        });
        return Item;
    }());
    ioc.Item = Item;
    var Stack = /** @class */ (function () {
        function Stack() {
            this._size = 0;
            this._header = new Item(null);
        }
        Stack.prototype.top = function () {
            if (this._size === 0) {
                return null;
            }
            return this._header.next.value;
        };
        /**
         * 入栈
         * @param item 添加的元素
         * 将header的下一个元素的引用赋值给新元素的next
         * 再将新元素赋值给header的next
         */
        Stack.prototype.push = function (item) {
            var newItem = new Item(item);
            newItem.next = this._header.next;
            this._header.next = newItem;
            this._size++;
        };
        /**
         * 出栈
         * 将header之后的第一个元素移除
         * 同时修改header的next到下一个元素
         */
        Stack.prototype.pop = function () {
            if (this._size === 0) {
                return null;
            }
            var item = this._header.next;
            this._header.next = item.next;
            this._size--;
            item.next = null; //清除引用
            return item.value;
        };
        Stack.prototype.clear = function () {
            var item;
            var tmp = this._header;
            while (this._size !== 0) {
                item = tmp.next;
                tmp = item;
                item.next = null;
                this._size--;
            }
            this._header = null;
        };
        Object.defineProperty(Stack.prototype, "isEmpty", {
            get: function () {
                return this._size === 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stack.prototype, "size", {
            get: function () {
                return this._size;
            },
            enumerable: true,
            configurable: true
        });
        return Stack;
    }());
    ioc.Stack = Stack;
})(ioc || (ioc = {}));
//# sourceMappingURL=Stack.js.map