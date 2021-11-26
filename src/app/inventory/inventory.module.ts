import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { inventoryPage } from './inventory.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { inventoryPageRoutingModule } from './inventory-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    inventoryPageRoutingModule
  ],
  declarations: [inventoryPage]
})
export class inventoryPageModule {}
