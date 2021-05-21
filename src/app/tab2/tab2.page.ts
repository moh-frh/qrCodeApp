import { Component } from '@angular/core';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
const {BarcodeScanner} = Plugins

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  async startScan(){
    const { BarcodeScanner } = Plugins;
  
    // BarcodeScanner.hideBackground(); // make background of WebView transparent
  
    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
  
    console.log('result', result);
    
    // if the result has content
    // if (result.hasContent) {
    //   console.log(result.content); // log the raw scanned content
    // }
  };

  constructor(
  ) {
    
  }

  

}
