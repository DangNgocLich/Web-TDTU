import { verifyToken } from "../server/helpers/jwt.helper";
import { accessTokenSecret } from "../server/middleware/AuthMiddleware";
import LoginComponent from "../web/components/auth/LoginComponent";

export default function LoginPage(props) {
  return (
    <LoginComponent {...props} />
  )
} 

export async function getServerSideProps({ req, res }) {
  const { cookies } = req
  return verifyToken(cookies.accessToken, accessTokenSecret).then(result => {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }).catch(err => {
    return {
      props: {
      }
    }
  })
}