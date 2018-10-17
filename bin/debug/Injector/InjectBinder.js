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
    var NInjectBinder = /** @class */ (function () {
        function NInjectBinder() {
        }
        Object.defineProperty(NInjectBinder.prototype, "constructorName", {
            get: function () {
                return "IInjectBinder";
            },
            enumerable: true,
            configurable: true
        });
        return NInjectBinder;
    }());
    ioc.NInjectBinder = NInjectBinder;
    var InjectBinder = /** @class */ (function (_super) {
        __extends(InjectBinder, _super);
        function InjectBinder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InjectBinder.prototype.init = function () {
            _super.prototype.init.call(this);
            this._injector = new ioc.Injector();
            this._injector.binder = this;
            this._injector.injectClassBinder = ClassBinder;
        };
        InjectBinder.prototype.getInjector = function () {
            return this._injector;
        };
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
        /**
         * 调用注入者的注入方法对目标对象进行注入
         * @param target
         * @param attemptConstructorInjection
         */
        InjectBinder.prototype.inject = function (target, attemptConstructorInjection) {
            this.getInjector().inject(target);
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
                    if (binding.isUnbind()) {
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