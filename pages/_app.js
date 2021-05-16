import Head from 'next/head';
import App from 'next/app'
import 'tailwindcss/tailwind.css'
import "nprogress/nprogress.css";
import NextNprogress from 'nextjs-progressbar';
import LeftBar from '../web/components/home/LeftBar';
import Header from '../web/components/home/Header';

const excludeLeftBar = ['/login', '/register']
class MainApp extends App {

  render() {
    const { router, Component, pageProps } = this.props
    return (
      <div className='flex'>
        <Head>
          <link rel="icon" type="image/png" href={'public/favicon.png'} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
        <NextNprogress />
        {excludeLeftBar.indexOf(router.pathname) != -1 ? null : <LeftBar />}
        <div className='flex flex-col'>
          {excludeLeftBar.indexOf(router.pathname) != -1 ? null : <Header />}
          <Component router={router} />
        </div>
      </div>
    )
  }
}

export default MainApp