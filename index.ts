import webpack from 'webpack'
interface Option {
    origin: RegExp
    outputName: string
}
export default class RenameModule {
    options: Option[] = []
    constructor(options?: Option | Option[]) {
        if (options) {
            if (Array.isArray(options)) {
                this.options.push(...options)
            } else {
                this.options.push(options)
            }
        }
    }
    apply(compiler: webpack.Compiler) {
        if (!this.options.length) return;
        const chunksForEach = (chunk:webpack.compilation.Chunk) => {
            if (chunk.entryModule && (chunk.entryModule as any).resource) {
                const find = (item: Option) => {
                    return item.origin.test((chunk.entryModule as any).resource)
                }
                const matched = this.options.find(find)
                if (matched) {
                    chunk.filenameTemplate = matched.outputName
                }
            }
        }
        compiler.hooks.thisCompilation.tap("rename-webpack-plugin", (compilation) => {
            compilation.hooks.optimizeChunks.tap("rename-webpack-plugin", (chunks) => {
                chunks.forEach(chunksForEach);
            });
        });
    }
}
