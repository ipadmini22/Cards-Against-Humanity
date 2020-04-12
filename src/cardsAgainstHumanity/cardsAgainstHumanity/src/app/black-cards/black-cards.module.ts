import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlackCardsPageRoutingModule } from './black-cards-routing.module';

import { BlackCardsPage } from './black-cards.page';
import { AddPage } from './add/add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlackCardsPageRoutingModule
  ],
  declarations: [BlackCardsPage]
})
export class BlackCardsPageModule {}
