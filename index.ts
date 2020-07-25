import webpack from 'webpack'
interface Option {
    origin: RegExp
    outputName: string
}
//这里是用typescript写commonjs导出的写法，如果export default那么commonjs require时需要加default才可以使用。export = 就可以直接使用了
export = class RenameModule {
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
