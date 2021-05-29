import { Component } from '@angular/core';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    public storageService: StorageService
  ) {}

  synchronizeQrCode(){
    console.log('synch');
    console.log(this.storageService.getAllSocials())
    
  }

}
