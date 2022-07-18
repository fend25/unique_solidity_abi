import { defineConfig, Options } from 'tsup'

const coreOptions: Options = {
  entry: {
    index: "src/index.ts",
  },
  target: 'es2020',
  dts: true,
  sourcemap: true,
  metafile: true,
}

export default defineConfig([
  {
    name: 'main',
    ...coreOptions,
    format: ['esm', 'cjs'],
    external: [/^ethers/],
  },

  {
    name: 'main-iife',
    ...coreOptions,
    format: ['iife'],
    noExternal: [/.*/],
    platform: 'browser'
  },

  {
    entry: {
      ethers: "factory/ethers/index.ts",
    },
    name: 'ethers',
    outDir: 'dist',
    target: 'es2020',
    dts: true,
    sourcemap: true,
    format: ['esm', 'cjs'],
    external: [/^ethers/],
  },

  {
    entry: {
      web3: "factory/web3/index.ts",
    },
    name: 'web3',
    outDir: 'dist',
    target: 'es2020',
    dts: true,
    sourcemap: true,
    format: ['esm', 'cjs'],
    external: [/^web3/],
  },
])
