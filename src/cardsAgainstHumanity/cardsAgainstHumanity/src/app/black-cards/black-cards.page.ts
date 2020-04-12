import { Component, OnInit } from '@angular/core';
import { Card } from 'src/assets/classes/card';
import { DatabaseService } from '../services/database.service';
import { ModalController } from '@ionic/angular';
import { AddPage } from './add/add.page';
import { EditPage } from './edit/edit.page';

@Component({
  selector: 'app-black-cards',
  templateUrl: './black-cards.page.html',
  styleUrls: ['./black-cards.page.scss'],
})
export class BlackCardsPage implements OnInit {

  cards: Card[];

  constructor(private db: DatabaseService, private modalController: ModalController) { }

  ngOnInit() {
    this.db.GetBlackCards().then(c => {
      this.cards = c;
    });
  }

  async add() {
    const modal = await this.modalController.create({
      component: AddPage
    });
    return await modal.present();
  }

  async editCard(c) {
    const modal = await this.modalController.create({
      component: EditPage,
      componentProps: {
        id: c.id,
        text: c.text
      }
    });
    return await modal.present();
  }


  doRefresh(event) {
    this.db.GetBlackCards().then(c => {
      this.cards = c;
      event.target.complete();
    });
  }
}
