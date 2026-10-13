import BeanManager from "./BeanManager.js";
import FactoryManager from "./FactoryManager.js";
import ScopeManager from "./scope/ScopeManager.js";

import { BeanDefinition, Token } from "../types/index.js";

export default class Container {
    private static intances: Map<Token, object>
    private static scopeManager: ScopeManager

    static {
        this.scopeManager = new ScopeManager()
    }

    public static init() {
        const beans = BeanManager.getAll().values()

        for (const bean of beans) {
            this.resolveBean(bean)
        }
    }

    public static get<T extends object>(token: Token): T {
        return this.resolveBean(BeanManager.get(token))
    }

    public static resolveBean<T extends object>(bean: BeanDefinition): T {
        const dependencies = bean.dependencies.map(token => {
            return this.resolveBean(BeanManager.get(token))
        })

        const factory = FactoryManager.get(bean.token)

        return this.scopeManager.instance(
            factory.bind(null, ...dependencies),
            bean.scope,
            bean.token,
        )
    }
}