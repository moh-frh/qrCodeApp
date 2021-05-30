import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage-angular';
import { Plugins } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  allSocialsArray: any[];
  onStorageChanged: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    this.init();
  }

  async init() {
    // If using a custom driver:
    this.getAllSocials();
  }

  async addSocial(key, value) {
    await Storage.set({ key: key, value: value });
    this.getAllSocials();
  }

  async deleteSocial(key) {
    console.log(key);
    await Storage.remove({ key: key });
    this.getAllSocials();
  }
  updateSocial() {
    console.log('update item');
  }
  async getAllSocials() {
    const socials: any = [];
    const { keys } = await Storage.keys();
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const { value } = await Storage.get({ key: key });
      socials.push({ key: key, value: value });
    }
    this.onStorageChanged.next(socials);
  }
}
