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