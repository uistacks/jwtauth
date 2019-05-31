const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');


const APP_SRC_DIR = path.resolve(__dirname, 'client/src/app');
const ADMIN_SRC_DIR = path.resolve(__dirname, 'client/src/admin');
const BUILD_DIR = path.resolve(__dirname, 'client/public/dist');

module.exports = {
    // entry: path.resolve(SRC_DIR, 'index.js'),
    entry: {
        app: path.resolve(APP_SRC_DIR, 'index.js'),
        admin: path.resolve(ADMIN_SRC_DIR, 'index.js')
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    // options: { presets: ['es2015', 'react'] }
                }],
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        filename: '[name]-bundle.js',
        path: BUILD_DIR
    },
    plugins: [
        // new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //     title: 'Hot Module Replacement'
        // }),
        new webpack.HotModuleReplacementPlugin()
    ],
    // devtool: 'inline-source-map',
    devServer: {
        // contentBase: './dist',
        historyApiFallback: true,
        hot: true
    }
}