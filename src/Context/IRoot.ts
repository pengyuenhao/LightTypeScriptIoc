/* import { IContext } from "./Context"
import { IConstructorName } from "../IocConst"; */
namespace ioc {

    export class NRoot implements IConstructorName {
        get constructorName() {
            return "IRoot";
        }
    }
    export interface IRoot {
        context: IContext;
    }
}