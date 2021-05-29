import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Plugins} from '@capacitor/core'
import { v4 as uuid } from 'uuid';
import { AddSocialPage } from '../add-social/add-social.page';
import { StorageService } from '../service/storage.service';

const {Storage} = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  allSocials: any = []

  constructor(
    public modalCtrl: ModalController ,
    public storageService: StorageService
  ) {
    // this.getSocials()
  }

  ngOnInit(){}

  ionViewWillEnter() {
    this.getSocials()
}

   //load
   async getSocials(){
     this.allSocials = await this.storageService.getAllSocials() 
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

  async deleteSocial(key){    
    await this.storageService.deleteSocial(key);

    this.getSocials()
  }
  async editSocial(){
    console.log('edit social');
    
    
  }
}
