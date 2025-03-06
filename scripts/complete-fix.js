const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Main function
function main() {
  console.log('Starting comprehensive GitHub Pages fix...');
  
  // 1. Create .nojekyll files
  const outDir = path.join(process.cwd(), 'out');
  const publicDir = path.join(process.cwd(), 'public');
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, '.nojekyll'), '');
  console.log('Created .nojekyll files');
  
  // 2. Create images directory in public if it doesn't exist
  const imagesDir = path.join(publicDir, 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  // 3. Copy all images to root of public directory
  const imageFiles = [
    'ubc.png',
    'uoft.png',
    'queens.png',
    'western.png',
    'app-showcase.png',
    'graduationcap.png',
    'aplus.png',
    'books.png'
  ];
  
  // Search directories for images
  const searchDirs = [
    process.cwd(),
    path.join(process.cwd(), 'assets'),
    path.join(process.cwd(), 'images'),
    path.join(process.cwd(), 'public'),
    path.join(process.cwd(), 'public/images'),
    path.join(process.cwd(), 'src/assets'),
    path.join(process.cwd(), 'src/images'),
    path.join(process.cwd(), 'app/assets'),
    path.join(process.cwd(), 'app/images')
  ];
  
  // Copy each image if found
  imageFiles.forEach(image => {
    let found = false;
    
    for (const dir of searchDirs) {
      const sourcePath = path.join(dir, image);
      if (fs.existsSync(sourcePath)) {
        const targetPath = path.join(publicDir, image);
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied ${sourcePath} to ${targetPath}`);
        found = true;
        break;
      }
    }
    
    if (!found) {
      console.warn(`Warning: Could not find image ${image} in any search directory`);
    }
  });
  
  // 4. Copy all files from public to out
  if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir);
    files.forEach(file => {
      const sourcePath = path.join(publicDir, file);
      const targetPath = path.join(outDir, file);
      
      if (fs.statSync(sourcePath).isDirectory()) {
        // Copy directory recursively
        copyDirRecursive(sourcePath, targetPath);
      } else {
        // Copy file
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied ${sourcePath} to ${targetPath}`);
      }
    });
  }
  
  // 5. Fix paths in all HTML and JS files
  const htmlAndJsFiles = [
    ...glob.sync('**/*.html', { cwd: outDir }),
    ...glob.sync('**/*.js', { cwd: outDir })
  ];
  
  htmlAndJsFiles.forEach(file => {
    const filePath = path.join(outDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix image paths
    content = content.replace(/src="\/(?!website-mygrade\/|http|https)([^"]+)"/g, 'src="/website-mygrade/$1"');
    content = content.replace(/href="\/(?!website-mygrade\/|http|https)([^"]+)"/g, 'href="/website-mygrade/$1"');
    
    // Fix paths for images without leading slash
    content = content.replace(/src="(?!\/|http|https|website-mygrade\/|data:)([^"]+)"/g, 'src="/website-mygrade/$1"');
    
    // Fix double prefixes
    content = content.replace(/src="\/website-mygrade\/website-mygrade\//g, 'src="/website-mygrade/');
    content = content.replace(/href="\/website-mygrade\/website-mygrade\//g, 'href="/website-mygrade/');
    
    // Fix JSON data paths
    content = content.replace(/"url":"\/(?!website-mygrade\/)/g, '"url":"/website-mygrade/');
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed paths in ${file}`);
  });
  
  // 6. Fix CSS files
  const cssFiles = glob.sync('**/*.css', { cwd: outDir });
  
  cssFiles.forEach(file => {
    const filePath = path.join(outDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix url() paths in CSS
    content = content.replace(/url\(\/_next\//g, 'url(/website-mygrade/_next/');
    content = content.replace(/url\(\/(?!website-mygrade\/)/g, 'url(/website-mygrade/');
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed CSS paths in ${file}`);
  });
  
  // 7. Create a proper index.html and 404.html
  const indexContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="0;url=/website-mygrade/">
  <title>MyGrade</title>
  <script>
    window.location.href = "/website-mygrade/";
  </script>
</head>
<body>
  <h1>Redirecting to MyGrade...</h1>
  <p>If you are not redirected automatically, <a href="/website-mygrade/">click here</a>.</p>
</body>
</html>
`;

  const notFoundContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found</title>
  <script>
    window.location.href = "/website-mygrade/";
  </script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      padding: 20px;
      text-align: center;
    }
    h1 {
      margin-bottom: 10px;
    }
    a {
      color: #0070f3;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <h1>Page Not Found</h1>
  <p>The page you're looking for doesn't exist or has been moved.</p>
  <p><a href="/website-mygrade/">Go to Home Page</a></p>
</body>
</html>
`;

  fs.writeFileSync(path.join(outDir, 'index.html'), indexContent);
  fs.writeFileSync(path.join(outDir, '404.html'), notFoundContent);
  console.log('Created index.html and 404.html files');
  
  console.log('Comprehensive GitHub Pages fix completed!');
}

// Helper function to copy directory recursively
function copyDirRecursive(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  
  const entries = fs.readdirSync(source, { withFileTypes: true });
  
  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);
    
    if (entry.isDirectory()) {
      copyDirRecursive(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied ${sourcePath} to ${targetPath}`);
    }
  }
}

main(); 