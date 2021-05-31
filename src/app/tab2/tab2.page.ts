import { Component, ElementRef, ViewChild } from '@angular/core';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController, ToastController, LoadingController, Platform } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
import jsQR from 'jsqr';
import { ThrowStmt } from '@angular/compiler';
const {BarcodeScanner} = Plugins

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  scanActive = false;
  scanResult = null;

  arrayOfObjects: any[];

  @ViewChild('video', {static: false}) video: ElementRef;
  @ViewChild('canvas', {static: false}) canvas: ElementRef;
  loading: HTMLIonLoadingElement

  videoElement: any;
  canvasElement: any;
  canvasContext: any;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private plt: Platform
  ) {
    const isInStandaloneMode = () => 
    'standalone' in window.navigator && window.navigator['standalone']
    
    if(this.plt.is('ios') && isInStandaloneMode()){
      console.log('im ios pwa');
      
    }
  }

  ngAfterViewInit(){
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  async startScan(){
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true);
    this.videoElement.play();

    this.loading = await this.loadingCtrl.create({})
    await this.loading.present()
    requestAnimationFrame(this.scan.bind(this))
  };

  async scan(){
    if(this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA)
    {
      if(this.loading){
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true
      }

      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      )

      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height,
      )

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      })

      // console.log('code: ', code);

      if(code){
        this.scanActive = false;
        this.scanResult = code.data;

        this.arrayOfObjects = JSON.parse(this.scanResult);

        // this.arrayOfObjects.map(
        //   e => this.showQrToast("value"),this.showQrToast("value")
        //   )
        
        
      }else{
        if(this.scanActive){
          requestAnimationFrame(this.scan.bind(this))
        }
      }
      

    }else{
      requestAnimationFrame(this.scan.bind(this))
    }

  }

  stopScan(){
    this.scanActive = false
  };
  reset(){
    this.scanActive = false
  };

  async showQrToast(value){
    const toast = await this.toastCtrl.create({
      message: `open ${value}?`,
      position: 'top',
      buttons: [{
        text: 'Open',
        handler: () => {
          window.open(this.scanResult, '_system', 'location=yes')
        }
      }]
    })
    toast.present()
  }

  navigateToSocial(url){
    window.open(url, '_system', 'location=yes')
    
  }
  

  

}
