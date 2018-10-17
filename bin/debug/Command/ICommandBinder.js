/* import { CommandBinding } from "./CommandBinding";
import { IBinding } from "../Bind/Binding";
import { Binder } from "../Bind/Binder";
import { IConstructorName } from "../IocConst"; */
var ioc;
(function (ioc) {
    var NCommandBinder = /** @class */ (function () {
        function NCommandBinder() {
        }
        Object.defineProperty(NCommandBinder.prototype, "constructorName", {
            get: function () {
                return "ICommandBinder";
            },
            enumerable: true,
            configurable: true
        });
        return NCommandBinder;
    }());
    ioc.NCommandBinder = NCommandBinder;
})(ioc || (ioc = {}));
//# sourceMappingURL=ICommandBinder.js.map