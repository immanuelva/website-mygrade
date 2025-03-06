const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Main function
function main() {
  console.log('Starting GitHub Pages fix...');
  
  // 1. Create .nojekyll files
  const outDir = path.join(process.cwd(), 'out');
  const publicDir = path.join(process.cwd(), 'public');
  
  fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
  fs.writeFileSync(path.join(publicDir, '.nojekyll'), '');
  console.log('Created .nojekyll files');
  
  // 2. Copy images from public to out directory
  if (fs.existsSync(publicDir)) {
    const imageFiles = glob.sync('**/*.{png,jpg,jpeg,gif,svg,ico}', { cwd: publicDir });
    
    imageFiles.forEach(file => {
      const sourcePath = path.join(publicDir, file);
      const targetPath = path.join(outDir, file);
      
      // Create directory if it doesn't exist
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied ${file} to out directory`);
    });
  }
  
  // 3. Fix image paths in HTML files
  const htmlFiles = glob.sync('**/*.html', { cwd: outDir });
  
  htmlFiles.forEach(file => {
    const filePath = path.join(outDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix image paths
    content = content.replace(/src="\/(?!website-mygrade\/|http|https)([^"]+)"/g, 'src="/website-mygrade/$1"');
    content = content.replace(/href="\/(?!website-mygrade\/|http|https)([^"]+)"/g, 'href="/website-mygrade/$1"');
    
    // Fix double prefixes
    content = content.replace(/src="\/website-mygrade\/website-mygrade\//g, 'src="/website-mygrade/');
    content = content.replace(/href="\/website-mygrade\/website-mygrade\//g, 'href="/website-mygrade/');
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed paths in ${file}`);
  });
  
  // 4. Create a proper 404.html file
  const notFoundContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found</title>
  <script>
    // Redirect to base path
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
  fs.writeFileSync(path.join(outDir, '404.html'), notFoundContent);
  console.log('Created 404.html file');
  
  console.log('GitHub Pages fix completed!');
}

main(); 