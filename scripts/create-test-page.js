const fs = require('fs');
const path = require('path');

// Main function
function main() {
  console.log('Creating test page...');
  
  const publicDir = path.join(process.cwd(), 'public');
  const testPagePath = path.join(publicDir, 'test.html');
  
  const content = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Asset Test Page</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    img { max-width: 200px; border: 1px solid #ccc; margin: 10px; }
    .success { color: green; }
    .error { color: red; }
  </style>
</head>
<body>
  <h1>Asset Test Page</h1>
  <p>This page tests if assets are loading correctly.</p>
  
  <h2>Images</h2>
  <div>
    <img src="ubc.png" alt="UBC" onload="this.classList.add('success')" onerror="this.classList.add('error'); this.alt='Failed to load UBC'">
    <img src="uoft.png" alt="UofT" onload="this.classList.add('success')" onerror="this.classList.add('error'); this.alt='Failed to load UofT'">
    <img src="queens.png" alt="Queens" onload="this.classList.add('success')" onerror="this.classList.add('error'); this.alt='Failed to load Queens'">
    <img src="western.png" alt="Western" onload="this.classList.add('success')" onerror="this.classList.add('error'); this.alt='Failed to load Western'">
  </div>
  
  <div>
    <img src="app-showcase.png" alt="App Showcase" onload="this.classList.add('success')" onerror="this.classList.add('error'); this.alt='Failed to load App Showcase'">
    <img src="graduationcap.png" alt="Graduation Cap" onload="this.classList.add('success')" onerror="this.classList.add('error'); this.alt='Failed to load Graduation Cap'">
    <img src="aplus.png" alt="A+" onload="this.classList.add('success')" onerror="this.classList.add('error'); this.alt='Failed to load A+'">
    <img src="books.png" alt="Books" onload="this.classList.add('success')" onerror="this.classList.add('error'); this.alt='Failed to load Books'">
  </div>
  
  <h2>Status</h2>
  <div id="status">Checking assets...</div>
  
  <script>
    window.onload = function() {
      const images = document.querySelectorAll('img');
      let successCount = 0;
      let errorCount = 0;
      
      images.forEach(img => {
        if (img.classList.contains('success')) successCount++;
        if (img.classList.contains('error')) errorCount++;
      });
      
      const statusEl = document.getElementById('status');
      if (errorCount === 0) {
        statusEl.innerHTML = '<p class="success">All assets loaded successfully!</p>';
      } else {
        statusEl.innerHTML = '<p class="error">Some assets failed to load. Check the console for details.</p>';
      }
      
      console.log('Asset loading results:', { total: images.length, success: successCount, error: errorCount });
    };
  </script>
</body>
</html>
  `;
  
  fs.writeFileSync(testPagePath, content);
  console.log(`Created test page at ${testPagePath}`);
}

main(); 