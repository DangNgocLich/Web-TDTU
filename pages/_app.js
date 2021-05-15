import Head from 'next/head';
import App from 'next/app'
import 'tailwindcss/tailwind.css'
import "nprogress/nprogress.css";

class MainApp extends App {
  render() {
    const { router, Component, pageProps } = this.props
    return (
      <div>
        <Head>
          <link rel="icon" type="image/png" href={'public/favicon.png'} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
        <NextNprogress />
        <Component />
      </div>
    )
  }
}
export default MainApp