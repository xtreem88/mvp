import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../repository/api/api.repository';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  cookieName = "mvp";

  constructor(private apiClient: ApiService) {
  }

  loginUsingEmailAndPassword(email, password) {
    this.apiClient.setBaseUrl(environment.authBase);
    return this.apiClient.callHttpPost({
      path: `/auth/token`,
      param: {
        username: email,
        password: password
      },
      type: '',
      version: ''
    });
  }

  getUserAuth() {
    this.apiClient.setBaseUrl(environment.authBase);
    const token = this.getSavedToken();
    if (!token) {
      throw new Error('Token is missing')
    }
    return this.apiClient.callHttpPost({
      path: `/auth/auth-state`,
      type: '',
      version: '',
      headers: {
        Authorization: token,
      }
    });
  }

  logout() {
    this.apiClient.setBaseUrl(environment.authBase);
    this.deleteCookie();
    return this.apiClient.callHttpPost({
      path: `/auth/logout`,
      type: '',
      version: ''
    });
  }

  saveSession(token: string) {
    this.setCookie(this.cookieName, token, 1)
  }

  getSavedToken() {
    return this.getCookie(this.cookieName);
  }

  private getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return '';
  }

  private deleteCookie() {
    this.setCookie(this.cookieName, '', -1);
  }

  private setCookie(name: string, value: string, expireDays: number, path: string = '') {
    let d:Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }
}
