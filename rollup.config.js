import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/main.ts',
  output: [
    {
      file: 'dist/main.js',
      format: 'cjs'
    },
    {
      file: 'dist/main.umd.js',
      format: 'umd',
      name: 'apiCodeBuilder'
    }
  ],
  plugins: [
    typescript({})
  ]
};
