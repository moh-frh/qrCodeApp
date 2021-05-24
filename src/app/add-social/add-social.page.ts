import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController, NavController } from '@ionic/angular';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-add-social',
  templateUrl: './add-social.page.html',
  styleUrls: ['./add-social.page.scss'],
})
export class AddSocialPage implements OnInit {

  socialName;
  social;

  constructor(
    public modalController: ModalController,
    private toastCtrl: ToastController,
    public storageService: StorageService
    ) {
      this.storageService.getAllSocials()
    }

  ngOnInit() {}

  async addSocial(key, value){
    await this.storageService.addSocial(key, value)

    this.storageService.getAllSocials()
    console.log('added social');

    this.dismiss()
  }

  async dismiss() {
    return await this.modalController.dismiss();
  }

  async handleButtonClick(msg) {
    const toast = this.toastCtrl.create({
      color: 'success',
      duration: 2000,
      message: msg,
    });

    await (await toast).present();
  }

  // formValidation() {
  //   if (!this.game.name) {
  //     // show toast message
  //     this.showToast('Enter name');
  //     return false;
  //   }

  //   if (!this.game.console) {
  //     // show toast message
  //     this.showToast('Enter console');
  //     return false;
  //   }

  //   return true;
  // }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message,
        duration: 3000
      })
      .then(toastData => toastData.present());
  }
}
