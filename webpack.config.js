require('dotenv').config()
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');

const config = (entry) => ({
	entry: {
		[entry]: resolve(`src/${entry}.js`)
	},
	output: {
		filename: '[name].js',
		path: resolve(__dirname, 'dist'),
		assetModuleFilename: '[name][ext][query]',
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					},
				}
			},
			{
				test: /\.css?$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		]
	},
	plugins: [new MiniCssExtractPlugin()],
	externals: {
		'crypto': 'crypto'
	}
});

const background = config('background');
const inject = config('inject');
const options = config('options');

options.plugins = [
	...options.plugins,
	new HtmlWebpackPlugin({
		filename: '[name].html'
	})
]

module.exports = [background, inject, options]