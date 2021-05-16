import { verifyToken } from "../server/helpers/jwt.helper"
import { accessTokenSecret } from "../server/middleware/AuthMiddleware"
import HomeComponent from "../web/components/auth/HomeComponent"

export default function Index(props) {
  return (
    <HomeComponent {...props} />
  )
}

export async function getServerSideProps({ req, res }) {
  const { cookies } = req
  return verifyToken(cookies.accessToken, accessTokenSecret).then(result => {
    return {
      props: {
      }
    }
  }).catch(err => {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  })
}