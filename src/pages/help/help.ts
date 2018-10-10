import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})
export class HelpPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {}
    // If we navigated to this page, we will have an item available as a nav param

    doHelp() {
      const alert = this.alertCtrl.create({
        title: 'Cant sign in?',
        subTitle: 'To create an account, please register on our website',
        buttons: ['OK']
      });
      alert.present();
    }

}
