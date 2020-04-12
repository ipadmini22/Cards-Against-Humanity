import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhiteCardsPageRoutingModule } from './white-cards-routing.module';

import { WhiteCardsPage } from './white-cards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhiteCardsPageRoutingModule
  ],
  declarations: [WhiteCardsPage]
})
export class WhiteCardsPageModule {}
