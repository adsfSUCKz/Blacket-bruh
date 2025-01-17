await import("../functions/internal/logging.js");
await import("../functions/internal/walker.js");

global.blacket = {};

export default async () => {
    const functions = [];

    for (const file of walk("./functions")) {
        if (!file.endsWith(".js")) continue;

        console.log(file);

        const module = import(`../${file}`).then((module) => module.default);

        functions.push(module);
    }

    await Promise.all(functions);
}