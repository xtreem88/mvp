import { Observable } from 'rxjs';

export interface ApiClient {
  getBaseUrl?(): string;

  setBaseUrl?(url: string): void;

  callHttpGet(payload: RequestPayload): Observable<any>;

  callHttpPost(payload: RequestPayload): Observable<any>;

  callHttpPut(payload: RequestPayload): Observable<any>;

  callHttpDelete(payload: RequestPayload): Observable<any>;
}

export interface RequestPayload {
  path: string;
  type?: string;
  param?: any;
  version?: string;
  headers?: any;
  responseType?: 'arraybuffer';
}
