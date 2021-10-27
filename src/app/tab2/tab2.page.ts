/* eslint-disable guard-for-in */
import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PantryItem } from '../model/item.interface';
import * as PantryJSON from '../../../db/items.json';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

let inventory: PantryItem[];
const source: PantryItem[] = JSON.parse(JSON.stringify(PantryJSON));
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(public photoService: PhotoService) { }
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
  populateInventory(){
    // let pantryFactory: PantryItem;
    // if(source){
    // }
  }

}
