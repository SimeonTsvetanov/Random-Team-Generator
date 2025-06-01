# 🎲 [Random Team Generator](https://simeontsvetanov.github.io/Random-Team-Generator/)

<div align="center">

[![Random Team Generator Logo](public/icons/icon-96x96.png)](https://simeontsvetanov.github.io/Random-Team-Generator/)

A modern Progressive Web App for quickly and fairly dividing people into teams.

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blueviolet?style=for-the-badge&logo=pwa)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

[Features](#features) •
[Demo](#live-demo) •
[Installation](#installation) •
[Usage](#usage) •
[Development](#development) •
[License](#license) •
[Author](#author) •
[Contributing](#contributing) •
[Show your support](#show-your-support)

</div>

<a id="features"></a>

## ✨ Features

### Core Functionality

- 🎯 **Smart Team Generation** - Fair and random team distribution
- 🔄 **Quick Refresh** - Generate new team combinations with one click
- 📋 **Copy to Clipboard** - Easily share your teams
- ✅ **Smart Input Validation** - Automatically handles empty lines and spaces
- 🔢 **Inline Participant Numbering** - Progressive numbering (1, 2, 3...) for easy organization

### Modern UI/UX

- 🌓 **Dark/Light Theme** - Choose your preferred visual style
- 📱 **Fully Responsive** - Works perfectly on all devices
- 💫 **Smooth Animations** - Beautiful transitions and feedback
- 🎨 **Material Design** - Modern and clean interface
- ⌨️ **Keyboard Navigation** - Arrow keys to move between inputs
- 🗑️ **Smart Auto-Removal** - Empty inputs automatically disappear

### PWA Features

- 🔌 **Offline Support** - Works without internet connection
- 📲 **Installable** - Add to your device's home screen
- 🚀 **Lightning Fast** - Optimized for performance
- 🔄 **Auto Updates** - Always get the latest version

<a id="live-demo"></a>

## 🚀 Live Demo

Try it now: [Random Team Generator](https://simeontsvetanov.github.io/Random-Team-Generator/)

<a id="installation"></a>

## 📥 Installation

### PWA Installation Instructions

| Platform                  | Browser       | Installation Steps                                                                                                                                       |
| ------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖥️ **Chrome Desktop**     | Chrome/Edge   | 1. Visit the [web app](https://simeontsvetanov.github.io/Random-Team-Generator/) → 2. Click the install icon (⊞) in the address bar → 3. Click "Install" |
| 📱 **iOS (iPhone/iPad)**  | Safari        | 1. Open in Safari → 2. Tap the Share button (□↗) → 3. Scroll down and tap "Add to Home Screen" → 4. Tap "Add"                                            |
| 🤖 **Android**            | Chrome        | 1. Visit the web app → 2. Tap the "Add to Home Screen" banner/prompt → 3. Tap "Install" or "Add"                                                         |
| 🔄 **Alternative Method** | Any Browser   | 1. Open browser menu (⋮) → 2. Look for "Install app" or "Add to Home Screen" → 3. Follow the prompts                                                     |
| ✨ **After Installation** | All Platforms | The app will appear on your home screen/desktop and work offline with automatic updates                                                                  |

<a id="usage"></a>

## 💡 Usage

1. **Enter Names**

   - Add participants one by one in individual input fields
   - Progressive numbering appears automatically (1, 2, 3...)
   - Press Enter to add a new participant
   - Use arrow keys (↑/↓) to navigate between inputs
   - Empty inputs automatically disappear after 500ms
   - Each participant gets a numbered badge for easy organization

2. **Select Team Count**

   - Use + and - buttons to adjust number of teams
   - Minimum of 2 teams required

3. **Generate Teams**
   - Click "GENERATE" to create random teams
   - Teams are displayed in colorful containers
   - Use refresh button to get new combinations
   - Copy button to share teams

<a id="development"></a>

## 🛠️ Development

### Project Structure

```
/
├── index.html               # Main HTML file
├── LICENSE                  # MIT license file
├── README.md                # Project documentation
├── RTG.png                  # Main application image
├── generate-icons.ps1       # PowerShell script for icon generation
├── src/
│   ├── js/
│   │   ├── components/      # UI components
│   │   │   ├── ErrorMessage.js
│   │   │   ├── Logo.js
│   │   │   ├── MainInput.js
│   │   │   ├── ParticipantCounter.js
│   │   │   ├── TeamDisplay.js
│   │   │   └── ThemeSwitch.js
│   │   ├── utils/           # Helper functions
│   │   │   ├── inputValidator.js
│   │   │   ├── storage.js
│   │   │   └── teamGenerator.js
│   │   └── main.js          # App entry point
│   ├── css/
│   │   ├── animations.css   # Animation styles
│   │   ├── main.css         # Main CSS file
│   │   ├── components/      # Component styles
│   │   │   ├── error-message.css
│   │   │   ├── logo.css
│   │   │   ├── main-input.css
│   │   │   ├── participant-counter.css
│   │   │   ├── team-display.css
│   │   │   └── theme-switch.css
│   │   ├── layout/          # Layout styles
│   │   │   ├── containers.css
│   │   │   └── grid.css
│   │   └── themes/          # Theme styles
│   │       ├── dark.css
│   │       └── light.css
│   └── assets/
│       └── images/          # Images and icons
│           ├── github-logo.png
│           ├── logo.svg
│           └── teams-logo.svg
└── public/
    ├── favicon.ico          # Favicon
    ├── manifest.json        # PWA manifest
    ├── service-worker.js    # Service worker
    └── icons/               # App icons in various sizes
        ├── apple-touch-icon-152x152.png
        ├── apple-touch-icon-167x167.png
        ├── apple-touch-icon-180x180.png
        ├── favicon-16x16.png
        ├── favicon-32x32.png
        ├── icon-48x48.png
        ├── icon-72x72.png
        ├── icon-96x96.png
        ├── icon-128x128.png
        ├── icon-144x144.png
        ├── icon-152x152.png
        ├── icon-192x192.png
        ├── icon-384x384.png
        └── icon-512x512.png
```

### Technologies Used

- 🎨 HTML5 & CSS3
- 💻 Vanilla JavaScript (ES6+)
- 📱 Progressive Web App
- 🎭 Material Design Icons
- 🌈 CSS Grid & Flexbox

### Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

<a id="license"></a>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<a id="author"></a>

## 👤 Author

**Simeon Tsvetanov**

- Github: [@SimeonTsvetanov](https://github.com/SimeonTsvetanov)

<a id="contributing"></a>

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check the [issues page](https://github.com/SimeonTsvetanov/Random-Team-Generator/issues).

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

<a id="show-your-support"></a>

## 💫 Show your support

Give a ⭐️ if this project helped you!
