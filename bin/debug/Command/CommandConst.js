var ioc;
(function (ioc) {
    //注入状态类型枚举
    var CommandConst;
    (function (CommandConst) {
        /// Temporary marker for any pool instantiated by the CommandBinder
        CommandConst["COMMAND_POOL"] = "COMMAND_POOL";
    })(CommandConst = ioc.CommandConst || (ioc.CommandConst = {}));
})(ioc || (ioc = {}));
//# sourceMappingURL=CommandConst.js.map