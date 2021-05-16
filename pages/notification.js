import Head from 'next/head'
import NotificationComponent from '../web/components/auth/NotificationComponent'
import { verifyToken } from '../server/helpers/jwt.helper'
import { accessTokenSecret } from '../server/middleware/AuthMiddleware'
export default function notification(props) {
  return (<NotificationComponent {...props} />
  )
}
export async function getServerSideProps({ req, res }) {
  const { cookies } = req
  if (!cookies.accessToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  } else {
    return {
      props: {

      }, // will be passed to the page component as props
    }

  }

}
