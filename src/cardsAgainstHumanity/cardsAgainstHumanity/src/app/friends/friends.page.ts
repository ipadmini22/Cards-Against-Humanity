import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FunctionsService } from '../services/functions.service';
import { DatabaseService } from '../services/database.service';
import { Friend } from 'src/assets/classes/friend';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  friends: Friend[];

  constructor(private alertCtrl: AlertController, private func: FunctionsService, private db: DatabaseService) { }

  async ngOnInit() {
    this.db.GetFriends(await this.func.GetUserId()).then(c => {
      this.friends = c;
    });
  }

  async addFriend() {
    const alert = await this.alertCtrl.create({
      header: 'Please enter your friends nickname.',
      inputs: [
        {
          name: 'nickname',
          type: 'text',
          placeholder: 'Nickname'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Add',
          handler: async (data) => {
            if (this.friends.some(v => v.friendName === data.nickname)) {
              this.func.showBasicToast('Friend is already in your list.');
            } else {
              this.db.AddFriend(data.nickname, await this.func.GetUserId(), await this.func.GetNickname()).then(r => {
                if (r) {
                  this.func.showBasicToast('Successfully Added Friend!');
                } else {
                  this.func.showBasicToast('Error finding user!');
                }
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async doRefresh(event) {
    this.db.GetFriends(await this.func.GetUserId()).then(c => {
      this.friends = c;
      event.target.complete();
    });
  }

}
