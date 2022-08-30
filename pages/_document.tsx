import { createGetInitialProps } from '@mantine/next';
import Header from 'app/core/components/Header';
import Document, { Html, Main, NextScript, Head } from 'next/document';

const getInitialProps = createGetInitialProps();

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
