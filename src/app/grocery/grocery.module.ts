import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroceryPage } from './grocery.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { GroceryPageRoutingModule } from './grocery-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: GroceryPage }]),
    GroceryPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [GroceryPage]
})
export class GroceryPageModule {}
