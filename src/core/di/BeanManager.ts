import { BeanDefinition, BeanScope, DefaultClass, Token } from "../types/index.js";

export default class BeanManager {
    private static beans = new Map<Token, BeanDefinition>();

    public static getAll() {
        return this.beans
    }

    public static get(token: Token): BeanDefinition {
        return this.beans.get(token)!;
    }

    public static discovery(modules: DefaultClass[]) {
        for (const target of modules) {
            const isComponent: boolean = Reflect.getMetadata("COMPONENT", target)

            if (!isComponent)
                continue

            const scope: BeanScope | undefined = Reflect.getMetadata("SCOPE", target)
            const dependencies = Reflect.getOwnMetadata("design:paramtypes", target) ?? [];


            const token: Token = target || Symbol(target)

            this.beans.set(token, {
                token,
                target,
                dependencies,
                scope: scope || "singleton",
                stereoType: "",
            })
        }
    }
}