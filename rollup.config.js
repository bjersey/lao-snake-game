import eslint from 'rollup-plugin-eslint';

export default {
	input: './src/main.js',
	output: {
		file: './dist/bundle.js',
		format: 'es'
	},
	plugins: [
		eslint({
			exclude: [
				'src/styles/**',
			]
		}),
	],
};
