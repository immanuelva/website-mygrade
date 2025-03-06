const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to fix image paths in a component file
function fixImagePathsInFile(filePath) {
  console.log(`Processing component file: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix image paths in Next.js Image components
  content = content.replace(/src="\/(?!website-mygrade\/|http|https)([^"]+)"/g, 'src="/website-mygrade/$1"');
  
  // Fix paths that don't have a leading slash
  content = content.replace(/src="(?!\/|http|https)([^"]+)"/g, 'src="/website-mygrade/$1"');
  
  // Fix double website-mygrade prefixes
  content = content.replace(/src="\/website-mygrade\/website-mygrade\//g, 'src="/website-mygrade/');
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed image paths in ${filePath}`);
}

// Main function
function main() {
  console.log('Starting component image path fixing process...');
  
  // Find all component files
  const componentFiles = [
    ...glob.sync('components/**/*.{js,jsx,ts,tsx}', { cwd: process.cwd() }),
    ...glob.sync('app/**/*.{js,jsx,ts,tsx}', { cwd: process.cwd() }),
    ...glob.sync('pages/**/*.{js,jsx,ts,tsx}', { cwd: process.cwd() }),
    ...glob.sync('src/**/*.{js,jsx,ts,tsx}', { cwd: process.cwd() }),
  ];
  
  // Process each file
  componentFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    fixImagePathsInFile(filePath);
  });
  
  console.log('Component image path fixing completed!');
}

main(); 