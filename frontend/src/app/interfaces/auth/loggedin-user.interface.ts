import { LoginError } from './login-error.interface';

export default interface LoggedInUser {
    isLoggedIn: boolean,
    email?: string,
    role?: 'buyer' | 'seller',
    displayName?: string,
    token?: string,
    uuid?: number,
    error?: LoginError,
    balance?: number
}
