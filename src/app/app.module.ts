import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { QRScanner } from '@ionic-native/qr-scanner/ngx';

// import { IonicStorageModule } from '@ionic/storage';

import { IonicStorageModule } from '@ionic/storage-angular';

// import { Storage } from '@ionic/storage';

import {HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [IonicStorageModule.forRoot(), BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy,
   },
   QRScanner,
   Storage
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
