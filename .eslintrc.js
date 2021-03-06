module.exports = {
	env: {
		node: true,
		es6: true,
	},
	globals: {
		'PRODUCTION': 'readonly',
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
	},
	plugins: [
		'@typescript-eslint',
	],
	rules: {
		'comma-dangle': [
			'error',
			'always-multiline',
		],
		'@typescript-eslint/ban-ts-comment': [
			'error',
			{
				'ts-ignore': 'allow-with-description',
			},
		],
	},
}
