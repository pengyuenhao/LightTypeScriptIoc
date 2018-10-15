/* import { CommandBinding } from "./CommandBinding";
import { IBinding } from "../Bind/Binding";
import { Binder } from "../Bind/Binder";
import { IConstructorName } from "../IocConst"; */
namespace ioc {

    export interface ICommandBinder {
        bind(key: any): CommandBinding;
        getRawBinding(): IBinding;
    }
    export class __IC_CommandBinder implements IConstructorName {
        get constructorName() {
            return "ICommandBinder";
        }
    }
}