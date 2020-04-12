import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhiteCardsPage } from './white-cards.page';

const routes: Routes = [
  {
    path: '',
    component: WhiteCardsPage
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhiteCardsPageRoutingModule {}
