import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{AutocompletePopoverComponent} from '../../autocomplete-popover/autocomplete-popover.component';
import { IonicModule } from '@ionic/angular';

import { ItemAddPageRoutingModule } from './item-add-routing.module';

import { ItemAddPage } from './item-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemAddPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ItemAddPage, AutocompletePopoverComponent],

})
export class ItemAddPageModule {}
