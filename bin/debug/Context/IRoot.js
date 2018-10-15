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