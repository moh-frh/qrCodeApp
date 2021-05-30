import { Component, NgZone, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { v4 as uuid } from 'uuid';
import { AddSocialPage } from '../add-social/add-social.page';
import { StorageService } from '../service/storage.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const { Storage } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnDestroy {
  allSocials: any = [];

  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(
    public modalCtrl: ModalController,
    public storageService: StorageService,
    private zone: NgZone
  ) {
    this.storageService.onStorageChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((socials) => {
        this.allSocials = socials;
      });
    // this.getSocials()
  }

  ngOnInit() {}

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
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

    modal.onDidDismiss().then((detail) => {
      if (detail.role === 'added') {
        this.zone.run(() => {
          // this.getSocials();
        });
      }
    });

    return await modal.present();
  }

  async deleteSocial(key) {
    await this.storageService.deleteSocial(key);

    // this.getSocials();
  }
  async editSocial() {
    console.log('edit social');
  }
}
