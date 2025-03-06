const fs = require('fs');
const path = require('path');

// Main function
function main() {
  console.log('Starting simple image fix...');
  
  // 1. Create public directory if it doesn't exist
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // 2. Create .nojekyll file in public directory
  fs.writeFileSync(path.join(publicDir, '.nojekyll'), '');
  console.log('Created .nojekyll file');
  
  // 3. Copy images to public directory
  const images = [
    'ubc.png',
    'uoft.png',
    'queens.png',
    'western.png',
    'app-showcase.png',
    'graduationcap.png',
    'aplus.png',
    'books.png'
  ];
  
  // Look for images in these directories
  const searchDirs = [
    process.cwd(),
    path.join(process.cwd(), 'assets'),
    path.join(process.cwd(), 'images'),
    path.join(process.cwd(), 'src/assets'),
    path.join(process.cwd(), 'src/images')
  ];
  
  // Copy each image if found
  images.forEach(image => {
    for (const dir of searchDirs) {
      const sourcePath = path.join(dir, image);
      if (fs.existsSync(sourcePath)) {
        const targetPath = path.join(publicDir, image);
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied ${sourcePath} to ${targetPath}`);
        break;
      }
    }
  });
  
  // 4. Create a simple test page
  const testPagePath = path.join(publicDir, 'test.html');
  const testPageContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Image Test</title>
</head>
<body>
  <h1>Image Test</h1>
  <div>
    <img src="ubc.png" alt="UBC" width="200">
    <img src="uoft.png" alt="UofT" width="200">
    <img src="queens.png" alt="Queens" width="200">
    <img src="western.png" alt="Western" width="200">
  </div>
</body>
</html>
  `;
  fs.writeFileSync(testPagePath, testPageContent);
  console.log(`Created test page at ${testPagePath}`);
  
  console.log('Simple image fix completed!');
}

main(); 