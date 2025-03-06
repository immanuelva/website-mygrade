const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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
  
  // Ensure .nojekyll file exists in the out directory
  fs.writeFileSync(path.join(process.cwd(), 'out', '.nojekyll'), '');
  console.log('Created .nojekyll file in out directory');
  
  // Copy the public directory to out if it exists
  const publicDir = path.join(process.cwd(), 'public');
  if (fs.existsSync(publicDir)) {
    const entries = fs.readdirSync(publicDir, { withFileTypes: true });
    for (const entry of entries) {
      const sourcePath = path.join(publicDir, entry.name);
      const targetPath = path.join(process.cwd(), 'out', entry.name);
      
      if (entry.isDirectory()) {
        copyDir(sourcePath, targetPath);
      } else {
        copyFile(sourcePath, targetPath);
      }
    }
  }
  
  console.log('Deployment process completed!');
  
  // Optional: Push to GitHub Pages
  // try {
  //   console.log('Pushing to GitHub Pages...');
  //   execSync('git add out/');
  //   execSync('git commit -m "Deploy to GitHub Pages"');
  //   execSync('git subtree push --prefix out origin gh-pages');
  //   console.log('Successfully pushed to GitHub Pages!');
  // } catch (error) {
  //   console.error('Error pushing to GitHub Pages:', error.message);
  // }
}

main(); 