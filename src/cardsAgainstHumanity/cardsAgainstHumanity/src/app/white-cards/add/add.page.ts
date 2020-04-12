import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  cardContent: string;
  private currentString: string;
  constructor(private func: FunctionsService, private modalController: ModalController, private db: DatabaseService) { }

  ngOnInit() {
  }

  valueChange(ev) {
    this.cardContent = ev.target.value;
    this.currentString = ev.target.value;
  }

  close() {
    this.modalController.dismiss();
  }

  async save() {
    this.db.AddWhiteCard(this.currentString, await this.func.GetNickname(), await this.func.GetUserId());
    this.modalController.dismiss();
  }

}
