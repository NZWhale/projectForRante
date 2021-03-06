var path = require('path');
var CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },],
    },
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.join(__dirname, './index.html'), to: path.join(__dirname, './dist/index.html') },
            ],
        }),
    ],
};
