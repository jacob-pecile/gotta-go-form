"use strict";

var MiniCssExtractPlugin = require('mini-css-extract-plugin');

const extractSass = new MiniCssExtractPlugin({
    filename: "./dist/[name].css",
});

var DefinePlugin = require("webpack").DefinePlugin;
const path = require('path');

module.exports = env => {
    const isProd = Object.keys(env)[0] === 'prod';

    const envConfig = !isProd ? new DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    }) : new DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    });

    return {
        entry: {
            "GottaGoForm": isProd ? "./src/index.ts" : ["babel-polyfill", "./App.tsx"]
        },
        output: {
            path: path.resolve(__dirname, "."),
            filename: "./dist/[name].js",
            libraryTarget: 'umd',
            umdNamedDefine: true,
            library: "./lib",
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "babel-loader!ts-loader"
                },
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    options: {
                        presets: ['react', 'es2015']
                    }
                },
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
                {
                    test: /.(\.scss|\.css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
        devtool: "source-map",
        plugins: [
            extractSass,
            envConfig
        ],
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json", ".css"]
        },
        devServer: {
            contentBase: "./",
            port: 7777
        }
    }
}