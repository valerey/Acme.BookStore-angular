import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShelfRoutingModule } from './shelf-routing.module';
import { ShelfComponent } from './shelf.component';


@NgModule({
  declarations: [
    ShelfComponent
  ],
  imports: [
    SharedModule,
    ShelfRoutingModule
  ]
})
export class ShelfModule { }
