var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* import { ICommandBinder, NCommandBinder } from "./ICommandBinder";
import { NInjectBinder, IInjectBinder } from "../Injector/InjectBinder";
import { inject } from "../Injector/InjectDecorator";
import { IConstructorName } from "../IocConst";
 */
var ioc;
(function (ioc) {
    var NCommand = /** @class */ (function () {
        function NCommand() {
        }
        Object.defineProperty(NCommand.prototype, "constructorName", {
            get: function () {
                return "ICommand";
            },
            enumerable: true,
            configurable: true
        });
        return NCommand;
    }());
    ioc.NCommand = NCommand;
    var Command = /** @class */ (function () {
        function Command() {
            this._clean = false;
            this._retain = false;
        }
        Command.prototype.deploy = function () {
            this._clean = false;
        };
        Command.prototype.clean = function () {
            this._clean = true;
        };
        Object.defineProperty(Command.prototype, "isClean", {
            get: function () {
                return this._clean;
            },
            enumerable: true,
            configurable: true
        });
        ;
        //保持指令
        Command.prototype.retain = function () {
            this._retain = true;
        };
        Command.prototype.release = function () {
            this._retain = false;
        };
        Object.defineProperty(Command.prototype, "isRetain", {
            get: function () {
                return this._retain;
            },
            enumerable: true,
            configurable: true
        });
        //重新释放
        Command.prototype.restore = function () {
            this.injectBinder.getInjector().uninject(this);
            this.clean();
        };
        //执行指令
        Command.prototype.execute = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        __decorate([
            ioc.inject(ioc.NInjectBinder)
        ], Command.prototype, "injectBinder", void 0);
        __decorate([
            ioc.inject(ioc.NCommandBinder)
        ], Command.prototype, "commandBinder", void 0);
        return Command;
    }());
    ioc.Command = Command;
})(ioc || (ioc = {}));
//# sourceMappingURL=Command.js.map