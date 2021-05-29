import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private qrScanner: QRScanner,
    public alertController: AlertController,
    public storageService: StorageService
  ) {
    // this.scancode();
    console.log('tab1');
    
    console.log(this.storageService.getAllSocials());
    
  }

  

  scancode() {
    console.log("scan code entered");
    
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
    console.log("then");

       if (status.authorized) {
         // camera permission was granted
    console.log("if true");

  
         // start scanning
         let scanSub = this.qrScanner.scan().subscribe((text: string) => {
    console.log("let true");

           console.log('Scanned something', text);
  
           this.qrScanner.hide(); // hide camera preview
           scanSub.unsubscribe(); // stop scanning
         });
  
       } else if (status.denied) {
    console.log("else if");

         // camera permission was permanently denied
         // you must use QRScanner.openSettings() method to guide the user to the settings page
         // then they can grant the permission from there
       } else {
    console.log("else");

         // permission was denied, but not permanently. You can ask for permission again at a later time.
       }
    })
    .catch((e: any) => console.log('Error is', e));
  }

}
