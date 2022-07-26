import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.repository';
import { MockProvider } from 'ng-mocks';
import { AppHttpHeaders } from '../../services/helpers/http-headers.service';
import { productMock } from '../../mocks/product/product.mock';
import { metaMock } from '../../mocks/pagination/pagination.mock';

let service: ApiService;
let httpMock: HttpTestingController;
export const responseMock = {
  products: [productMock],
  meta: metaMock
}
describe('ApiService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        MockProvider(AppHttpHeaders),
      ],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the class', () => {
    expect(ApiService).toBeTruthy();
  });

  describe('callHttpGet', () => {
    it('should make necessary function calls', () => {
      service.callHttpGet({path: '/test'}).subscribe((data) => {
        expect(data).toBe(responseMock)
      });
      const req = httpMock.expectOne(`http://localhost:3000/api/test`);
      req.flush(responseMock);
    });

    it('should make necessary function calls', () => {
      service.callHttpGet({path: '/test', param: metaMock}).subscribe((data) => {
        expect(data).toBe(responseMock)
      });
      const req = httpMock.expectOne(`http://localhost:3000/api/test?page=1&per_page=25&total=10000&`);
      req.flush(responseMock);
    });
  });

  describe('callHttpPut', () => {
    it('should make necessary function calls', () => {
      service.callHttpPut({path: '/test', param: productMock}).subscribe((data) => {
        expect(data).toBe(responseMock)
      });
      const req = httpMock.expectOne(`http://localhost:3000/api/test`);
      req.flush(responseMock);
    });
  });

});
