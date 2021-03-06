import { Angular2TokenService } from 'angular2-token';

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  currentUser: any;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private _tokenService: Angular2TokenService,
    private alertCtrl: AlertController
    ) {
      this._tokenService.init({
        apiBase: 'https://ja-cooper-api.herokuapp.com/api/v1'
      });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  loginPopUp() {
    console.log('popup');
    let confirm = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        {
          name: 'password',
          placeholder: 'password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            this.login(data);
          }
        }
      ]
    });
    confirm.present();
  }

  registerPopUp() {
    console.log('register')
    let confirm = this.alertCtrl.create({
      title: 'Register',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        {
          name: 'password',
          placeholder: 'password',
          type: 'password'
        },
        {
          name: 'passwordConfirmation',
          placeholder: 'password confirmation',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Register',
          handler: data => {
            this.register(data);
          }
        }
      ]
    });
    confirm.present();
  }

  updatePopUp() {
    console.log('update')
    let confirm = this.alertCtrl.create({
      title: 'Update',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        {
          name: 'password',
          placeholder: 'new password',
          type: 'password'
        },
        {
          name: 'passwordConfirmation',
          placeholder: 'password confirmation',
          type: 'password'
        },
        {
          name: 'passwordCurrent',
          placeholder: 'current password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {
            this.update(data);
          }
        }
      ]
    });
    confirm.present();
  }

  login(credentials) {
    this._tokenService
      .signIn(credentials)
        .subscribe(
         res => (this.currentUser = res.json().data),
         err => console.error('error')
      );
  }

  logout() {
    this._tokenService
      .signOut()
      .subscribe(res => console.log(res), err => console.error('error'));
    this.currentUser = undefined;
  }

  register(credentials) {
    this._tokenService
      .registerAccount(credentials)
        .subscribe(
          res => (this.currentUser = res.json().data),
          err => console.log('error')
        );
  }

  update(credentials) {
    this._tokenService
      .updatePassword(credentials)
      .subscribe(
        res => (this.currentUser = res.json().data),
        err => console.error('error')
     );
  }
}
