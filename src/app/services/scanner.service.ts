import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { SpoonacularService } from './spoonacular.service';
import { AlertController } from '@ionic/angular';
import { present } from '@ionic/core/dist/types/utils/overlays';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  constructor(private barcodeScanner: BarcodeScanner, private spoon: SpoonacularService,
    public alertController: AlertController) { }
  scanBarcode(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', JSON.stringify(barcodeData));
      this.lookupUPC(barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

  lookupUPC(barcode: BarcodeScanResult){
    if(barcode.format.includes('UPC')){
      console.log(barcode.text);
      const thing = this.spoon.getItemUPC('a');
      console.log(thing);
      this.presentAlertSuccess();
      return thing;
    }
    else{
      console.log('Thats not a upc, its a ' + barcode.format);
      this.presentAlert();
      return barcode.format;
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'barcode was not upc',
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async presentAlertSuccess() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'Added',
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
