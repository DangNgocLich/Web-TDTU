
import Fail from '../web/components/fail.js'
export default function Register(props) {
    return (<Fail {...props} />
    )
}
export async function getServerSideProps({ req, res }) {
    const { cookies } = req
    // return verifyToken(cookies.accessToken, accessTokenSecret).then(result => {
    //     return {
    //         redirect: {
    //             destination: '/',
    //             permanent: false,
    //         }
    //     }
    // }).catch(err => {
        return {
            props: {
            }
        }
    // })
}
