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

  allSocials: any;
  allSocialsStringified: any;

  constructor(private storageService: StorageService) {

    //load
    this.allSocials =  "this.getSocial()"

    // this.allSocialsStringified = JSON.stringify(this.allSocials)
    
    console.log('all socials');
    console.log(this.getSocial());
  }

  async getSocial(){
    return await this.storageService.getAllSocials()
  }

}
