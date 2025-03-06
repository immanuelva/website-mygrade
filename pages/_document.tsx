import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Removed the base href that was causing issues */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 