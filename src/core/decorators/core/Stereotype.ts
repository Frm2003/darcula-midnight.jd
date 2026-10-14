import { BeanStereotype } from "../../types/index.js";

export default function Stereotype(value: BeanStereotype): ClassDecorator;
export default function Stereotype(value: BeanStereotype, target: Function): void;

export default function Stereotype(value: BeanStereotype, target?: Function) {
    const decorator = (target: Function) => {
        Reflect.defineMetadata("STEREOTYPE", value, target);
    };

    if (target) {
        return decorator(target);
    }

    return decorator;
}
