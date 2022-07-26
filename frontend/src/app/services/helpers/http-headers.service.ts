import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppHttpHeaders {

  constructor() {
  }
  createHeaders() {
    const httpOptions = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    });
    return httpOptions;
  }
}
