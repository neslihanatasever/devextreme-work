import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {
  DevExtremeModule,
  DxButtonGroupModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxHtmlEditorModule,
  DxMenuModule
} from "devextreme-angular";
import {DxButtonModule} from 'devextreme-angular';
import {DxoDataSourceModule} from "devextreme-angular/ui/nested";
import {CollectiveMethod} from "./Models/CollectiveMethot.model";
import {allServiceProviders} from "./Services/allService.provider (1)";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DxDataGridModule,
    DxButtonModule,
    ToastrModule.forRoot({
      timeOut: 2000
    }),
    DxButtonModule,
    DxButtonGroupModule,
    DxCheckBoxModule,
    DxHtmlEditorModule,
    DxMenuModule,
    DevExtremeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
