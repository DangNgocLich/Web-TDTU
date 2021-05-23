import { verifyToken } from "../../server/helpers/jwt.helper";
import cookie from 'react-cookies'
import { accessTokenSecret } from '../../server/middleware/AuthMiddleware'
const UserProfile = {
  data: {
  }
}
verifyToken(cookie.load('accessToken'), accessTokenSecret).then(result => UserProfile.data = result.data)
export default UserProfile
