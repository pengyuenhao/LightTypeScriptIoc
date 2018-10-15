/* import {IBinding,Binding} from "../Bind/Binding"
import {__IC_InjectBinder,IInjectBinder} from "../Injector/InjectBinder";
import {CommandBinding} from "./CommandBinding";
import {ISignal} from "../Signal/Signal"
import {InjectBinding} from "../Injector/InjectBinding";
import {ICommand,__IC_Command} from "./Command";
import {Pool} from "../Pool";
import {CommandConst} from "./CommandConst"
import {inject} from "../Injector/InjectDecorator";
import {Binder} from "../Bind/Binder";
import {ICommandBinder} from "./ICommandBinder"; */
//全局注入数据绑定器
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ioc;
(function (ioc) {
    /**
     * 指令绑定器
     */
    var CommandBinder = /** @class */ (function (_super) {
        __extends(CommandBinder, _super);
        function CommandBinder() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            //指令池
            _this.pools = new Map();
            // Tracker for parallel commands in progress
            _this.activeCommands = new Set();
            // Tracker for sequences in progress
            _this.activeSequences = new Map();
            //是否使用池
            _this.usePooling = false;
            return _this;
        }
        CommandBinder.prototype.getPool = function (type) {
            if (this.pools.has(type))
                return this.pools.get(type);
            return null;
        };
        CommandBinder.prototype.resolver = function (binding) {
            var _this = this;
            _super.prototype.resolver.call(this, binding);
            if (this.usePooling && binding.isPooled) {
                if (binding.value != null) {
                    var that_1 = this;
                    //检查被绑定的值是否有效
                    var values = binding.value;
                    if (values.length === 0) {
                        values = [];
                        values.push(binding.value);
                    }
                    if (values && values.length > 0) {
                        values.forEach(function (value) {
                            //如果找不到对应的池则创建
                            if (that_1.pools.has(value) == false) {
                                var myPool = _this.makePoolFromType(value);
                                that_1.pools.set(value, myPool);
                            }
                        });
                    }
                }
            }
        };
        CommandBinder.prototype.makePoolFromType = function (type) {
            //池构造函数作为类型使用
            var poolType = type;
            //预制实例缓存
            this.injectBinder.bind(type).to(type);
            //获取一个池实例
            this.injectBinder.bind(ioc.Pool).to(ioc.Pool).toName(ioc.CommandConst.COMMAND_POOL);
            var pool = this.injectBinder.getInstance(ioc.Pool, ioc.CommandConst.COMMAND_POOL);
            this.injectBinder.unbind(ioc.Pool, ioc.CommandConst.COMMAND_POOL);
            pool.bind(poolType);
            return pool;
        };
        //绑定状态映射字典
        CommandBinder.prototype.getRawBinding = function () {
            return new ioc.CommandBinding(this.resolver.bind(this));
        };
        CommandBinder.prototype.bind = function (key) {
            return _super.prototype.bind.call(this, key);
        };
        //调用指令
        CommandBinder.prototype.invokeCommand = function (cmd, binding, args, depth) {
            var command = this.createCommand(cmd, args);
            command.sequenceId = depth;
            this.trackCommand(command, binding);
            this.executeCommand(command, args);
            return command;
        };
        //
        CommandBinder.prototype.createCommand = function (cmd, data) {
            var command = this.getCommand(cmd);
            if (command == null) {
                var msg = "A Command ";
                if (data != null) {
                    msg += "tied to data " + data.toString();
                }
                msg += " could not be instantiated.\nThis might be caused by a null pointer during instantiation or failing to override Execute (generally you shouldn't have constructor code in Commands).";
                throw new Error(msg);
            }
            command.data = data;
            return command;
        };
        //获取指令实例
        CommandBinder.prototype.getCommand = function (type) {
            //如果使用池则检查是否已经存在相应的实例
            if (this.usePooling && this.pools.has(type)) {
                var pool = this.pools.get(type);
                var command = pool.getInstance();
                //是否存在对应的实例
                if (command) {
                    //检查是否已经清理
                    if (command.isClean) {
                        this.injectBinder.injector.inject(command, null);
                        command.deploy();
                    }
                }
                else {
                    //获取实例
                    command = this.injectBinder.getInstance(type, null);
                    //为池添加实例缓存
                    pool.add(command);
                }
                return command;
            }
            else {
                this.injectBinder.bind(ioc.__IC_Command).to(type);
                var command = this.injectBinder.getInstance(ioc.__IC_Command, null);
                this.injectBinder.unbind(ioc.__IC_Command, null);
                return command;
            }
        };
        CommandBinder.prototype.trackCommand = function (command, binding) {
            if (binding.isSequence) {
                this.activeSequences.set(command, binding);
            }
            else {
                this.activeCommands.add(command);
            }
        };
        //执行指令
        CommandBinder.prototype.executeCommand = function (command, args) {
            if (command == null) {
                return;
            }
            command.execute.apply(command, args);
        };
        /**
         * 信号调用回掉函数
         * @param trigger 触发的信号
         * @param data 数据
         */
        CommandBinder.prototype.onDispose = function (trigger) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            //尝试获取绑定状态
            var binding = this.getBinding(trigger, null);
            if (binding != null) {
                //是否处于执行序列中
                if (binding.isSequence) {
                    //加入执行队列
                    this.next(binding, args, 0);
                }
                else {
                    //获取被绑定的指令对象
                    var values = binding.value;
                    var aa = values.length + 1;
                    for (var a = 0; a < aa; a++) {
                        this.next(binding, args, a);
                    }
                }
            }
        };
        //下一次即将执行的指令
        CommandBinder.prototype.next = function (binding, args, depth) {
            var values = binding.value;
            if (values.length === 0) {
                values = [];
                values.push(binding.value);
            }
            if (depth < values.length) {
                var cmd = values[depth];
                var command = this.invokeCommand(cmd, binding, args, depth);
                this.releaseCommand(command);
            }
            else {
                this.disposeOfSequencedData(args);
                //是否仅执行一次
                if (binding.isOnce) {
                    //解除绑定
                    this.unbind(binding, null);
                }
            }
        };
        //EventCommandBinder (and perhaps other sub-classes) use this method to dispose of the data in sequenced commands
        CommandBinder.prototype.disposeOfSequencedData = function (data) {
            //No-op. Override if necessary.
        };
        //释放指令，使其进入池
        CommandBinder.prototype.releaseCommand = function (command) {
            //有时会需要执行一些耗时的异步操作，如果指令被用户保持则不进行释放，默认情况下都是自动释放的
            if (!command.isRetain) {
                //使用构造函数作为类型
                var t = command.constructor;
                if (this.usePooling && this.pools.has(t)) {
                    this.pools.get(t).returnInstance(command);
                }
                if (this.activeCommands.has(command)) {
                    this.activeCommands.delete(command);
                }
                else if (this.activeSequences.has(command)) {
                    var binding = this.activeSequences.get(command);
                    var data = command.data;
                    this.activeSequences.delete(command);
                    this.next(binding, data, command.sequenceId + 1);
                }
            }
        };
        __decorate([
            ioc.inject(ioc.__IC_InjectBinder)
        ], CommandBinder.prototype, "injectBinder", void 0);
        return CommandBinder;
    }(ioc.Binder));
    ioc.CommandBinder = CommandBinder;
    var SignalCommandBinder = /** @class */ (function (_super) {
        __extends(SignalCommandBinder, _super);
        function SignalCommandBinder() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            //启用池
            _this.usePooling = true;
            return _this;
        }
        //重写解析绑定状态函数
        SignalCommandBinder.prototype.resolveBinding = function (binding, key) {
            _super.prototype.resolveBinding.call(this, binding, key);
            //如果已经存在了则不能再次绑定
            if (this._bindings.has(key)) {
                var signal = key;
                signal.addListener(this.onDispose.bind(this)); //Do normal bits, then assign the commandlistener to be reactTo
            }
        };
        //重写绑定方法
        SignalCommandBinder.prototype.bind = function (value) {
            //获取绑定状态
            var binding = this.injectBinder.getBinding(value, null);
            var signal = null;
            //检查参数值是否为构造函数
            if (ioc.Binding.isConstructor(value)) {
                //如果尚未进行注入则注入一个单例
                if (binding == null) {
                    binding = this.injectBinder.bind(value);
                    binding.toSingleton();
                }
                signal = this.injectBinder.getInstance(value, null);
            }
            //如果信号存在则绑定信号，否则直接绑定值
            if (signal) {
                return _super.prototype.bind.call(this, signal);
            }
            else {
                return _super.prototype.bind.call(this, value);
            }
        };
        //重写获取绑定状态方法
        SignalCommandBinder.prototype.getBinding = function (key, name) {
            var signal;
            //检查键值是否为构造函数
            if (ioc.Binding.isConstructor(key)) {
                //参数应该是一个信号或信号的构造函数，而不是其他的值
                signal = this.injectBinder.getInstance(key, name);
            }
            else {
                //信号是一个实例
                signal = key;
            }
            return _super.prototype.getBinding.call(this, signal, name);
        };
        SignalCommandBinder.prototype.invokeCommand = function (cmd, binding, args, depth) {
            var signal = binding.key;
            var command = this.createCommandForSignal(cmd, args); //Special signal-only command creation
            command.sequenceId = depth;
            this.trackCommand(command, binding);
            this.executeCommand(command, args);
            return command;
        };
        // Create a Command and bind its injectable parameters to the Signal types
        SignalCommandBinder.prototype.createCommandForSignal = function (cmd, args) {
            var that = this;
            if (args != null) {
                var signalData = args;
                //Iterate each signal type, in order. 
                //Iterate values and find a match
                //If we cannot find a match, throw an error
                var injectedTypes = new Set();
                var values = [signalData];
                /* if(signalTypes&&signalTypes.length>0){
                signalTypes.forEach((type)=>{
                    if (!injectedTypes.has(type)) // Do not allow more than one injection of the same Type
                    {
                        let foundValue : boolean= false;
                        for(let i = 0;i<values.length;i++){
                            if (values[i] != null)
                            {
                                that.injectBinder.bind(type).toValue(values[i]).toInject(false);
                                injectedTypes.add(type);
                                //values[i]=null;
                                foundValue = true;
                                break;
                            }
                            else //Do not allow null injections
                            {
                                throw new Error("SignalCommandBinder attempted to bind a null value from a signal to Command: " + cmd.GetType() + " to type: " + type);
                            }
                        }
                        if (!foundValue)
                        {
                            throw new Error("Could not find an unused injectable value to inject in to Command: " + cmd.GetType() + " for Type: " + type);
                        }
                    }
                    else
                    {
                        throw new Error("SignalCommandBinder: You have attempted to map more than one value of type: " + type +
                            " in Command: " + cmd.GetType() + ". Only the first value of a type will be injected. You may want to place your values in a VO, instead.");
                    }
                })
                }*/
            }
            var command = that.getCommand(cmd);
            command.data = args;
            /*         if (signalTypes && signalTypes.length > 0) {
                        signalTypes.forEach((typeToRemove) => {
                            that.injectBinder.unbind(typeToRemove, null);
                        })
                    } */
            return command;
        };
        return SignalCommandBinder;
    }(CommandBinder));
    ioc.SignalCommandBinder = SignalCommandBinder;
})(ioc || (ioc = {}));
//# sourceMappingURL=CommandBinder.js.map