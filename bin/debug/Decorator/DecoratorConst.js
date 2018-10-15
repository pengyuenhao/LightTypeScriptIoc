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