var ioc;
(function (ioc) {
    var Item = /** @class */ (function () {
        function Item(value, next) {
            if (next === void 0) { next = null; }
            this._value = value;
            this._next = next;
        }
        Object.defineProperty(Item.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "next", {
            get: function () {
                return this._next;
            },
            set: function (next) {
                this._next = next;
            },
            enumerable: true,
            configurable: true
        });
        return Item;
    }());
    ioc.Item = Item;
    var Stack = /** @class */ (function () {
        function Stack() {
            this._size = 0;
            this._header = new Item(null);
        }
        Stack.prototype.top = function () {
            if (this._size === 0) {
                return null;
            }
            return this._header.next.value;
        };
        /**
         * 入栈
         * @param item 添加的元素
         * 将header的下一个元素的引用赋值给新元素的next
         * 再将新元素赋值给header的next
         */
        Stack.prototype.push = function (item) {
            var newItem = new Item(item);
            newItem.next = this._header.next;
            this._header.next = newItem;
            this._size++;
        };
        /**
         * 出栈
         * 将header之后的第一个元素移除
         * 同时修改header的next到下一个元素
         */
        Stack.prototype.pop = function () {
            if (this._size === 0) {
                return null;
            }
            var item = this._header.next;
            this._header.next = item.next;
            this._size--;
            item.next = null; //清除引用
            return item.value;
        };
        Stack.prototype.clear = function () {
            var item;
            var tmp = this._header;
            while (this._size !== 0) {
                item = tmp.next;
                tmp = item;
                item.next = null;
                this._size--;
            }
            this._header = null;
        };
        Object.defineProperty(Stack.prototype, "isEmpty", {
            get: function () {
                return this._size === 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stack.prototype, "size", {
            get: function () {
                return this._size;
            },
            enumerable: true,
            configurable: true
        });
        return Stack;
    }());
    ioc.Stack = Stack;
})(ioc || (ioc = {}));
//# sourceMappingURL=Stack.js.map