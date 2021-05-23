import Head from 'next/head'
import RegisComponent from '../web/components/auth/RegisComponent'
import { verifyToken } from '../server/helpers/jwt.helper'
import { accessTokenSecret } from '../server/middleware/AuthMiddleware'
export default function Register(props) {
    return (<RegisComponent {...props} />
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
