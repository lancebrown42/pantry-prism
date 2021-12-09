/* eslint-disable @typescript-eslint/naming-convention */
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
import { ModalController } from '@ionic/angular';
import { ItemAddPage } from '../modal/item-add/item-add.page';
import { User } from '../models/user.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

// import * as PantryJSON from '../../../db/items.json';



@Component({
  selector: 'app-inventory',
  templateUrl: 'inventory.page.html',
  styleUrls: ['inventory.page.scss']
})
export class inventoryPage {
  user: User;
  modalDataResponse: any;
  isCordova: boolean;
  inventory: Item[] = [];
  source: JSON ;
  // quantityControl: FormGroup;
  constructor(public photoService: PhotoService, public scannerService: ScannerService,
    public itemService: ItemCrudService, private plat: Platform, public spoon: SpoonacularService,
    public alertController: AlertController, public modalCtrl: ModalController, fb: FormBuilder) {
      //check for cordova for scanner
      this.isCordova = plat.is('cordova');
     }
  ionViewWillEnter(){
    this.user = JSON.parse(sessionStorage.getItem('user'));
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
    console.log('env');
    console.log(environment);
    console.log('plat');
    console.log(this.plat);
    console.log(this.inventory);
    this.scannerService.scanBarcode();
    // this.photoService.addNewToGallery();
  }
  async manualAdd(){
    const modal = await this.modalCtrl.create({
      component: ItemAddPage,
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.modalDataResponse = modalDataResponse.data;
        console.log('Modal Sent Data : '+ modalDataResponse.data);
        console.log(modalDataResponse.data);
      }
      return modalDataResponse.data;
    }).then(async (data)=>{
      console.log('data');
      console.log(data);
      const itemCreate = this.itemService.addBatch(data, this.user).subscribe((added: Item[]) => {
        for (let itm of added) {
          this.inventory.push(itm);
          console.log('added ', itm, ' to ', this.user);
        }
      });
      console.log('Item service returned', itemCreate);
    });

    return await modal.present();
  }

  populateInventory(){
    this.inventory = [];
    if(this.user){

      this.itemService.getAllUser(this.user)
      .subscribe(
        data=>{
          this.source = JSON.parse(JSON.stringify(data));
          console.log(this.source);
          const items = JSON.parse(JSON.stringify(this.source)).Items;
          for(let item of items){
            console.log(item);
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
      }else{

        this.itemService.getAll()
        .subscribe(
          data=>{
            this.source = JSON.parse(JSON.stringify(data));
            // console.log(this.source);
            for(let item of JSON.parse(JSON.stringify(this.source))){
              // console.log(item);
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

}
