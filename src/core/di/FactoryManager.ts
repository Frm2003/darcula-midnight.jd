import BeanManager from "./BeanManager.js";
import { BeanDefinition, Factory, Token } from "../types/index.js";

export default class FactoryManager {
    private static factories = new Map<Token, Factory>();

    public static get(token: Token): Factory {
        return this.factories.get(token)!;
    }

    public static resolve() {
        const beans = BeanManager.getAll()
        
        for (const bean of beans.values()) {
            const factory: Factory = (...dependencies) => 
                new bean.target(...dependencies)
            
            this.factories.set(bean.token, factory)
        }
    }
}