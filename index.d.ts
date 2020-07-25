import webpack from 'webpack';
interface Option {
    origin: RegExp;
    outputName: string;
}
export default class RenameModule {
    options: Option[];
    constructor(options?: Option | Option[]);
    apply(compiler: webpack.Compiler): void;
}
export {};
