import LoggedInUser from '../../interfaces/auth/loggedin-user.interface';

export function mapToLoggedInUser(authenticationResponse): LoggedInUser {
    return {
        email: authenticationResponse.auth_user.username,
        isLoggedIn: true,
        uuid: authenticationResponse.auth_user.id,
        token: authenticationResponse.access_token.token,
        role: authenticationResponse.auth_user.role,
        balance: authenticationResponse.auth_user.deposit,
    };
}

export function mapUserToLoggedInUser(userResponse): LoggedInUser {
  return {
      email: userResponse.username,
      isLoggedIn: true,
      uuid: userResponse.id,
      role: userResponse.role,
      balance: userResponse.deposit,
  };
}
