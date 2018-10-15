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