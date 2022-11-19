const path = require('path');
const chalk = require('chalk');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');

const barColor = '#ff7f50';

module.exports = {
    entry: [require.resolve('../polyfills'), path.resolve(__dirname, '../src/index.tsx')],
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'js/main.[chunkhash:4].js',
        assetModuleFilename: 'assets/[name].[hash:4][ext]',
    },
    stats: 'errors-warnings',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '~src': path.resolve(__dirname, '../src/'),
            '~ui': path.resolve(__dirname, '../src/ui/'),
            '~components': path.resolve(__dirname, '../src/components/'),
            '~todo-context': path.resolve(__dirname, '../src/todo-context/'),
            '~img': path.resolve(__dirname, '../src/img/'),
            '~fonts': path.resolve(__dirname, '../src/fonts/'),
            '~styles': path.resolve(__dirname, '../src/styles'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass|css)?$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(js|jsx|tsx|ts)?$/,
                exclude: /(node_modules|bower_components)/,
                use: ['ts-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            inject: 'body',
        }),
        new SimpleProgressPlugin({
            messageTemplate: [':bar', chalk.hex(barColor)(':percent'), chalk.hex(barColor)(':msg')].join(' '),
            progressOptions: {
                complete: chalk.bgHex(barColor)(' '),
                incomplete: chalk.bgBlack(' '),
                clear: true,
            },
        }),
    ],
};
