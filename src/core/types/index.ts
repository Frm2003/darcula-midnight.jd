export type BeanScope = "singleton" | "transient";

export type BeanDefinition = {
    token: Token;
    target: DefaultClass;
    dependencies: Token[];
    scope: BeanScope;
    stereoType: string;
}

export type DefaultClass<T extends object = object> =
    new (...args: any[]) => T;

export type DefaultModule = {
    default: DefaultClass;
};

export type Factory<T extends object = object> =
    (...args: any[]) => T;

export interface ScopeProvider {
    get<T extends object>(
        factory: Factory<T>,
        token: Token,
    ): T
}

export type Token = symbol | DefaultClass;

