/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { ScannerService } from '../services/scanner.service';
// import { PantryItem } from '../model/item.interface';
import {Item} from '../models/item.model';
import { ItemCrudService } from '../services/item-crud.service';
// import * as PantryJSON from '../../../db/items.json';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  inventory: Item[] = [];
  source: JSON ;
  constructor(public photoService: PhotoService, public scannerService: ScannerService, public itemService: ItemCrudService) { }
  ionViewWillEnter(){
    this.populateInventory();
  }
  addPhotoToGallery() {
    console.log(this.inventory);
    // this.scannerService.scanBarcode();
    this.photoService.addNewToGallery();
  }
  populateInventory(){
    this.itemService.getAll()
      .subscribe(
        data=>{
          this.source = JSON.parse(JSON.stringify(data));
          console.log(this.source);

          for(let item in this.source){
            item = JSON.parse(JSON.stringify(this.source[item]));
            console.log('item');
            console.log(item);
            let it;
            it = item;
            console.log('it');
            console.log(it);
            this.inventory.push(it);
          }
        }
      );

  }
  scanBarcode(){
  }
}
