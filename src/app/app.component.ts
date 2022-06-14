import {Component} from '@angular/core';
import {allServiceProviders} from "./Services/allService.provider (1)";
import {DevExpressProviders} from "./Services/dev-express.providers (1)";
import {endpoints} from "./Help/endpoint";


@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  providers: [allServiceProviders, DevExpressProviders]
})
export class AppComponent {
  dataSource: any;
  title = "app"
  showHeaderFilter: any;

  calculateFilterExpression: any;
  displayMode: any;
  showInfo: any;
  calculateCellValue: any;

  constructor(private api: allServiceProviders, private dev: DevExpressProviders) {
    // let n = new CollectiveMethod();
    // n.path = endpoints.Request.getRequest.path + 'typeId=1'
    // n.method = 1;

    this.dataSource = dev.getAllDevx('id', endpoints.Request.getRequest.path + '?typeId=1')
  }
  click($event: any) {
  }
}


