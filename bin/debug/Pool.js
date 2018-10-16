var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* import {Stack} from "./Stack"
import { IConstructorName } from "./IocConst";
import {inject} from "./Injector/InjectDecorator";
import {Prototype} from "./Prototype" */
var ioc;
(function (ioc) {
    var PoolOverflowBehavior;
    (function (PoolOverflowBehavior) {
        /// Requesting more than the fixed size will throw an exception.
        PoolOverflowBehavior[PoolOverflowBehavior["EXCEPTION"] = 0] = "EXCEPTION";
        /// Requesting more than the fixed size will throw a warning.
        PoolOverflowBehavior[PoolOverflowBehavior["WARNING"] = 1] = "WARNING";
        /// Requesting more than the fixed size will return null and not throw an error.
        PoolOverflowBehavior[PoolOverflowBehavior["IGNORE"] = 2] = "IGNORE";
    })(PoolOverflowBehavior = ioc.PoolOverflowBehavior || (ioc.PoolOverflowBehavior = {}));
    var BindingConstraintType;
    (function (BindingConstraintType) {
        /// Constrains a SemiBinding to carry no more than one item in its Value
        BindingConstraintType[BindingConstraintType["ONE"] = 0] = "ONE";
        /// Constrains a SemiBinding to carry a list of items in its Value
        BindingConstraintType[BindingConstraintType["MANY"] = 1] = "MANY";
        /// Instructs the Binding to apply a Pool instead of a SemiBinding
        BindingConstraintType[BindingConstraintType["POOL"] = 2] = "POOL";
    })(BindingConstraintType = ioc.BindingConstraintType || (ioc.BindingConstraintType = {}));
    var PoolInflationType;
    (function (PoolInflationType) {
        /// When a dynamic pool inflates, add one to the pool.
        PoolInflationType[PoolInflationType["INCREMENT"] = 0] = "INCREMENT";
        /// When a dynamic pool inflates, double the size of the pool
        PoolInflationType[PoolInflationType["DOUBLE"] = 1] = "DOUBLE";
    })(PoolInflationType = ioc.PoolInflationType || (ioc.PoolInflationType = {}));
    var NInstanceProvider = /** @class */ (function () {
        function NInstanceProvider() {
        }
        Object.defineProperty(NInstanceProvider.prototype, "constructorName", {
            //getInstance<T>() : T{return;} 
            get: function () {
                return "IInstanceProvider";
            },
            enumerable: true,
            configurable: true
        });
        return NInstanceProvider;
    }());
    ioc.NInstanceProvider = NInstanceProvider;
    var Pool = /** @class */ (function () {
        function Pool() {
            /// Stack of instances still in the Pool.
            this.instancesAvailable = new ioc.Stack();
            /// A HashSet of the objects checked out of the Pool.
            this.instancesInUse = new Set();
        }
        Pool.prototype.Pool = function () {
            this.size = 0;
            this.constraint = BindingConstraintType.POOL;
            this.uniqueValues = true;
            this.overflowBehavior = PoolOverflowBehavior.EXCEPTION;
            this.inflationType = PoolInflationType.DOUBLE;
        };
        Pool.prototype.bind = function (type) {
            this.poolType = type;
        };
        Pool.prototype.add = function (value) {
            //检查对象原型是否相同
            this.failIf(!ioc.Prototype.isProtetype(value, this.poolType), " Pool Type mismatch. Pools must consist of a common concrete type.\n\t\tPool type: " + this.poolType + "\n\t\tMismatch type: " + value);
            this._instanceCount++;
            this.instancesAvailable.push(value);
            return this;
        };
        Pool.prototype.addList = function (list) {
            var _this = this;
            if (list && list.length > 0) {
                list.forEach(function (item) {
                    _this.add(item);
                });
            }
            return this;
        };
        Pool.prototype.remove = function (value) {
            this._instanceCount--;
            this.removeInstance(value);
            return this;
        };
        Pool.prototype.removeList = function (list) {
            var _this = this;
            if (list && list.length > 0) {
                list.forEach(function (item) {
                    _this.remove(item);
                });
            }
            return this;
        };
        Object.defineProperty(Pool.prototype, "value", {
            get: function () {
                return this.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pool.prototype, "instanceCount", {
            /// The object Type of the first object added to the pool.
            /// Pool objects must be of the same concrete type. This property enforces that requirement. 
            get: function () {
                return this._instanceCount;
            },
            enumerable: true,
            configurable: true
        });
        Pool.prototype.getInstance = function () {
            // Is an instance available?
            if (this.instancesAvailable.size > 0) {
                var retv = this.instancesAvailable.pop();
                this.instancesInUse.add(retv);
                return retv;
            }
            var instancesToCreate = 0;
            //New fixed-size pool. Populate.
            if (this.size > 0) {
                if (this.instanceCount == 0) {
                    //New pool. Add instances.
                    instancesToCreate = this.size;
                }
                else {
                    //Illegal overflow. Report and return null
                    this.failIf(this.overflowBehavior == PoolOverflowBehavior.EXCEPTION, "A pool has overflowed its limit.\n\t\tPool type: " + this.poolType);
                    if (this.overflowBehavior == PoolOverflowBehavior.WARNING) {
                        //console.warn ("WARNING: A pool has overflowed its limit.\n\t\tPool type: " + this.poolType);
                    }
                    return null;
                }
            }
            else {
                //Zero-sized pools will expand.
                if (this.instanceCount == 0 || this.inflationType == PoolInflationType.INCREMENT) {
                    instancesToCreate = 1;
                }
                else {
                    instancesToCreate = this.instanceCount;
                }
            }
            if (instancesToCreate > 0) {
                this.failIf(this.instanceProvider == null, "A Pool of type: " + this.poolType + " has no instance provider.");
                for (var a = 0; a < instancesToCreate; a++) {
                    var newInstance = this.instanceProvider.getInstance(this.poolType);
                    this.add(newInstance);
                }
                return this.getInstance();
            }
            //If not, return null
            return null;
        };
        Pool.prototype.returnInstance = function (value) {
            if (this.instancesInUse.has(value)) {
                /* if (value extends IPoolable)
                {
                    (value as IPoolable).Restore ();
                } */
                value.restore();
                this.instancesInUse.delete(value);
                this.instancesAvailable.push(value);
            }
        };
        Pool.prototype.clean = function () {
            this.instancesAvailable.clear();
            this.instancesInUse = new Set();
            this._instanceCount = 0;
        };
        Object.defineProperty(Pool.prototype, "available", {
            get: function () {
                return this.instancesAvailable.size;
            },
            enumerable: true,
            configurable: true
        });
        Pool.prototype.restore = function () {
            this.clean();
            this.size = 0;
        };
        Pool.prototype.retain = function () {
            this.isRetain = true;
        };
        Pool.prototype.release = function () {
            this.isRetain = false;
        };
        /// <summary>
        /// Permanently removes an instance from the Pool
        /// </summary>
        /// In the event that the removed Instance is in use, it is removed from instancesInUse.
        /// Otherwise, it is presumed inactive, and the next available object is popped from
        /// instancesAvailable.
        /// <param name="value">An instance to remove permanently from the Pool.</param>
        Pool.prototype.removeInstance = function (value) {
            this.failIf(value != this.poolType, "Attempt to remove a instance from a pool that is of the wrong Type:\n\t\tPool type: " + this.poolType.toString() + "\n\t\tInstance type: " + value.toString());
            if (this.instancesInUse.has(value)) {
                this.instancesInUse.delete(value);
            }
            else {
                this.instancesAvailable.pop();
            }
        };
        Pool.prototype.failIf = function (condition, message) {
            if (condition) {
                throw new Error(message);
            }
        };
        __decorate([
            ioc.inject(NInstanceProvider)
        ], Pool.prototype, "instanceProvider", void 0);
        return Pool;
    }());
    ioc.Pool = Pool;
})(ioc || (ioc = {}));
//# sourceMappingURL=Pool.js.map