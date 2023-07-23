import path from 'path'
import { fileURLToPath } from 'url'
import dts from 'rollup-plugin-dts'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import rollupTypescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'
import pkg from './package.json' assert { type: "json" }
import {defineConfig} from "rollup"
import eslint from '@rollup/plugin-eslint'
const name = 'du-backend-sdk'
const dir = path.dirname(fileURLToPath(import.meta.url))

const config = defineConfig([{
    input: path.resolve(dir, 'src/main.ts'),
    output: [
        {
            file: pkg.main,
            format: 'cjs',
        },
        {
            file: pkg.module,
            format: 'es',
        },
        {
            name,
            file: pkg.umd,
            format: 'umd'
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        rollupTypescript(),
        babel({
            babelHelpers: 'runtime',
            exclude: 'node_modules/**',
            extensions: [
                ...DEFAULT_EXTENSIONS,
                '.ts',
            ],
        }),
        terser(),
        json(),
        eslint({
            throwOnError: true
        })
    ]
}, {
    input: path.resolve(dir, 'src/main.ts'),
    plugins: [dts()],
    output:{
        format: 'esm',
        file: pkg.types
    }
}
]
);

export default config
