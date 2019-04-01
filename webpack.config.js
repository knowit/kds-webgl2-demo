const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, '.');

const appHtmlTitle = 'Demo WebGL';

/**
 * Webpack Configuration
 */
module.exports = {
    devtool: 'eval',

    output: {
        filename: '[name].js'
    },

    devServer: {
        host: '0.0.0.0'
    },
    
    entry: {
        main: path.join(dirApp, 'index'),
        eigenface: path.join(dirApp, 'eigenface', 'index'),
        mandelbrot: path.join(dirApp, 'mandelbrot', 'index')
    },
    resolve: {
        modules: [
            dirNode,
            dirApp
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'index.ejs'),
            chunks: ['main'],
            title: appHtmlTitle
        }),

        new HtmlWebpackPlugin({
            filename: 'eigenface.html',
            template: path.join(__dirname, 'eigenface', 'index.ejs'),
            chunks: ['eigenface'],
            title: appHtmlTitle
        }),

        new HtmlWebpackPlugin({
            filename: 'mandelbrot.html',
            template: path.join(__dirname, 'mandelbrot', 'index.ejs'),
            chunks: ['mandelbrot'],
            title: appHtmlTitle
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/
            }, 
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                loader: 'raw-loader'
            }
        ]
    }
};