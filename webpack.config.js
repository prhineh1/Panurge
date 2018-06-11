const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
    return {
        entry: './assets/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: bundle.js
        },
        module: {
            rules: [{
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: bundle.css
            })
        ]
    }
}