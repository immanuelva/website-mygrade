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
    } else if (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to fix paths in a file
function fixPathsInFile(filePath) {
  console.log(`Processing ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove all meta refresh tags completely
  content = content.replace(/<meta http-equiv="refresh"[^>]*>/g, '');
  
  // Fix paths to ensure they only have one /website-mygrade/ prefix
  // First, normalize any paths with multiple website-mygrade segments
  content = content.replace(/\/website-mygrade\/website-mygrade\//g, '/website-mygrade/');
  
  // Fix absolute paths for images
  if (filePath.endsWith('.html') || filePath.endsWith('.js')) {
    // Fix image paths that don't have the website-mygrade prefix
    content = content.replace(/src="\/(?!website-mygrade\/|_next\/)/g, 'src="/website-mygrade/');
    content = content.replace(/href="\/(?!website-mygrade\/|_next\/)/g, 'href="/website-mygrade/');
    
    // Fix _next paths
    content = content.replace(/src="\/_next\//g, 'src="/website-mygrade/_next/');
    content = content.replace(/href="\/_next\//g, 'href="/website-mygrade/_next/');
    
    // Fix image paths in JSON data (for Next.js)
    content = content.replace(/"url":"\/_next\//g, '"url":"/website-mygrade/_next/');
    content = content.replace(/"url":"\/(?!website-mygrade\/)/g, '"url":"/website-mygrade/');
    
    // Fix relative image paths (without leading slash)
    content = content.replace(/src="([^h][^t][^t][^p][^s]?[^:][^\/][^\/][^w][^w][^w])/g, 'src="/website-mygrade/$1');
  }
  
  // Fix double prefixes that might have been created
  content = content.replace(/src="\/website-mygrade\/website-mygrade\//g, 'src="/website-mygrade/');
  content = content.replace(/href="\/website-mygrade\/website-mygrade\//g, 'href="/website-mygrade/');
  
  // Fix CSS url() paths
  if (filePath.endsWith('.css')) {
    content = content.replace(/url\(\/_next\//g, 'url(/website-mygrade/_next/');
    content = content.replace(/url\(\/(?!website-mygrade\/)/g, 'url(/website-mygrade/');
    content = content.replace(/url\(([^h][^t][^t][^p][^s]?[^:][^\/][^\/][^w][^w][^w])/g, 'url(/website-mygrade/$1');
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed paths in ${filePath}`);
}

// Main function
function main() {
  const outDir = path.join(process.cwd(), 'out');
  const files = findFiles(outDir);
  
  files.forEach(file => {
    fixPathsInFile(file);
  });
  
  // Create a .nojekyll file to prevent GitHub Pages from using Jekyll
  fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
  
  // Create a copy of index.html as 404.html to handle client-side routing
  const indexPath = path.join(outDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, path.join(outDir, '404.html'));
    console.log('Created 404.html from index.html');
  }
  
  console.log('Path fixing completed successfully!');
}

main(); 