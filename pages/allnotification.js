import NotificationDetail from '../web/components/notificatition/NotificationComponent'
export default function notification(props) {
  return (<NotificationDetail {...props} />
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
        cookies
      }, // will be passed to the page component as props
    }

  }

}
