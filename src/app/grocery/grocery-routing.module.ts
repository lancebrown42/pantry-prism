import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroceryPage } from './grocery.page';

const routes: Routes = [
  {
    path: '',
    component: GroceryPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroceryPageRoutingModule {}
