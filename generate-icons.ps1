$sourceLogo = "src\assets\images\logo.svg"
$iconSizes = @(512, 384, 192, 152, 144, 128, 96, 72, 48, 32, 16)
$appleIconSizes = @(180, 167, 152)

# Create icons directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "src\assets\icons"

# Generate PWA and favicon icons
foreach ($size in $iconSizes) {
    $outputFile = "src\assets\icons\icon-${size}x${size}.png"
    magick convert $sourceLogo -resize ${size}x${size} -background none -gravity center -extent ${size}x${size} $outputFile
}

# Generate specific favicon files
magick convert "src\assets\icons\icon-32x32.png" "src\assets\icons\favicon-32x32.png"
magick convert "src\assets\icons\icon-16x16.png" "src\assets\icons\favicon-16x16.png"

# Generate Apple Touch Icons (with white background as required by Apple)
foreach ($size in $appleIconSizes) {
    $outputFile = "src\assets\icons\apple-touch-icon-${size}x${size}.png"
    magick convert $sourceLogo -resize ${size}x${size} -background white -gravity center -extent ${size}x${size} $outputFile
}

# Rename the 48x48 icon for the header logo
Copy-Item "src\assets\icons\icon-48x48.png" -Destination "src\assets\icons\logo-48x48.png"
