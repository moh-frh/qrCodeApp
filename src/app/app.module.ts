import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { QRScanner } from '@ionic-native/qr-scanner/ngx';

import {HttpClientModule} from '@angular/common/http'

import { IonicStorageModule } from '@ionic/storage-angular';
import { QRCodeModule } from 'angularx-qrcode';

import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule, 
            HttpClientModule, 
            IonicStorageModule.forRoot(),
            QRCodeModule,
          ],
  providers: [{ 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy,
   },
   QRScanner,
   Storage,
   Camera,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
