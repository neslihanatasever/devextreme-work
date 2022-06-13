import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {CollectiveMethod} from "../Models/CollectiveMethot.model";

// import {from, Observable, throwError} from 'rxjs';


@Injectable()
// tslint:disable-next-line:class-name
export class allServiceProviders {
  [x: string]: any;

  // @ts-ignore
  header: HttpHeaders;
  // @ts-ignore
  private currentUserSubject;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.headers();
  }

  // tslint:disable-next-line:typedef
  headers() {
    // @ts-ignore
    // this.currentUserSubject = (JSON.parse(localStorage.getItem('currentUser')));
    this.header = new HttpHeaders()
      // .set('Authorization', `Bearer ${(this.currentUserSubject.token)}`)
      // @ts-ignore
      // .set('dbIp', JSON.parse(localStorage.getItem('dbIp')))
      .set('Content-Type', 'application/json');
  }

  // method - path - json - hata mesajı - async
  // @ts-ignore
  // tslint:disable-next-line:typedef
  async collectiveV2(dataSource: CollectiveMethod) {
    if (dataSource.errorMessage === '-l?(') {
      dataSource.errorMessage = 'Oops! Birşeyler ters Gitti. ->' + dataSource.path.substring(dataSource.path.indexOf('api/') + 4);
    }
    this.headers();
    let data;
    let observe: any = 'body';
    if (dataSource.code) {
      observe = 'response';
    }
    switch (dataSource.method) {
      case 1:
        await this.http.get(dataSource.path, {observe: observe, headers: this.header}).pipe(
          // tslint:disable-next-line:no-shadowed-variable
          map((data) => {
            this.successFunc(dataSource.successMessage);
            return data;
          }), catchError(error => {
            this.errorFunc(dataSource.errorMessage);
            return error;
          })
        ).toPromise().then(x => data = x);
        return data;

      case 2:
        await this.http.post(dataSource.path, dataSource.jsonData, {observe: observe, headers: this.header}).pipe(
          // tslint:disable-next-line:no-shadowed-variable
          map((data) => {
            this.successFunc(dataSource.successMessage);
            return data;
          }), catchError(error => {
            this.errorFunc(dataSource.errorMessage);
            return error;
          })
        ).toPromise().then(x => data = x);
        return data;

      case 3:
        await this.http.put(dataSource.path, dataSource.jsonData, {observe: observe, headers: this.header}).pipe(
          // tslint:disable-next-line:no-shadowed-variable
          map((data) => {
            this.successFunc(dataSource.successMessage);
            return data;
          }), catchError(error => {
            this.errorFunc(dataSource.errorMessage);
            return error;
          })
        ).toPromise().then(x => data = x);
        return data;
      case 4:
        await this.http.delete(dataSource.path, {observe: observe, headers: this.header}).pipe(
          // tslint:disable-next-line:no-shadowed-variable
          map((data) => {
            this.successFunc(dataSource.successMessage);
            return data;
          }), catchError(error => {
            this.errorFunc(dataSource.errorMessage);
            return error;
          })
        ).toPromise().then(x => data = x);
        return data;
    }
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  successFunc(successMessage) {
    if (successMessage) {
      this.toastr.success(successMessage, 'Başarılı');
    }
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  errorFunc(errorMessage) {
    if (errorMessage) {
      this.toastr.error(errorMessage, 'Hata');
    }
  }
}
