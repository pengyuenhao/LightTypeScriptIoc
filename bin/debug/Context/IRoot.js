/* import { IContext } from "./Context"
import { IConstructorName } from "../IocConst"; */
var ioc;
(function (ioc) {
    var NRoot = /** @class */ (function () {
        function NRoot() {
        }
        Object.defineProperty(NRoot.prototype, "constructorName", {
            get: function () {
                return "IRoot";
            },
            enumerable: true,
            configurable: true
        });
        return NRoot;
    }());
    ioc.NRoot = NRoot;
})(ioc || (ioc = {}));
//# sourceMappingURL=IRoot.js.map