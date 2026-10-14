export type BeanDefinition = {
    dependencies: Token[];
    factory: Factory;
    scope: BeanScope;
    stereoType: string;
    token: Token;
    target: DefaultClass;
};

export type BeanScope = "singleton" | "transient";

export type BeanStereotype = "Controller" | "Repository" | "Service" | "";

export type DefaultClass<T extends object = object> = new (...args: any[]) => T;

export type DefaultModule = {
    default: DefaultClass;
};

export type Factory<T extends object = object> = (...args: any[]) => T;

export interface ScopeProvider {
    instance<T extends object>(factory: Factory<T>, token: Token): T;
}

export type Token = symbol | DefaultClass;
