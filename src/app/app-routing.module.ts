import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DxButtonModule} from 'devextreme-angular';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxButtonModule],
  exports: [RouterModule]

})
export class AppRoutingModule { }

