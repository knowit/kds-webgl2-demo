const path = require('path');
const fs = require('fs')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, '.');

const appHtmlTitle = 'Demo GPGPU WebGL';

const demos = fs.readdirSync(path.join(dirApp, 'demos')).filter(f => fs.statSync(path.join(dirApp, 'demos', f)).isDirectory())
const demosEntries = {}
demos.forEach(demo => {
    demosEntries[demo] = path.join(dirApp, 'demos', demo, 'index')
})
const demoHtmlPackers = demos.map(demo => {
    return new HtmlWebpackPlugin({
        filename: `${demo}.html`,
        template: path.join(__dirname, 'demos', demo, 'index.ejs'),
        chunks: [demo],
        title: appHtmlTitle
    })
})

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
        ...demosEntries
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

        ...demoHtmlPackers
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