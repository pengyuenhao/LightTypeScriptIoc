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