import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ApiClient,
  RequestPayload
} from '../../interfaces/api/api-client.interface';
import { AppHttpHeaders } from '../../services/helpers/http-headers.service';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService implements ApiClient {
  private baseUrl = environment.apiBase;

  constructor(private http: HttpClient, private headerService: AppHttpHeaders) {
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  callHttpGet(payload: RequestPayload): Observable<any> {
    const url = this.generateUrl(payload, true);
    const headers = payload.headers
      ? payload.headers
      : this.headerService.createHeaders();
    this.baseUrl = environment.apiBase;
    return this.http
      .get(url, {
        headers: headers,
        responseType: <'arraybuffer'>payload.responseType
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  callHttpPatch(payload: RequestPayload): Observable<any> {
    const url = this.generateUrl(payload);
    const headers = payload.headers
      ? payload.headers
      : this.headerService.createHeaders();

    this.baseUrl = environment.apiBase;
    return this.http.patch(url, payload.param, { headers: headers }).pipe(
      map((response) => {
        return response;
      })
    );
  }

  callHttpPost(payload: RequestPayload): Observable<any> {
    const url = this.generateUrl(payload);
    const headers = payload.headers
      ? payload.headers
      : this.headerService.createHeaders();

    this.baseUrl = environment.apiBase;
    return this.http.post(url, payload.param, { headers: headers }).pipe(
      map((response) => {
        return response;
      })
    );
  }

  callHttpDelete(payload: RequestPayload): Observable<any> {
    const url = this.generateUrl(payload);
    const headers = payload.headers
      ? payload.headers
      : this.headerService.createHeaders();

    return this.http.delete(url, { headers: headers }).pipe(map(() => {}));
  }

  private generateUrl(payload: RequestPayload, get = false) {
    let url = `${this.baseUrl}${payload.version || ''}${payload.path}`;
    if (get && Object.keys(payload?.param || {}).length > 0) {
      url = `${url}?`;
      Object.entries(payload.param).forEach(([key, value]) => {
        url = `${url}${key}=${value}&`;
      });
    }
    return url;
  }
}
