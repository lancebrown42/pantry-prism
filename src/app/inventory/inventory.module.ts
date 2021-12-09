import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { inventoryPage } from './inventory.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { inventoryPageRoutingModule } from './inventory-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    inventoryPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [inventoryPage]
})
// eslint-disable-next-line @typescript-eslint/naming-convention
export class inventoryPageModule {}
