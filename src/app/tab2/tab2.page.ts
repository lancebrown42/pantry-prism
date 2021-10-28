/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { ScannerService } from '../services/scanner.service';
import { PantryItem } from '../model/item.interface';
import * as PantryJSON from '../../../db/items.json';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  inventory: PantryItem[] = [];
  source: JSON = JSON.parse(JSON.stringify(PantryJSON));
  constructor(public photoService: PhotoService, public scannerService: ScannerService) { }
  ionViewWillEnter(){
    this.populateInventory();
  }
  addPhotoToGallery() {
    console.log(this.inventory);
    // this.scannerService.scanBarcode();
    this.photoService.addNewToGallery();
  }
  populateInventory(){
    console.log(this.source);
    let item: any;
    for(item in this.source){
      item = JSON.parse(JSON.stringify(this.source[item]));
      console.log('item');
      console.log(item);
      let it: PantryItem;
      it = item;
      console.log('it');
      console.log(it);
      this.inventory.push(it);
    }
  }
  scanBarcode(){
  }
}
