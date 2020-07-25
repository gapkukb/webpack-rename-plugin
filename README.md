# webpack-rename-plugin

> Webpack-rename-plugin is a plugin for webpack to rename the file which you want it diffrent from the output.filename.

## Install

```
npm i -D webpack-rename-plugin
```

## API

---
#### Notice: the origin property only work for the entry module.
---

```
// webpack.config.js

const WebpackRenamePlugin = require('webpack-rename-plugin')

module.exports={
    //...
    plugins:[
        new WebpackRenamePlugin({
            origin: /background/,  // regexp
            outputName: '[name].js'  //string
        })

        //or
        new WebpackRenamePlugin([
            {
                origin: /your\/path/,  // regexp
                outputName: '[name].js'  //string
            },
            {
                origin: /your\/other\/path/,  // regexp
                outputName: '[name].js'  //string
            },
        ])
    ]

}
```
