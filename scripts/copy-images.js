const fs = require('fs');
const path = require('path');

// Function to copy a file
function copyFile(source, target) {
  fs.copyFileSync(source, target);
  console.log(`Copied ${source} to ${target}`);
}

// Main function
function main() {
  console.log('Starting image copy process...');
  
  // Create public directory if it doesn't exist
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // List of images to copy from root to public
  const imagesToCopy = [
    'ubc.png',
    'uoft.png',
    'queens.png',
    'western.png',
    'app-showcase.png',
    'graduationcap.png',
    'aplus.png',
    'books.png',
    // Add any other images you need
  ];
  
  // Copy each image
  imagesToCopy.forEach(image => {
    const sourcePath = path.join(process.cwd(), image);
    const targetPath = path.join(publicDir, image);
    
    if (fs.existsSync(sourcePath)) {
      copyFile(sourcePath, targetPath);
    } else {
      console.warn(`Warning: Image ${image} not found in root directory`);
    }
  });
  
  console.log('Image copy process completed!');
}

main(); 