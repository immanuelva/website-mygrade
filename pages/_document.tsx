import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add base href for GitHub Pages */}
        {process.env.NODE_ENV === 'production' && (
          <base href="/website-mygrade/" />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 