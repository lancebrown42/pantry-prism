/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { ScannerService } from '../services/scanner.service';
// import { PantryItem } from '../model/item.interface';
import {Item} from '../models/item.model';
import { ItemCrudService } from '../services/item-crud.service';
import {Platform} from '@ionic/angular';
import { SpoonacularService } from '../services/spoonacular.service';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
// import * as PantryJSON from '../../../db/items.json';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  isCordova: boolean;
  inventory: Item[] = [];
  source: JSON ;
  constructor(public photoService: PhotoService, public scannerService: ScannerService,
    public itemService: ItemCrudService, private plat: Platform, public spoon: SpoonacularService,
    public alertController: AlertController) {
      //check for cordova for scanner
      this.isCordova = plat.is('cordova');
     }
  ionViewWillEnter(){
    this.populateInventory();
  }
  addPhotoToGallery() {
    console.log(environment);
    let failtest: BarcodeScanResult = {format:'AZTEC',text:'TEST',cancelled:false};
    let passtest: BarcodeScanResult = {format:'UPC_A',text:'TEST',cancelled:false};
    this.scannerService.lookupUPC(failtest);
    this.scannerService.lookupUPC(passtest);
    // this.photoService.addNewToGallery();
  }
  scanBarcode() {
    console.log(this.inventory);
    this.scannerService.scanBarcode();
    // this.photoService.addNewToGallery();
  }
  populateInventory(){
    this.itemService.getAll()
      .subscribe(
        data=>{
          this.source = JSON.parse(JSON.stringify(data));
          console.log(this.source);

          for(let item in this.source){
            item = JSON.parse(JSON.stringify(this.source[item]));
            // console.log('item');
            // console.log(item);
            let it;
            it = item;
            // console.log('it');
            // console.log(it);
            this.inventory.push(it);
          }
        }
      );
  }

}
