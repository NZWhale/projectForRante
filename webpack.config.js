const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.ts',
        adminpanel: './src/adminpanel.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    devtool: "inline-source-map",
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, ],
    },
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.join(__dirname, './index.html'), to: path.join(__dirname, './dist/index.html') },
                { from: path.join(__dirname, '/src/style.css'), to: path.join(__dirname, './dist/style.css') },
                { from: path.join(__dirname, './adminpanel.html'), to: path.join(__dirname, './dist/adminpanel.html') },
            ],
        }),
    ],

};