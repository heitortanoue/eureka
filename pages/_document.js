import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
         <link rel="shortcut icon" href="/logos/icon.png" />
         <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"/>
          <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
        </Head>
        <body>
          <Main>
          </Main>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument