import BeanManager from "../di/BeanManager.js";
import Container from "../di/Container.js";
import FactoryManager from "../di/FactoryManager.js";
import ClassLoader from "../infra/ClassLoader.js";

export default class ApplicationContext {
    public static async init() {
        const modules = await ClassLoader.modules()

        BeanManager.discovery(modules)
        FactoryManager.resolve()

        Container.init()
    }
}