import { Factory, ScopeProvider, Token } from "../../types/index.js";

export default class SingletonProvider implements ScopeProvider {
    private instaces: Map<Token, object> = new Map()

    public get<T extends object>(factory: Factory<T>, token: Token): T  {
        if (this.instaces.has(token))
            return this.instaces.get(token)! as T

        const instance = factory()

        this.instaces.set(token, instance)

        return instance
    }
}