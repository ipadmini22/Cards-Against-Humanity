import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { IonicStorageModule } from '@ionic/storage';
import { environment } from '../environments/environment';
import { AddPage } from './black-cards/add/add.page';
import { AddPage as AddPageWhite } from './white-cards/add/add.page';
import { EditPage } from './black-cards/edit/edit.page';
import { EditPage as EditPageWhite } from './white-cards/edit/edit.page';
import { CreatePage } from './game/create/create.page';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, AddPage, AddPageWhite, EditPage, EditPageWhite, CreatePage],
  entryComponents: [AddPage, AddPageWhite, EditPage, EditPageWhite, CreatePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    IonicStorageModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuthModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
   // { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
