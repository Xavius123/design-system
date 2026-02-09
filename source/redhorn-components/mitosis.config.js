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
      stateType: 'useState',
      stylesType: 'react-native' // Automatically converts CSS to StyleSheet.create()
    },
    vue: {
      typescript: true,
      api: 'composition'
    }
  },
  dest: '../../packages/'
}
