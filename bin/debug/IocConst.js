var ioc;
(function (ioc) {
    var IocError;
    (function (IocError) {
        IocError.IC_ERROR = "can't implement class that is only as interface";
    })(IocError = ioc.IocError || (ioc.IocError = {}));
    var IConstructorName = /** @class */ (function () {
        function IConstructorName() {
        }
        return IConstructorName;
    }());
    ioc.IConstructorName = IConstructorName;
})(ioc || (ioc = {}));
//# sourceMappingURL=IocConst.js.map