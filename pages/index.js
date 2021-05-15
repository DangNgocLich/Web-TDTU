export default function Index(){
  return(
    <div>
      Homepage
    </div>
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
