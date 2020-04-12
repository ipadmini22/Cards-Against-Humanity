import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { StorageKeys } from 'src/assets/classes/StorageKeys';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afs: AngularFirestore, private afa: AngularFireAuth, private storage: StorageService) { }

  async register(mail: string, password: string): Promise<boolean> {
    try {
      this.afa.auth.setPersistence('local');
      const res = await this.afa.auth.createUserWithEmailAndPassword(mail, password);
      await this.storage.save(StorageKeys.USER_ID, res.user.uid);
      await this.storage.save(StorageKeys.USER_MAIL, mail);
      return this.storage.save(StorageKeys.USER_REFRESH_TOKEN, res.user.refreshToken).then(() => true);
    } catch (err) {
      console.dir(err);
      return false;
    }
  }

  async login(mail: string, password: string): Promise<boolean> {
    try {
      this.afa.auth.setPersistence('local');
      const res = await this.afa.auth.signInWithEmailAndPassword(mail, password);
      await this.storage.save(StorageKeys.USER_ID, res.user.uid);
      await this.storage.save(StorageKeys.USER_MAIL, mail);
      return this.storage.save(StorageKeys.USER_REFRESH_TOKEN, res.user.refreshToken).then(() => true);
    } catch (err) {
      console.dir(err);
      return false;
    }
  }
}
