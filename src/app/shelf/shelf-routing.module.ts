import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShelfComponent } from './shelf.component';
import { AuthGuard, PermissionGuard } from '@abp/ng.core';

const routes: Routes = [
  { path: '', component: ShelfComponent, canActivate: [AuthGuard, PermissionGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShelfRoutingModule { }
