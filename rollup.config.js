import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/main.js',
    format: 'cjs'
  },
  plugins: [
    typescript({})
  ]
};
