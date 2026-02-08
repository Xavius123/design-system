export default {
  files: 'src/**/*.lite.tsx',
  targets: ['react', 'angular', 'reactNative'],
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
    }
  },
  dest: '../',
  overridesDir: 'overrides'
}
