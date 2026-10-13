import path from "node:path";
import FileService from "./FileService.js";

import { DefaultClass, DefaultModule } from "../types/index.js";

const BASE_DIR = process.env.BASE_DIR ?? "";

export default class ClassLoader {
    public static async modules(): Promise<DefaultClass[]> {
        const paths = await FileService.readDir(path.join(process.cwd(), BASE_DIR));

        const modules = [] as DefaultClass[];

        for (const file of paths) {
            const module: DefaultModule = await import(file);

            if (typeof module.default != "function") {
                continue;
            }

            modules.push(module.default);
        }

        return modules;
    }
}
