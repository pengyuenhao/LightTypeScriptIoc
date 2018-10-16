namespace ioc {
    /**
     * 通用枚举类型
    */
    export enum CommonEnum{
        Context = "Context",
        Root = "Root",
    }
    export module IocError {
        export const IC_ERROR = "can't implement class that is only as interface";
    }
    export abstract class IConstructorName {
        abstract get constructorName(): string;
    }
}