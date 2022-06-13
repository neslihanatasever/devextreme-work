import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {loadMessages, locale} from 'devextreme/localization';
// @ts-ignore
import trMessages from 'node_modules/devextreme/localization/messages/tr.json';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';


@Injectable()
export class DevExpressProviders {
  // @ts-ignore
  header: HttpHeaders;
  // @ts-ignore
  private currentUserSubject;
  dataSource: any;

  constructor(private http: HttpClient, private router: Router,
              // private authenticationService: AuthenticationService,
              private toastr: ToastrService) {
    this.setHeader();
  }

  setHeader(): void {
    // @ts-ignore
    this.currentUserSubject = (JSON.parse(localStorage.getItem('onrPlastikApmcurrentUser')));
    if (this.currentUserSubject) {
      this.header = new HttpHeaders()
        .set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MDU5IiwiZW1haWwiOiJnYW16ZS55aWxhbkBhcG1zb2Z0Lm5ldCIsInVuaXF1ZV9uYW1lIjoiR2FtemUiLCJyb2xlIjoiMSIsInByaW1hcnlzaWQiOiIzMjkiLCJuYmYiOjE2NTQ1OTgxMDEsImV4cCI6MTY1NDU5OTkwMSwiaWF0IjoxNjU0NTk4MTAxfQ.R3i6ydIklyOE5_cfk7gyOQzk_D4dF9qIU-on2AMts6kIf496oC022t9Sh44qS4Z5_ZJWr-7uw9CplW97MyVNEQ')
        .set('Access-Control-Allow-Origin', '*')
        .set('Content-Type', 'application/json');
    }
  }


  // tslint:disable-next-line:typedef
  getAllDevx(primaryKey: string, ext: string) {
    this.setHeader();
    loadMessages(trMessages);
    locale(navigator.language);
    this.dataSource = AspNetData.createStore({
      key: primaryKey,
      loadUrl: ext,
      insertUrl: ext,
      updateUrl: ext,
      deleteUrl: ext,
      // tslint:disable-next-line:typedef
      onBeforeSend(method, ajaxOptions) {
        ajaxOptions.headers = {Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MDU5IiwiZW1haWwiOiJnYW16ZS55aWxhbkBhcG1zb2Z0Lm5ldCIsInVuaXF1ZV9uYW1lIjoiR2FtemUiLCJyb2xlIjoiMSIsInByaW1hcnlzaWQiOiIzMjkiLCJuYmYiOjE2NTQ1OTgxMDEsImV4cCI6MTY1NDU5OTkwMSwiaWF0IjoxNjU0NTk4MTAxfQ.R3i6ydIklyOE5_cfk7gyOQzk_D4dF9qIU-on2AMts6kIf496oC022t9Sh44qS4Z5_ZJWr-7uw9CplW97MyVNEQ'};
        ajaxOptions.xhrFields = {withCredentials: false};
      },
    });
    return this.dataSource;
  }

  // tslint:disable-next-line:typedef
  readForDevXPivot(primaryKey: string, ext: string, fs: any[]) {
    this.setHeader();

    // const tokenCheck = this.header.get('Authorization');
    loadMessages(trMessages);
    locale(navigator.language);
    this.dataSource = new PivotGridDataSource({
      store: AspNetData.createStore({
        key: primaryKey,
        loadUrl: ext,
        insertUrl: ext,
        updateUrl: ext,
        // tslint:disable-next-line:typedef
        onBeforeSend(method, ajaxOptions) {
          ajaxOptions.xhrFields = {withCredentials: false};
        }
      }),
      fields: fs
    });
    return this.dataSource;
  }
  //
  //
  // postAll(ext: string, v: any): Observable<any> {
  //   this.setHeader();
  //   return this.http.post<any>(this.url + ext, v, {headers: this.header})
  //     .pipe(
  //       catchError(error => {
  //         this.toastr.error('İşleminiz gerçekleştirilemedi. Lütfen tekrar deneyiniz.', 'Hata!', {
  //           timeOut: 3000
  //         });
  //         return throwError('addNewTicket hata!');
  //       })
  //     );
  // }
  //
  // getAllForModels(ext: string): Observable<any[]> {
  //   this.setHeader();
  //   return this.http.get(ext, {headers: this.header}).pipe(
  //     // @ts-ignore
  //     map((data: any[]) => {
  //       return data;
  //     }), catchError(error => {
  //       this.toastr.error('Oppps! Ufak bir hata ekibimiz ile iletişime geçiniz.', 'Hata!', {
  //         timeOut: 3000
  //       });
  //       return throwError('getRequestType hata!');
  //     })
  //   );
  // }
  //
  // getAllForModel(ext: string): Observable<any> {
  //   this.setHeader();
  //   return this.http.get(this.url + ext, {headers: this.header}).pipe(
  //     // @ts-ignore
  //     map((data: any[]) => {
  //       return data;
  //     }), catchError(error => {
  //       this.toastr.error('Oppps! Ufak bir hata ekibimiz ile iletişime geçiniz.', 'Hata!', {
  //         timeOut: 3000
  //       });
  //       console.log(error);
  //       return throwError('getRequestType hata!');
  //     })
  //   );
  // }
  //
  // getSendReport(ext: string, d: string, shiftId: number, isDaily: boolean): Observable<any> {
  //   this.setHeader();
  //
  //   return this.http.get(this.url + ext + '?d=' + d.toString() +
  //     '&shiftId=' + shiftId + '&daily=' + isDaily + '&sendManagement=true', {headers: this.header}).pipe(
  //     // @ts-ignore
  //     map((data: any[]) => {
  //       return data;
  //     }), catchError(error => {
  //       this.toastr.error('Oppps! Ufak bir hata ekibimiz ile iletişime geçiniz.', 'Hata!', {
  //         timeOut: 3000
  //       });
  //       console.log(error);
  //       return throwError('getRequestType hata!');
  //     })
  //   );
  // }
  //
  // getAllForModelPdf(ext: string): Observable<any> {
  //   this.setHeader();
  //   return this.http.get(this.pdfUrl + ext, {headers: this.header}).pipe(
  //     // @ts-ignore
  //     map((data: any[]) => {
  //       return data;
  //     }), catchError(error => {
  //       this.toastr.error('Oppps! Ufak bir hata ekibimiz ile iletişime geçiniz.', 'Hata!', {
  //         timeOut: 3000
  //       });
  //       console.log(error);
  //       return throwError('getRequestType hata!');
  //     })
  //   );
  // }
  //
  // getAllForModelWithPost(ext: string, obj: any): Observable<any> {
  //   this.setHeader();
  //   return this.http.post(ext, obj, {headers: this.header}).pipe(
  //     // @ts-ignore
  //     map((data: any[]) => {
  //       return data;
  //     }), catchError(error => {
  //       this.toastr.error('Oppps! Ufak bir hata ekibimiz ile iletişime geçiniz.', 'Hata!', {
  //         timeOut: 3000
  //       });
  //       return throwError('getRequestType hata!');
  //     })
  //   );
  // }
}

