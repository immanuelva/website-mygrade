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
  
  // Fix image paths that don't have the website-mygrade prefix
  content = content.replace(/src="\/([^\/])/g, 'src="/website-mygrade/$1');
  content = content.replace(/href="\/([^\/])/g, 'href="/website-mygrade/$1');
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed paths in ${filePath}`);
}

// Main function
function main() {
  const outDir = path.join(process.cwd(), 'out');
  const htmlFiles = findFiles(outDir);
  
  htmlFiles.forEach(fixPathsInFile);
  console.log(`Fixed paths in ${htmlFiles.length} files`);
}

main(); 