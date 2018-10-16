var ioc;
(function (ioc) {
    /**
     * 原型缓存字典，用于检测一个对象的基类
     */
    var Prototype = /** @class */ (function () {
        function Prototype() {
        }
        /**
         * 基类检测函数
         * @param instance 实例
         * @param prototype 基类
         */
        Prototype.isProtetype = function (type, prototype) {
            //let b = type instanceof prototype;
            return type instanceof prototype;
            /*         if(!(type instanceof Object))return false;
                    let constructor = type.constructor;
                    if(this.prototypeMap.has(constructor)){
                        let sett = this.prototypeMap.get(constructor);
                        if(sett.has(prototype)){
                            return true;
                        }else{
                            return false;
                        }
                    }
                    return false; */
        };
        /**
         * 获取继承列表
         * @param instance 实例
         */
        Prototype.getPrototypeList = function (target) {
            var that = this;
            if (!this.hasPrototypeList(target)) {
                var extendsList = void 0;
                //获取继承列表
                extendsList = [];
                //用构造函数代替类型来使用
                var types = [];
                //types.push(target.constructor);
                //继承类型
                var prototype = target.__proto__;
                //构造函数
                var constructor_1;
                while (true) {
                    //如果继承存在
                    if (prototype) {
                        //因为压缩代码会把所有对象的名称都压缩掉，所以这里使用构造函数作为键值
                        constructor_1 = prototype.constructor;
                        //搜索到基类一层
                        if (constructor_1 === Object)
                            break;
                        //排除以N_开头模拟接口的临时替代类型
                        if (!constructor_1.name.startsWith("N")) {
                            extendsList.push(constructor_1);
                            types.push(constructor_1);
                            //为每一个类都添加继承关系
                            types.forEach(function (type) {
                                that.AddPrototype(type, constructor_1);
                            });
                        }
                        prototype = prototype.__proto__;
                    }
                    else {
                        break;
                    }
                }
            }
            var values = this.prototypeMap.get(target.constructor);
            return Array.from(values);
        };
        /**
         * 添加继承关系
         */
        Prototype.AddPrototype = function (tpye, prototype) {
            var extendSet;
            if (this.prototypeMap.has(tpye)) {
                extendSet = this.prototypeMap.get(tpye);
            }
            else {
                extendSet = new Set();
                this.prototypeMap.set(tpye, extendSet);
            }
            //为继承队列加入新的继承
            extendSet.add(prototype);
        };
        /**
         * 是否存在继承列表
         * @param instance 实例
         */
        Prototype.hasPrototypeList = function (target) {
            if (this.prototypeMap.has(target.constructor)) {
                return true;
            }
            else {
                return false;
            }
        };
        //继承映射表
        Prototype.prototypeMap = new Map();
        return Prototype;
    }());
    ioc.Prototype = Prototype;
})(ioc || (ioc = {}));
//# sourceMappingURL=Prototype.js.map