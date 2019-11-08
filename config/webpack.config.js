const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env) => {
    const isProd = env === 'prod';
    return {
        entry: ['babel-polyfill', './assets/index.js'],
        output: {
            path: path.join(__dirname, '../dist'),
            filename: '[name].bundle.js'
        },
        optimization: {
            splitChunks: {
              cacheGroups: {
                commons: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendors',
                  chunks: 'all'
                }
              }
            }
          },
        module: {
            rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            minified: isProd ? true : false
                        },
                    }, {
                        loader: 'eslint-loader',
                        options: {
                            configFile: path.resolve(__dirname, '.eslintrc.json'),
                            cache: true,
                            fix: true,
                            emitWarning: true
                        }
                    }
                ]
            }, {
                test: /\.s?css$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true,
                            convertToAbsoluteUrls: true
                        }
                    }, {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            minimize: isProd ? true || { preset: "advanced" } : false
                        }
                    }, {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: { path: path.resolve(__dirname, 'postcss.config.js') },
                        }
                    }, {
                        loader: "sass-loader",
                        options: { sourceMap: true }
                    },
                ]
            }, {
                test: /\.(png|jpe?g|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[ext]'
                        }
                    }
                ]
            }]
        },
        devtool: isProd ? 'source-map' : 'inline-source-map',
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'bundle.css'
            }),
            new CleanWebpackPlugin(['dist'], {
                root: __dirname + "/.."
            })
        ]
    }
}