import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  @ViewChild('inputString', { static: true }) input;

  @Input() id: string;
  @Input() text: string;

  cardContent: string;
  private currentString: string;
  constructor(private func: FunctionsService, private modalController: ModalController, private db: DatabaseService) { }

  ngOnInit() {
    this.currentString = this.text;
    this.cardContent = this.func.formatCardTextToHTML(this.text);
    this.input.value = this.currentString;
  }

  valueChange(ev) {
    this.cardContent = this.func.formatCardTextToHTML(ev.target.value);
    this.currentString = ev.target.value;
  }

  close() {
    this.modalController.dismiss();
  }

  save() {
    this.db.UpdateBlackCard(this.id, this.currentString);
    this.modalController.dismiss();
  }

}
