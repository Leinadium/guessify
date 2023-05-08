import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/assets/bundle.js',
        format: 'iife',
        name: 'app'
    },
    plugins: [
        json({
            compact: true,
        }),
        svelte({
            include: 'src/**/*.svelte',
            emitCss: false,
        }),
        resolve({
            browser: true,
        }),
        commonjs({
            include: 'node_modules/**',
        }),
    ]
}