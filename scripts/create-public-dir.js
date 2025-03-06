const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  console.log('Created public directory');
}

// Create .nojekyll file in public directory
fs.writeFileSync(path.join(publicDir, '.nojekyll'), '');
console.log('Created .nojekyll file in public directory');

// Create CNAME file if needed
// fs.writeFileSync(path.join(publicDir, 'CNAME'), 'yourdomain.com');
// console.log('Created CNAME file in public directory');

console.log('Public directory setup completed!'); 