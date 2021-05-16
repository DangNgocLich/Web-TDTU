import LoginComponent from "../web/components/auth/LoginComponent";

export default function LoginPage(props) {
  return (
    <LoginComponent {...props} />
  )
} export async function getServerSideProps({ req, res }) {
  const { cookies } = req
  if (cookies.accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {

    }, // will be passed to the page component as props
  }
}