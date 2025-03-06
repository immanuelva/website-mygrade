const fs = require('fs');
const path = require('path');

function main() {
  console.log('Starting simple deployment process...');
  
  // 1. Ensure out directory exists
  const outDir = path.join(process.cwd(), 'out');
  if (!fs.existsSync(outDir)) {
    console.error('Error: out directory does not exist. Run "next build" first.');
    process.exit(1);
  }
  
  // 2. Create .nojekyll file in out directory
  fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
  console.log('Created .nojekyll file in out directory');
  
  // 3. Copy public directory contents to out directory
  const publicDir = path.join(process.cwd(), 'public');
  if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir);
    files.forEach(file => {
      const sourcePath = path.join(publicDir, file);
      const targetPath = path.join(outDir, file);
      
      if (fs.statSync(sourcePath).isFile()) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied ${sourcePath} to ${targetPath}`);
      }
    });
  }
  
  // 4. Create a simple 404.html file
  const notFoundPath = path.join(outDir, '404.html');
  const notFoundContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=/website-mygrade/">
  <title>Page Not Found</title>
</head>
<body>
  <p>If you are not redirected, <a href="/website-mygrade/">click here</a>.</p>
</body>
</html>
  `;
  fs.writeFileSync(notFoundPath, notFoundContent);
  console.log('Created 404.html file');
  
  console.log('Simple deployment process completed!');
}

main(); 