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