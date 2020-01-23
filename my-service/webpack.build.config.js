const path = require('path');
const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');
const commonLoaders = [
    {test: /\.js$/, use: 'babel-loader', exclude: [/node_modules/]},
    {test: /\.ts$/, use: 'ts-loader', exclude: [/node_modules/]},
    //{ test: /\.json$/, use: 'json-loader' },
];
module.exports =
    {
        optimization: {
            minimize: false
        },
        name: 'server',
        mode: "production",
        entry: "./index.js",
        target: 'node',
        devtool: "none",
        output: {
            libraryTarget: 'commonjs',
            path: path.resolve(__dirname, '.webpack'),
            filename: 'index.js',
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, 'src'),
            }
        },
        externals: [nodeExternals()],
        module: {
            rules: commonLoaders.concat([
                // { test: /\.styl$/, loader: 'css!stylus' },
            ]),
        },
        plugins: [
            new webpack.EnvironmentPlugin({
                botapi: "587297912:AAEgIY01EjZJ0-jkVape0rwCbXfLl521mcE",
                vk_botapi: "17e439db455d36c65e95134c0e14998cb611be55f2a113225d2d711144237af341d76968643264a9bde4b"
            }),
            //new PrintChunksPlugin()
        ],
    }
;