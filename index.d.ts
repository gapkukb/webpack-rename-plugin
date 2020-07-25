import webpack from 'webpack';
interface Option {
    origin: RegExp;
    outputName: string;
}
declare const _default: {
    new (options?: Option | Option[] | undefined): {
        options: Option[];
        apply(compiler: webpack.Compiler): void;
    };
};
export = _default;
