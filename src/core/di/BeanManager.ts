import "reflect-metadata";

import { BeanDefinition, BeanScope, DefaultClass, Token } from "../types/index.js";

export default class BeanManager {
    public static discovery(modules: DefaultClass[]): Map<Token, BeanDefinition> {
        const beans = new Map<Token, BeanDefinition>();

        for (const target of modules) {
            const isComponent: boolean = Reflect.getMetadata("COMPONENT", target);

            if (!isComponent) {
                continue;
            }

            const scope: BeanScope | undefined = Reflect.getMetadata("SCOPE", target);

            const dependencies: Token[] =
                Reflect.getOwnMetadata("design:paramtypes", target) ?? [];

            const name = target.name;

            const token: Token = target || Symbol(name);

            beans.set(token, {
                dependencies,
                factory: (...deps: unknown[]) => new target(...deps),
                scope: scope || "singleton",
                stereoType: "",
                target,
                token,
            });
        }

        return beans;
    }
}
