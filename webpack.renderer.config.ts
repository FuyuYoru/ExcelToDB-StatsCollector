import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push(
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

export const rendererConfig: Configuration = {
	module: {
		rules,
	},
	plugins,
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
	},
};
