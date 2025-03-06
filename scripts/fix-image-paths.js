const fs = require('fs');
const path = require('path');

// Function to recursively find all HTML and JS files
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findFiles(filePath, fileList);
    } else if (
      filePath.endsWith('.html') || 
      filePath.endsWith('.js') || 
      filePath.endsWith('.css')
    ) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to fix paths in a file
function fixPathsInFile(filePath) {
  console.log(`Processing ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix image paths that don't have the website-mygrade prefix
  content = content.replace(/src="\/([^\/])/g, 'src="/website-mygrade/$1');
  content = content.replace(/href="\/([^\/])/g, 'href="/website-mygrade/$1');
  
  // Fix paths in CSS url() references
  content = content.replace(/url\(\/([^\/])/g, 'url(/website-mygrade/$1');
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed paths in ${filePath}`);
}

// Main function
function main() {
  console.log('Starting path fixing process...');
  
  // Find all HTML and JS files in the out directory
  const files = findFiles('./out');
  
  // Fix paths in each file
  files.forEach(fixPathsInFile);
  
  console.log('Path fixing process completed!');
}

main(); 