const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env) => {
    const isProd = env === 'prod';
    return {
        entry: ['@babel/polyfill', './assets/index.tsx'],
        output: {
            path: path.join(__dirname, 'dist'),
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
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
            {
                test: /\.(ts|js)x?$/,
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
                            sourceMap: true
                        }
                    }, {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
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