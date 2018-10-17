var ioc;
(function (ioc) {
    /**
     * 通用枚举类型
    */
    var CommonEnum;
    (function (CommonEnum) {
        CommonEnum["Context"] = "Context";
        CommonEnum["Root"] = "Root";
    })(CommonEnum = ioc.CommonEnum || (ioc.CommonEnum = {}));
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