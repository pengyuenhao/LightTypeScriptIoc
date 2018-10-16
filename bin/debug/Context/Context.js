/* import {IRoot} from "./IRoot"
import {NInjectBinder,InjectBinder, IInjectBinder} from "../Injector/InjectBinder";
import {CommandBinder , SignalCommandBinder } from "../Command/CommandBinder";
import {IocError, IConstructorName} from "../IocConst"
import { NCommandBinder } from "../Command/ICommandBinder"; */
var ioc;
(function (ioc) {
    var NContext = /** @class */ (function () {
        function NContext() {
        }
        Object.defineProperty(NContext.prototype, "constructorName", {
            get: function () {
                return "IContext";
            },
            enumerable: true,
            configurable: true
        });
        return NContext;
    }());
    ioc.NContext = NContext;
    var Context = /** @class */ (function () {
        function Context(root) {
            if (Context.firstContext == null || Context.firstContext.getRoot() == null) {
                Context.firstContext = this;
                this.crossContextBinder = this.injectBinder;
            }
            else {
                Context.firstContext.addCrossContext(this);
            }
            //设置根节点
            this.setRoot(root);
            //添加核心
            this.addCore();
            //启动环境容器
            this.start();
        }
        Object.defineProperty(Context.prototype, "injectBinder", {
            //注入绑定器
            get: function () {
                if (!this._injectBinder) {
                    this._injectBinder = new ioc.InjectBinder();
                }
                return this._injectBinder;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "crossContextBinder", {
            //这里使用注入绑定器代替全局绑定器
            get: function () {
                return this._crossContextBinder;
            },
            //设置全局注入绑定器
            set: function (value) {
                this._crossContextBinder = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "commandBinder", {
            //指令绑定器
            get: function () {
                /*         //指令绑定器应该由注入产生
                        if(!this._commandBinder){
                            this._commandBinder = new CommandBinder();
                        } */
                return this._commandBinder;
            },
            enumerable: true,
            configurable: true
        });
        //获取根节点
        Context.prototype.getRoot = function () {
            return this.root;
        };
        //添加全局环境容器
        Context.prototype.addCrossContext = function (context) {
            //共用注入绑定器
            context.crossContextBinder = this.injectBinder;
            return this;
        };
        //移除全局环境容器
        Context.prototype.removeCrossContext = function (childContext) {
            /*         if (childContext.crossContextBinder != null)
                    {
                        childContext.crossContextBinder = null;
                    } */
        };
        /**
         * 设置根节点，只有构造类时可以指定根节点
         * @param root 根节点
         */
        Context.prototype.setRoot = function (root) {
            this.root = root;
            return this;
        };
        Context.prototype.restart = function () {
            this.addCore();
            this.start();
            //console.info("[重启Ioc容器]");
            return this;
        };
        Context.prototype.start = function () {
            this.instantiateCore();
            this.mapBindings();
            this.postBindings();
            this.launch();
            return this;
        };
        //启动容器
        Context.prototype.launch = function () {
            //console.info("Ioc容器启动");
        };
        /**
         * 初始化核心组件
         */
        Context.prototype.instantiateCore = function () {
            //实例化信号绑定器
            this._commandBinder = this.injectBinder.getInstance(ioc.NCommandBinder, null);
        };
        Context.prototype.mapBindings = function () {
        };
        Context.prototype.postBindings = function () {
        };
        Context.prototype.addCore = function () {
            //注入注入绑定器
            this.injectBinder.bind(ioc.NInjectBinder).toValue(this.injectBinder);
            //注入信号绑定器
            this.injectBinder.bind(ioc.NCommandBinder).to(ioc.SignalCommandBinder).toSingleton();
            //绑定环境容器
            this.injectBinder.bind(ioc.CommonEnum.Context).toValue(this);
            //绑定根节点
            this.injectBinder.bind(ioc.CommonEnum.Root).toValue(this.root);
        };
        return Context;
    }());
    ioc.Context = Context;
})(ioc || (ioc = {}));
//# sourceMappingURL=Context.js.map