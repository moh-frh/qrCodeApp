import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-social',
  templateUrl: './add-social.page.html',
  styleUrls: ['./add-social.page.scss'],
})
export class AddSocialPage implements OnInit {

  socialName;

  constructor(
    public modalController: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    ) {
    }


  ngOnInit() {}

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
