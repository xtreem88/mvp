import LoggedInUser from '../../interfaces/auth/loggedin-user.interface';

const initialLoggedInUserState: LoggedInUser = {
    isLoggedIn: false
}
export const authenticationFeatureKey = 'authenticatedUser';
export default initialLoggedInUserState
