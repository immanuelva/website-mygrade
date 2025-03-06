const fs = require('fs');
const path = require('path');

// Function to copy a file
function copyFile(source, target) {
  fs.copyFileSync(source, target);
  console.log(`Copied ${source} to ${target}`);
}

// Function to copy a directory recursively
function copyDir(source, target) {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  // Read all files/directories in the source directory
  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy directories
      copyDir(sourcePath, targetPath);
    } else {
      // Copy files
      copyFile(sourcePath, targetPath);
    }
  }
}

// Main function
function main() {
  console.log('Starting deployment process...');
  
  // Copy the out directory contents to the root
  copyDir('./out', './');
  
  console.log('Deployment process completed!');
}

main(); 