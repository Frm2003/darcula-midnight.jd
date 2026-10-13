import { BeanDefinition, BeanScope, Factory, Token } from "../types/index.js";
import ScopedProxyFactory from "./ScopedProxyFactory.js";

export default class Container {
    private definitions = new Map<Token, BeanDefinition>();
    private instances = new Map<Token, object>();

    private providers: Record<BeanScope, (factory: Factory, token: Token) => object>;

    constructor() {
        this.providers = {
            singleton: (factory, token) => {
                const instance = factory();

                this.instances.set(token, instance);

                return instance;
            },
            transient: (factory) => ScopedProxyFactory.create(factory),
        };
    }

    public get<T extends object>(token: Token): T {
        return this.resolveBean(this.definitions.get(token)!);
    }

    public resolveBean<T extends object>(bean: BeanDefinition): T {
        if (this.instances.has(bean.token)) {
            return this.instances.get(bean.token)! as T;
        }

        const dependencies = bean.dependencies.map((token) => {
            const definition = this.definitions.get(token);

            if (!definition) {
                throw new Error("Bean not found");
            }

            return this.resolveBean(definition);
        });

        const factory = bean.factory.bind(null, ...dependencies);

        return this.providers[bean.scope](factory, bean.token) as T;
    }

    public init(): void {
        for (const bean of this.definitions.values()) {
            if (bean.scope !== "singleton") {
                continue;
            }

            this.resolveBean(bean);
        }
    }

    public register(bean: BeanDefinition): void {
        this.definitions.set(bean.token, bean);
    }
}
