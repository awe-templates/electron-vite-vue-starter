# Build Resources

This directory contains resources needed for building and packaging your Electron application.

## Required Icons

To package your application, you need to provide icons for each platform:

### Windows

- **File**: `icons/win/icon.ico`
- **Sizes**: 16x16, 32x32, 48x48, 64x64, 128x128, 256x256
- **Format**: ICO (Windows Icon)

### macOS

- **File**: `icons/mac/icon.icns`
- **Size**: 512x512px or 1024x1024px
- **Format**: ICNS (Apple Icon Image)

### Linux

- **Directory**: `icons/png`
- **Files**: PNG images in various sizes
  - `16x16.png`
  - `32x32.png`
  - `48x48.png`
  - `64x64.png`
  - `128x128.png`
  - `256x256.png`
  - `512x512.png`
  - `1024x1024.png`

## Icon Generation Tool

By using [electron-icon-maker](https://github.com/jaretburkett/electron-icon-maker), you can generate icons for all platforms from a single source image.

```bash
pnpm i -g electron-icon-maker

electron-icon-maker --input=absolute/path/to/icon.png --output=./build
```

### File Structure

```txt
build/
├── README.md
└── icons/
    ├── win/
    │   ├── icon.ico
    ├── mac/           
    │   ├── icon.icns
    └── png/
        ├── 16x16.png
        ├── 32x32.png
        ├── 48x48.png
        ├── 64x64.png
        ├── 128x128.png
        ├── 256x256.png
        └── 512x512.png
        └── 1024x1024.png
```

## Design Guidelines

### Best Practices

- Start with a high-resolution source image (at least 1024x1024px)
- Use PNG format with transparency for the source
- Keep the design simple and recognizable at small sizes
- Test how the icon looks at 16x16px (smallest size)
- Use a square canvas with your icon centered
- Avoid fine details that won't be visible at small sizes

### Platform-Specific Considerations

**macOS**

- Use rounded corners (macOS will apply its own rounded square mask)
- Consider the visual weight - macOS icons tend to be colorful
- Test in both light and dark mode

**Windows**

- Windows icons are typically more literal/realistic
- Ensure good contrast for taskbar visibility
- Test against both light and dark taskbars

**Linux**

- Various desktop environments may render differently
- Ensure the icon works well with different themes
- Keep sufficient padding around the edges
