import typescript from '@rollup/plugin-typescript';

const BUILD_DIR = 'dist';

const createConfig = (input, output) => ({
	input: `src/${input}`,
	output: [
		{
			file: `${BUILD_DIR}/${output}.js`,
			format: 'cjs',
			// sourcemap: true,
		},
		{
			file: `${BUILD_DIR}/${output}.esm.js`,
			format: 'es',
			// sourcemap: true,
		},
	],
	plugins: [
		typescript({
			tsconfig: './tsconfig.json',
			declaration: true,
			declarationDir: `./${BUILD_DIR}`,
			rootDir: 'src',
		}),
	],
	external: [],
});

export default [
	// Main bundle
	createConfig('index.ts', 'index'),

	// Individual category bundles
	createConfig('string/index.ts', 'string/index'),

	// Types bundle
	createConfig('types/index.ts', 'types/index'),
];
