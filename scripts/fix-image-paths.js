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
  // First, normalize any paths with multiple website-mygrade segments
  content = content.replace(/\/website-mygrade\/website-mygrade\//g, '/website-mygrade/');
  
  // Then ensure paths that should have the prefix do have it (but only once)
  content = content.replace(/src="\//g, 'src="/website-mygrade/');
  content = content.replace(/href="\//g, 'href="/website-mygrade/');
  
  // Fix double prefixes that might have been created
  content = content.replace(/src="\/website-mygrade\/website-mygrade\//g, 'src="/website-mygrade/');
  content = content.replace(/href="\/website-mygrade\/website-mygrade\//g, 'href="/website-mygrade/');
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed paths in ${filePath}`);
}

// Main function
function main() {
  const outDir = path.join(process.cwd(), 'out');
  const htmlFiles = findFiles(outDir);
  
  htmlFiles.forEach(file => {
    fixPathsInFile(file);
  });
  
  // Create a .nojekyll file to prevent GitHub Pages from using Jekyll
  fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
  
  console.log('Path fixing completed successfully!');
}

main(); 