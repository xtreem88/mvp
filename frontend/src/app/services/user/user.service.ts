import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../repository/api/api.repository';;


@Injectable()
export class UserService {
  private apiPath = '/users';
  constructor(private apiClient: ApiService) {
  }

  getUser(id: number): Observable<any> {
    return this.apiClient.callHttpGet({
      path: `${this.apiPath}/${id}`,
      version: environment.apiVersion,
      type: ''
    });
  }
}
