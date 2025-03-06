const fs = require('fs');
const path = require('path');

// Create a proper 404.html file for GitHub Pages
function createNotFoundPage() {
  const outDir = path.join(process.cwd(), 'out');
  const notFoundPath = path.join(outDir, '404.html');
  
  const content = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found</title>
  <script>
    // Redirect to the base path
    window.location.href = "/website-mygrade/";
  </script>
</head>
<body>
  <h1>Page Not Found</h1>
  <p>Redirecting to home page...</p>
</body>
</html>
`;
  
  fs.writeFileSync(notFoundPath, content);
  console.log('Created 404.html for GitHub Pages');
}

createNotFoundPage(); 