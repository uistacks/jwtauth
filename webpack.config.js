const path = require('path');
const webpack = require('webpack');


const SRC_DIR = path.resolve(__dirname, 'frontend/src');
const BUILD_DIR = path.resolve(__dirname, 'frontend/public/dist');

module.exports = {
    entry: path.resolve(SRC_DIR, 'index.js'),
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
        filename: 'bundle.js',
        path: BUILD_DIR
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        historyApiFallback: true
    }
}