import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../repository/api/api.repository';
import { VendingMeta } from '../../interfaces/vending/metadata.interface';
import { BuyResponse } from '../../interfaces/vending/buy-response.interface';


@Injectable()
export class VendingService {
  private apiPath = '/vendings';
  constructor(private apiClient: ApiService) {
  }

  getMetaData(): Observable<VendingMeta> {
    return this.apiClient.callHttpGet({
      path: `${this.apiPath}/meta`,
      version: environment.apiVersion,
      type: ''
    });
  }

  deposit(coins: number[]): Observable<any> {
    return this.apiClient.callHttpPost({
      path: `${this.apiPath}/deposit`,
      version: environment.apiVersion,
      param: {
        coins: coins.join(',')
      },
      type: ''
    });
  }

  buy(productId: number, count: number): Observable<BuyResponse> {
    return this.apiClient.callHttpPost({
      path: `${this.apiPath}/buy`,
      version: environment.apiVersion,
      param: {
        productId,
        count
      },
      type: ''
    });
  }
}
