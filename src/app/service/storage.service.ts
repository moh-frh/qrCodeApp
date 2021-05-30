import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})


export class StorageService {

  allSocialsArray: any[];

  constructor(private storage: Storage) {
    this.init()
  }

  async init() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  async addSocial(key, value){
    await this.storage.set(key, value);
  }

  async deleteSocial(key){
    console.log(key);
    
    await this.storage.remove(key);
  }
  updateSocial(){
    console.log('update item');
  }
  async getAllSocials(){

    const socials: any = []

    this.storage.forEach((key, value, index) => {
      // console.log(key, '---', value);
      socials.push({'key': key, 'value': value})
    });
    return socials
  }
}
