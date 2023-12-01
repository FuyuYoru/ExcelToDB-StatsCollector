const rules = require('./webpack.rules');
const webpack = require('webpack')

rules.push(
	{
		test: /\.(ts|tsx)$/,
		exclude: /node_modules/,
		use: [
			"babel-loader",
			{
				loader: "ts-loader",
				options: {
					transpileOnly: true,
				},
			},
		],
	},
	{
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-react'],
			},
		},
	},
	{
		test: /\.css$/,
		exclude: /\.module\.css$/,
		use: ['style-loader', 'css-loader'],
	},
	{
		test: /\.module\.css$/,
		use: [
			'style-loader',
			{
				loader: 'css-loader',
				options: {
					importLoaders: 1,
					modules: {
						// localIdentName: '[name]__[local]__[hash:base64:5]'
						localIdentName: '[local]__[hash:base64:5]'
					},
				},
			},
		],
	},
);

module.exports = {
	module: {
		rules,
	},
	mode: 'development',
	// target: 'node',
	resolve: {
		// extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
		fallback: {
			"fs": false,
			"child_process": false,
			"os": require.resolve("os-browserify/browser"),
			"path": require.resolve("path-browserify"),
			"stream": require.resolve("stream-browserify"),
			"util": require.resolve("util/")
		},
	},
};
