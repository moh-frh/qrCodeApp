import { Component, OnDestroy } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../service/storage.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnDestroy {

  image = 'https://idraksy.net/wp-content/uploads/2020/04/placeholder.png';
  imagePath: string;
  upload: any;

  isPhotoImported: boolean;

  width: number;
  isNormalSize: boolean;
  isBlur = true;
  allSocials: any;
  allSocialsStringified: any = [];
  d: any[];
  qrcodeData: string = '';
  
  blur: string = 'blur(4px)'
  toggleButton: string;
  
  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(private storageService: StorageService, private camera: Camera) {
    this.width = 200
    this.toggleButton = 'show'
    
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
  
  async ngOnInit() {
    this.isNormalSize = true
    this.isPhotoImported = false
  }

  toggleBlur(){
    this.isBlur = !this.isBlur

    this.isBlur ? this.toggleButton = 'Show' : this.toggleButton = 'Hide' 
  }

  expandQrCode()
  {
    this.width = 280
    this.isNormalSize = false
  }
  contractQrCode()
  {
    this.width = 200
    this.isNormalSize = true
  }

  async addPhoto() {
      const libraryImage = await this.openLibrary();
      this.image = 'data:image/jpg;base64,' + libraryImage;

      this.isPhotoImported = true
  }

  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };
    
    return await this.camera.getPicture(options);
  }



  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
