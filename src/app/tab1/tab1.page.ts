import { Component, OnDestroy } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../service/storage.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnDestroy {
  allSocials: any;
  allSocialsStringified: any = [];
  d: any[];
  qrcodeData: string = '';

  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(private storageService: StorageService) {
    this.storageService.onStorageChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((socials) => {
        this.allSocials = socials;        
        this.qrcodeData = JSON.stringify(this.allSocials);
        console.log(`qrcodeDate: ${this.qrcodeData}`);
        
      });
    // this.allSocialsStringified = JSON.stringify(this.allSocials)

    // console.log(this.getSocial());
  }

  async ngOnInit() {  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
