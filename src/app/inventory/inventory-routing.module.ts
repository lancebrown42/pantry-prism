import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { inventoryPage } from './inventory.page';

const routes: Routes = [
  {
    path: '',
    component: inventoryPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class inventoryPageRoutingModule {}
