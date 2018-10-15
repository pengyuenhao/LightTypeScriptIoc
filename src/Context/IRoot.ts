/* import { IContext } from "./Context"
import { IConstructorName } from "../IocConst"; */
namespace ioc {

    export class __IC_Root implements IConstructorName {
        get constructorName() {
            return "IRoot";
        }
    }
    export interface IRoot {
        context: IContext;
    }
}