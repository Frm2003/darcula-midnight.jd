import SingletonProvider from "./SingletonProvider.js";
import TransientProvider from "./TransientProvider.js";

import { BeanScope, Factory, ScopeProvider, Token } from "../../types/index.js";

export default class ScopeManager {
    private providers: Record<BeanScope, ScopeProvider>
    
    constructor() {
        this.providers = {
            "singleton": new SingletonProvider(),
            "transient": new TransientProvider()
        }
    }

    public instance<T>(factory: Factory, scope: BeanScope, token: Token): T {
        return this.providers[scope].get(factory, token) as T
    }
}