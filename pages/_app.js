import Head from 'next/head';
import App from 'next/app'
import 'tailwindcss/tailwind.css'
import "nprogress/nprogress.css";
import NextNprogress from 'nextjs-progressbar';
import { verifyToken } from '../server/helpers/jwt.helper';
import { accessTokenSecret } from '../server/middleware/AuthMiddleware';
import LeftBar from '../web/components/home/LeftBar';

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
        <Component router={router} />
      </div>
    )
  }
}

export default MainApp