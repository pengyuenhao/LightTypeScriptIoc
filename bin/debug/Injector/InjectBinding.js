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
        InjectBinding.prototype.isInject = function () {
            return this._isInject;
        };
        //参数列表
        InjectBinding.prototype.getArgs = function () {
            return this._args;
        };
        InjectBinding.prototype.getBindingType = function () {
            return this._bindingType;
        };
        InjectBinding.prototype.isUnbind = function () {
            return this._isUnbind;
        };
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