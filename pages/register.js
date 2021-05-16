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
    if (!cookies.accessToken) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    } else {
        return verifyToken(cookies.accessToken, accessTokenSecret).then((data) => {
            if (data.data.role !== "3") {
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    },
                }
            }
        })
    }
    return {
        props: {

        }, // will be passed to the page component as props
    }
}
