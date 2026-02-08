export default {
  files: 'src/**/*.lite.tsx',
  targets: ['react', 'angular', 'reactNative', 'vue'],
  options: {
    react: {
      stylesType: 'style-tag',
      typescript: true
    },
    angular: {
      standalone: true,
      typescript: true
    },
    reactNative: {
      typescript: true,
      stateType: 'useState'
    },
    vue: {
      typescript: true,
      api: 'composition'
    }
  },
  dest: '../../packages/',
  overridesDir: 'overrides'
}
