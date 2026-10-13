export default function Component(): ClassDecorator;
export default function Component(target: Function): void;

export default function Component(target?: Function) {
    const decorator = (target: Function) => {
        Reflect.defineMetadata("COMPONENT", true, target);
    }

    if (target) {
        // uso: @Component
        return decorator(target);
    }

    // uso: @Component()
    return decorator;
}