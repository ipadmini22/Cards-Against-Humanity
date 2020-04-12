import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public user;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Register',
      url: '/register',
      icon: 'pencil'
    },
    {
      title: 'Login',
      url: '/register/login',
      icon: 'log-in'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'hammer'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afa: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.afa.authState.subscribe(s => {
      this.user = s;
      if (this.user) {
        this.appPages = [
          {
            title: 'Home',
            url: '/home',
            icon: 'home-sharp'
          },
          {
            title: 'Game',
            url: '/game',
            icon: 'game-controller'
          },
          {
            title: 'Friends',
            url: '/friends',
            icon: 'people'
          },
          {
            title: 'Black-Cards',
            url: '/black-cards',
            icon: 'document'
          },
          {
            title: 'White-Cards',
            url: '/white-cards',
            icon: 'document-outline'
          },
          {
            title: 'Settings',
            url: '/settings',
            icon: 'hammer-sharp'
          }
        ];
      } else {
        this.appPages = [
          {
            title: 'Home',
            url: '/home',
            icon: 'home-sharp'
          },
          {
            title: 'Register',
            url: '/register',
            icon: 'pencil-sharp'
          },
          {
            title: 'Login',
            url: '/register/login',
            icon: 'log-in-sharp'
          },
          {
            title: 'Settings',
            url: '/settings',
            icon: 'hammer-sharp'
          }
        ];
      }
      // console.dir(s);
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('/')[1];
    console.log(path);
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
