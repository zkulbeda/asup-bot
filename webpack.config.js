const path = require('path');
const webpack = require("webpack");
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const commonLoaders = [
    {test: /\.js$/, use: 'babel-loader', exclude: [/node_modules/]},
    {
        test: /\.ts$/, use: require.resolve('ts-loader'),
        exclude: [/node_modules/]
    },
];

module.exports =
    {
        optimization: {
            minimize: false
        },
        name: 'server',
        entry: './express.js',
        target: 'node',
        mode: "development",
        devtool: "inline-source-map",
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'backend.js',
            libraryTarget: 'commonjs2',
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
            new NodemonPlugin(), // Dong,
            new webpack.EnvironmentPlugin({
                botapi: "587297912:AAEgIY01EjZJ0-jkVape0rwCbXfLl521mcE",
                vk_botapi: "17e439db455d36c65e95134c0e14998cb611be55f2a113225d2d711144237af341d76968643264a9bde4b"
            })
        ],
    }
;