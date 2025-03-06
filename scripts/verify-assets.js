const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to extract image paths from HTML/JS files
function extractImagePaths(content) {
  const srcRegex = /src=["']([^"']+)["']/g;
  const urlRegex = /url\(["']?([^"')]+)["']?\)/g;
  const jsonUrlRegex = /"url":["']([^"']+)["']/g;
  
  const paths = new Set();
  let match;
  
  // Extract src attributes
  while ((match = srcRegex.exec(content)) !== null) {
    paths.add(match[1]);
  }
  
  // Extract CSS url() values
  while ((match = urlRegex.exec(content)) !== null) {
    paths.add(match[1]);
  }
  
  // Extract JSON url values
  while ((match = jsonUrlRegex.exec(content)) !== null) {
    paths.add(match[1]);
  }
  
  return Array.from(paths);
}

// Function to normalize a path
function normalizePath(path) {
  // Remove website-mygrade prefix for checking
  return path.replace(/^\/website-mygrade\//, '/');
}

// Main function
function main() {
  console.log('Starting asset verification process...');
  
  const outDir = path.join(process.cwd(), 'out');
  const publicDir = path.join(process.cwd(), 'public');
  
  // Find all HTML, JS, and CSS files in the out directory
  const files = glob.sync('**/*.{html,js,css}', { cwd: outDir });
  
  // Collect all referenced assets
  const referencedAssets = new Set();
  
  files.forEach(file => {
    const filePath = path.join(outDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const paths = extractImagePaths(content);
    
    paths.forEach(p => {
      // Skip external URLs and data URLs
      if (p.startsWith('http') || p.startsWith('data:')) return;
      
      // Normalize the path
      const normalizedPath = normalizePath(p);
      referencedAssets.add(normalizedPath);
    });
  });
  
  // Check if each referenced asset exists
  const missingAssets = [];
  
  referencedAssets.forEach(asset => {
    // Skip paths with variables or special characters
    if (asset.includes('${') || asset.includes('$1')) return;
    
    // Remove leading slash for checking in public directory
    const assetPath = asset.startsWith('/') ? asset.substring(1) : asset;
    
    // Check in out directory
    const outAssetPath = path.join(outDir, assetPath);
    // Check in public directory
    const publicAssetPath = path.join(publicDir, assetPath);
    
    if (!fs.existsSync(outAssetPath) && !fs.existsSync(publicAssetPath)) {
      missingAssets.push(asset);
    }
  });
  
  // Report results
  console.log(`Total referenced assets: ${referencedAssets.size}`);
  
  if (missingAssets.length > 0) {
    console.log(`Missing assets (${missingAssets.length}):`);
    missingAssets.forEach(asset => console.log(`  - ${asset}`));
  } else {
    console.log('All referenced assets exist!');
  }
  
  console.log('Asset verification completed!');
}

main(); 