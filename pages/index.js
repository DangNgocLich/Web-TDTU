import HomeComponent from "../web/components/auth/HomeComponent"

export default function Index(props){
  return(
    <HomeComponent {...props} />
  )
}

export async function getServerSideProps({req, res}) {
  const { cookies } = req
  if (!cookies.accessToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return {
    props: {

    }, // will be passed to the page component as props
  }
}
