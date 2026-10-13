import path from "path";
import fs from "fs/promises";

export default class FileService {
    public static async readDir(
        basePath: string,
        set: Set<string> = new Set<string>(),
    ): Promise<Set<string>> {
        const dirHandle = await fs.opendir(basePath);

        for await (const entry of dirHandle) {
            const fullPath = path.join(basePath, entry.name);

            if (entry.isDirectory()) {
                await this.readDir(fullPath, set);
                continue;
            }

            set.add(fullPath);
        }

        return set;
    }
}
