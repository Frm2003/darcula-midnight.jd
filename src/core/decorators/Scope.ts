import { BeanScope } from "../types/index.js";


export default function Scope(value: BeanScope): ClassDecorator;
export default function Scope(value: BeanScope, target: Function): void;

export default function Scope(value: BeanScope, target?: Function) {
    const decorator = (target: Function) => {
        Reflect.defineMetadata("SCOPE", value, target);
    };

    if (target) {
        return decorator(target);
    }

    return decorator;
}