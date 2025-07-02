This project implements Style Dictionary, a tool for managing and transforming design tokens across platforms. It provides a centralized system to define, maintain, and export design tokens such as colors, typography, spacing, and more to multiple platforms like web, iOS, and Android.

Project structure:

## Project Structure

- `tokens/`
  - `colors.json` – exported from Figma Token Studio
  - `shadows.json`
  - `spaces.json`
- `generated/`
  - `css/`
  - `react-native/`
  - `scss/`
- `config/`
  - `config.json`
- `transformers/`
  - `shadow-transform.js`
- `README.md`
- `package.json`

Getting Staretd:

    - git clone https://github.com/Xavius123/design-system

    - cd design-system/

    - npm install

Output formatted tokens:

    - npm run build

Adding/Altering token build:

    The token builds are dictated by the "platforms" object in config.json.
    New objects can be added for export to different output formats.

    for further information please refere to style dicitonary config docs: https://styledictionary.com/reference/config/
