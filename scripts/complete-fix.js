const fs = require('fs');
const path = require('path');

// Function to recursively find all HTML files
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findFiles(filePath, fileList);
    } else if (filePath.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to fix paths in a file
function fixPathsInFile(filePath) {
  console.log(`Processing ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove the meta refresh tag that's causing the redirect loop
  content = content.replace(/<meta http-equiv="refresh"[^>]*>/, '');
  
  // Fix paths to ensure they only have one /website-mygrade/ prefix
  content = content.replace(/\/website-mygrade\/website-mygrade\//g, '/website-mygrade/');
  
  // Then ensure paths that should have the prefix do have it (but only once)
  content = content.replace(/src="\//g, 'src="/website-mygrade/');
  content = content.replace(/href="\//g, 'href="/website-mygrade/');
  
  // Fix double prefixes that might have been created
  content = content.replace(/src="\/website-mygrade\/website-mygrade\//g, 'src="/website-mygrade/');
  content = content.replace(/href="\/website-mygrade\/website-mygrade\//g, 'href="/website-mygrade/');
  
  // Fix image paths
  content = content.replace(/src="(.*?)"/g, (match, p1) => {
    if (p1.startsWith('http') || p1.startsWith('/website-mygrade/')) {
      return match;
    }
    return `src="/website-mygrade${p1.startsWith('/') ? '' : '/'}${p1}"`;
  });
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed paths in ${filePath}`);
}

// Function to create a proper 404.html file
function create404Page(outDir) {
  const content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyGrade - Page Not Found</title>
    <script>
      // Single Page Apps for GitHub Pages
      // https://github.com/rafgraph/spa-github-pages
      // This script takes the current URL and converts the path and query
      // string into just a query string, and then redirects the browser
      // to the new URL with only a query string and hash fragment.
      var pathSegmentsToKeep = 1; // Keep /website-mygrade/
      
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
</head>
<body>
    <p>Redirecting to MyGrade...</p>
</body>
</html>`;
  
  fs.writeFileSync(path.join(outDir, '404.html'), content);
  console.log('Created custom 404.html page');
}

// Function to create a proper index.html file
function createIndexPage(outDir) {
  const content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyGrade</title>
    <link rel="stylesheet" href="/website-mygrade/_next/static/css/app.css">
    <script src="/website-mygrade/_next/static/chunks/main.js" defer></script>
    <script src="/website-mygrade/_next/static/chunks/app.js" defer></script>
    <script>
      // This script checks if a redirect is needed
      (function() {
        // If we're not on the base path, redirect to it
        if (window.location.pathname !== '/website-mygrade/' && 
            window.location.pathname !== '/website-mygrade') {
          window.location.href = '/website-mygrade/';
        }
      })();
    </script>
</head>
<body>
    <div id="__next">
        <!-- Main content will be loaded by JavaScript -->
        <div class="container mx-auto px-4 py-8">
            <h1 class="text-4xl font-bold mb-4">MyGrade</h1>
            <p class="mb-4">Welcome to MyGrade - your course management solution.</p>
            <a href="/website-mygrade/app" class="bg-blue-600 text-white px-4 py-2 rounded">Go to App</a>
        </div>
    </div>
</body>
</html>`;
  
  fs.writeFileSync(path.join(outDir, 'index.html'), content);
  console.log('Created custom index.html page');
}

// Main function
function main() {
  const outDir = path.join(process.cwd(), 'out');
  const htmlFiles = findFiles(outDir);
  
  htmlFiles.forEach(file => {
    fixPathsInFile(file);
  });
  
  // Create a .nojekyll file to prevent GitHub Pages from using Jekyll
  fs.writeFileSync(path.join(outDir, '.nojekyll'), '# This file ensures that GitHub Pages doesn\'t process your site with Jekyll');
  console.log('Created .nojekyll file');
  
  // Create custom 404 and index pages
  create404Page(outDir);
  createIndexPage(outDir);
  
  console.log('Path fixing completed successfully!');
}

main(); 