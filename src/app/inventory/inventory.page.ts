/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
import { Component, OnInit } from '@angular/core';
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
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// import * as PantryJSON from '../../../db/items.json';



@Component({
  selector: 'app-inventory',
  templateUrl: 'inventory.page.html',
  styleUrls: ['inventory.page.scss']
})
export class inventoryPage implements OnInit{
  user: User;
  modalDataResponse: any;
  isCordova: boolean;
  inventory: Item[] = [];
  source: JSON ;
  qtyGrp: FormGroup;
  // quantityControl: FormGroup;
  constructor(public photoService: PhotoService, public scannerService: ScannerService,
    public itemService: ItemCrudService, private plat: Platform, public spoon: SpoonacularService,
    public alertController: AlertController, public modalCtrl: ModalController, public fb: FormBuilder) {
      //check for cordova for scanner
      this.isCordova = plat.is('cordova');
     }
  ngOnInit(): void {
    this.qtyGrp = this.fb.group({});


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
    this.scannerService.scanBarcode().then(async (data)=>{
      console.log('data');
      console.log(data);
      const itemCreate = this.itemService.addBatch(data, this.user).subscribe((added: Item[]) => {
        for (let itm of added) {
          this.inventory.push(itm);
          console.log('added ', itm, ' to ', this.user);
        }
      });
      console.log('Item service returned', itemCreate);
    });;
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
    }).then(async (items)=>{
      console.log('items');
      console.log(items);
      let parsedItems: Item[] = [];
      let parsings: Observable<Item>[] = [];
      for (let item of items){
        parsings.push(this.spoon.parseItems(item));
        // const parse = this.spoon.parseItems(item).subscribe(async (data)=>{
        //   console.log('parsed:');
        //   console.log(data);
        //   parsedItems.push(data);
        // });
      }
      const p = async ()=>{
        console.log('in p');
        for await(let parse of parsings){
          await parse.toPromise().then((data)=>{
          console.log('parsed:');
          console.log(data);
          parsedItems.push(data);
        });
        return parsedItems;
      }
    };
    console.log('pre p');

      const itemCreate = this.itemService.addBatch(await p(), this.user).subscribe((added: Item[]) => {
        for (let itm of added) {
          this.inventory.push(itm);
          console.log('added ', itm, ' to ', this.user);
        }
        this.populateInventory();
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
            // console.log(item);
            let it;
            it = item;
            this.inventory.push(it);
          }
          console.log(this.inventory);
    this.inventory.forEach(control=> {
      this.qtyGrp.addControl(control.intItemId.toString() + 'ctrl', this.fb.control(''));
      this.qtyGrp.get(control.intItemId.toString() + 'ctrl').setValue(control.intQuantity);
    });
    // const controls: FormControl[] = <FormControl[]>this.qty.controls;
    // console.log(this.qtyGrp.controls);
    for(let control in this.qtyGrp.controls){
      // console.log(this.qtyGrp.controls[control]);
      this.qtyGrp.controls[control].valueChanges.subscribe(async ctrl=>{
        // console.log(ctrl);
        // console.log(control);
        const item = this.inventory.filter(itm=>itm.intItemId = parseInt(control.split('ctrl',1)[0], 10))[0];
        this.itemService.updateQty(item, this.user, ctrl);
      });
    }
        }
        );
      }else{

        this.itemService.getAll()
        .subscribe(
          data=>{
            this.source = JSON.parse(JSON.stringify(data));
            for(let item of JSON.parse(JSON.stringify(this.source))){
              let it;
              it = item;
              this.inventory.push(it);
            }
          }
          );
        }
  }
  incrementItm(control){
    const ctrl = this.qtyGrp.controls[control.intItemId.toString() + 'ctrl'];
    ctrl.setValue(ctrl.value + 1);
    const item = this.inventory.filter(itm=>itm.intItemId = control.intItemId)[0];
    console.log(control);
    this.itemService.updateQty(item, this.user, ctrl.value).subscribe();
  }
  decrementItm(control){
    const ctrl = this.qtyGrp.controls[control.intItemId.toString() + 'ctrl'];
    ctrl.setValue(ctrl.value - 1);
  }

}
