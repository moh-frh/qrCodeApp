// import { Item, StorageService } from './../service/storage.service';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import { AddSocialPage } from '../add-social/add-social.page';
// import { StorageService } from '../service/storage.service';
import {Plugins} from '@capacitor/core'
import { v4 as uuid } from 'uuid';
import { AddSocialPage } from '../add-social/add-social.page';

const {Storage} = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  // newItem: Item = <Item>{};
  // listItems: Item[]

  constructor(
    public modalCtrl: ModalController ,
    // private storage: StorageService
  ) {
    
  }

  //create
  // async addItem2(item){
  //   await this.storage.set('name', 'Mr. Ionitron');
  // }
  async addItem(){
    const item = JSON.stringify([
      {
        id: uuid(),
        name: 'mohamed',
        social: 'facebook'
      },
      {
        id: uuid(),
        name: 'fouaz',
        social: 'youtube'
      },
      {
        id: uuid(),
        name: 'ferhi',
        social: 'instgram'
      },
  ])

  await Storage.set({
    key: 'products',
    value: item
  })
  }

  // async getItems(){
  //   const name = await this.storage.get('name');
  //   console.log(name);
  // }

   //load
   loadIem(){
    // this.storageService.getItem().then(item => {
    //   console.log(item);
    // })
   }

  async addSocial(name) {
    const modal = await this.modalCtrl.create({
      component: AddSocialPage,
      componentProps: { 
        socialName: name,
      },
      animated: true,
      mode: 'ios',
      backdropDismiss: true,
      cssClass: 'add-social-modal',
    });

    return await modal.present();
  }

  
   

   

}
