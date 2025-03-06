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
    // Only redirect if not already on the correct path
    if (!window.location.pathname.includes('/website-mygrade')) {
      window.location.href = "/website-mygrade/";
    }
  </script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      padding: 20px;
      text-align: center;
    }
    h1 {
      margin-bottom: 10px;
    }
    a {
      color: #0070f3;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <h1>Page Not Found</h1>
  <p>The page you're looking for doesn't exist or has been moved.</p>
  <p><a href="/website-mygrade/">Go to Home Page</a></p>
</body>
</html>
`;
  
  fs.writeFileSync(notFoundPath, content);
  console.log('Created 404.html for GitHub Pages');
}

createNotFoundPage(); 