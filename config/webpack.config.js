const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    const isProd = env === 'prod';
    return {
        entry: './assets/index.js',
        output: {
            path: path.join(__dirname, '../dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                test: /\.p?css$/,
                use: [
                    !isProd ? {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true,
                            convertToAbsoluteUrls: true
                        }
                    } : MiniCssExtractPlugin.loader, {
                        loader: "css-loader",
                        options: { 
                            sourceMap: true,
                            minimize: isProd ? true || { preset: "advanced" } : false 
                        }
                    }, {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: { path: path.resolve(__dirname, 'config', 'postcss.config.js') },
                        }
                    }
                ]
            }]
        },
        devtool: isProd ? 'source-map' : 'inline-source-map',
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'bundle.css'
            })
        ]
    }
}