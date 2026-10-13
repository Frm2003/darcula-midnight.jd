import { Factory, ScopeProvider, Token } from "../../types/index.js";

export default class TransientProvider implements ScopeProvider {
    public get<T extends object>(factory: Factory<T>): T  {
        return ScopedProxyFactory.create(factory)
    }
}

class ScopedProxyFactory {
    public static create<T extends object>(
        resolve: () => T
    ): T {
        return new Proxy({} as T, {
            get(_target, property) {
                const instance = resolve();
                const value = Reflect.get(
                    instance,
                    property,
                    instance
                );

                if (typeof value === "function") {
                    return value.bind(instance);
                }

                return value;
            },

            set(_target, property, value) {
                const instance = resolve();

                return Reflect.set(
                    instance,
                    property,
                    value,
                    instance
                );
            }
        });
    }
}