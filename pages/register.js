import Head from 'next/head'
import RegisComponent from '../web/components/auth/RegisComponent'
import { verifyToken } from '../server/helpers/jwt.helper'
import { accessTokenSecret } from '../server/middleware/AuthMiddleware'
import UserProfile from '../web/userProfile/UserProfile'
export default function Register(props) {
    return (<RegisComponent {...props} />
    )
}
export async function getServerSideProps({ req, res }) {
    const { cookies } = req
    if (UserProfile.data.role !== "3")
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    else
        return {
            props: {
            }
        }
}
