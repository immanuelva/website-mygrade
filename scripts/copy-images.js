const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to copy a file
function copyFile(source, target) {
  try {
    fs.copyFileSync(source, target);
    console.log(`Copied ${source} to ${target}`);
    return true;
  } catch (error) {
    console.error(`Error copying ${source} to ${target}: ${error.message}`);
    return false;
  }
}

// Main function
function main() {
  console.log('Starting enhanced image copy process...');
  
  // Create public directory if it doesn't exist
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // List of images to copy
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
  
  // Possible source directories to check
  const sourceDirs = [
    process.cwd(),
    path.join(process.cwd(), 'public'),
    path.join(process.cwd(), 'assets'),
    path.join(process.cwd(), 'images'),
    path.join(process.cwd(), 'src', 'assets'),
    path.join(process.cwd(), 'src', 'images'),
    path.join(process.cwd(), 'app', 'assets'),
    path.join(process.cwd(), 'app', 'images'),
  ];
  
  // Try to find and copy each image
  const copyResults = {};
  
  imagesToCopy.forEach(image => {
    copyResults[image] = false;
    
    // Try each source directory
    for (const sourceDir of sourceDirs) {
      const sourcePath = path.join(sourceDir, image);
      const targetPath = path.join(publicDir, image);
      
      if (fs.existsSync(sourcePath)) {
        copyResults[image] = copyFile(sourcePath, targetPath);
        if (copyResults[image]) break; // Stop if successfully copied
      }
    }
    
    // If not found in any of the directories, search using glob
    if (!copyResults[image]) {
      try {
        const files = glob.sync(`**/${image}`, { cwd: process.cwd(), nodir: true });
        if (files.length > 0) {
          const sourcePath = path.join(process.cwd(), files[0]);
          const targetPath = path.join(publicDir, image);
          copyResults[image] = copyFile(sourcePath, targetPath);
        }
      } catch (error) {
        console.error(`Error searching for ${image}: ${error.message}`);
      }
    }
    
    if (!copyResults[image]) {
      console.warn(`Warning: Image ${image} not found in any source directory`);
    }
  });
  
  // Create placeholder images for any that weren't found
  Object.keys(copyResults).forEach(image => {
    if (!copyResults[image]) {
      const targetPath = path.join(publicDir, image);
      createPlaceholderImage(targetPath);
    }
  });
  
  console.log('Image copy process completed!');
}

// Function to create a simple placeholder image
function createPlaceholderImage(targetPath) {
  try {
    // Create a simple text file as placeholder
    fs.writeFileSync(targetPath, 'Placeholder image');
    console.log(`Created placeholder for ${targetPath}`);
  } catch (error) {
    console.error(`Error creating placeholder for ${targetPath}: ${error.message}`);
  }
}

main(); 