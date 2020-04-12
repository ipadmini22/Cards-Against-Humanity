import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { isUndefined } from 'util';
import { StorageService } from './storage.service';
import { StorageKeys } from 'src/assets/classes/StorageKeys';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private toastController: ToastController, private storage: StorageService, private db: DatabaseService) { }

  async showBasicToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  public formatCardTextToHTML(text: string, ingame: boolean = false): string {
    if (isUndefined(text)) {
      return '';
    }

    if (!ingame) {
      return text.replace('___', '<span class="placeholder">______</span>');
    } else {
      const temp = text.split('___');
      text = '';
      for (let i = 0; i < temp.length - 1; i++) {
        text += temp[i] + '<span class="placeholder" data-ng-click="clickedBlackCardContent()">______</span>';
      }
      text += temp[temp.length - 1];
      console.log(text);
      return text;
    }
  }

  public async GetNickname(): Promise<string> {
    const curr: string = await this.storage.get(StorageKeys.USER_NICKNAME);
    if (curr != null) {
      return curr;
    }
    const id: string = await this.storage.get(StorageKeys.USER_ID);
    return await this.db.GetNickname(id);
  }

  public async GetUserId(): Promise<string> {
    const id: string = await this.storage.get(StorageKeys.USER_ID);
    return id;
  }
}
