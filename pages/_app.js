import Head from 'next/head';
import App from 'next/app'
import 'tailwindcss/tailwind.css'
import "nprogress/nprogress.css";
import NextNprogress from 'nextjs-progressbar';
import LeftBar from '../web/components/home/LeftBar';
import Header from '../web/components/home/Header';
import io from 'socket.io-client'
import { URL } from '../web/config/config';
const excludeLeftBar = ['/login', '/register']

class MainApp extends App {

  constructor(props){
    super(props);
    this.state = {
      socket: null
    }
  }

  componentDidMount(){
    const socketIo = io(URL)
    this.setState({socket: socketIo})
  }

  render() {
    const { router, Component, pageProps } = this.props
    return (
      <div className='flex'>
        <Head>
          <link rel="icon" type="image/png" href={'public/favicon.png'} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
        <NextNprogress />
        {excludeLeftBar.indexOf(router.pathname) != -1 ? null : <LeftBar router = {router} />}
        <div className='flex w-full flex-col'>
          {excludeLeftBar.indexOf(router.pathname) != -1 ? null : <Header router = {router}/>}
          <Component router={router} socket = {this.state.socket} />
        </div>
      </div>
    )
  }
}

export default MainApp