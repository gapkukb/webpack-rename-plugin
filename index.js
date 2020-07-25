"use strict";
module.exports = class RenameModule {
    constructor(options) {
        this.options = [];
        if (options) {
            if (Array.isArray(options)) {
                this.options.push(...options);
            }
            else {
                this.options.push(options);
            }
        }
    }
    apply(compiler) {
        if (!this.options.length)
            return;
        const chunksForEach = (chunk) => {
            if (chunk.entryModule && chunk.entryModule.resource) {
                const find = (item) => {
                    return item.origin.test(chunk.entryModule.resource);
                };
                const matched = this.options.find(find);
                if (matched) {
                    chunk.filenameTemplate = matched.outputName;
                }
            }
        };
        compiler.hooks.thisCompilation.tap("rename-webpack-plugin", (compilation) => {
            compilation.hooks.optimizeChunks.tap("rename-webpack-plugin", (chunks) => {
                chunks.forEach(chunksForEach);
            });
        });
    }
};
