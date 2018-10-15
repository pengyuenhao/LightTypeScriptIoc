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
    var CommandBinding = /** @class */ (function (_super) {
        __extends(CommandBinding, _super);
        function CommandBinding() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(CommandBinding.prototype, "isSequence", {
            get: function () {
                return this._isSequence;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommandBinding.prototype, "isOnce", {
            get: function () {
                return this._isOnce;
            },
            enumerable: true,
            configurable: true
        });
        CommandBinding.prototype.to = function (value) {
            return _super.prototype.to.call(this, value);
        };
        CommandBinding.prototype.toName = function (name) {
            return _super.prototype.toName.call(this, name);
        };
        /**
         * 是否进入池
         */
        CommandBinding.prototype.Pooled = function () {
            this.isPooled = true;
            this._resolver(this);
            return this;
        };
        return CommandBinding;
    }(ioc.Binding));
    ioc.CommandBinding = CommandBinding;
})(ioc || (ioc = {}));
//# sourceMappingURL=CommandBinding.js.map