import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  allSocials: any = []


  constructor(
    public modalController: ModalController,
    private toastCtrl: ToastController,
    public storageService: StorageService,
    private router: Router
    ) {
      // this.storageService.getAllSocials()
    this.getSocials()
    }

  ngOnInit() {}

  // ngOnChanges(){
  //   this.getSocials()
  // }

  //load
  async getSocials(){
    this.allSocials = await this.storageService.getAllSocials() 
  }

  async addSocial(key, value){
    await this.storageService.addSocial(key, value)

    this.dismiss()
    this.getSocials()

    this.router.navigate(['tabs/tab3'])
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
