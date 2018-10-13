import { AlertController } from 'ionic-angular';
import { SubmitService } from '../../posts/app.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { NgForm } from '@angular/forms';
import { LoadingController } from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loginData = {};
  data;

  constructor(public navCtrl: NavController, private submitService: SubmitService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

  }

  timeOut(){
    const timeOutAlert = this.alertCtrl.create({
        title: 'Timed Out!',
        subTitle: `Could not sign in, please try again later.`,
        cssClass: 'customAlert',
        buttons: ['OK']
      });
      timeOutAlert.present();
      console.log('Server not responding.')
  }

  postSignIn(form: NgForm ) {
    console.log(form.value);
    const load = this.loadingCtrl.create({
      content: 'Signing In...'
    })

    load.present();
    setTimeout(() => {
      if(sessionStorage.length < 1){
      load.dismiss();
      this.timeOut();
      }
    }, 15000);
    
    this.submitService.postloginData(form.value)
    .subscribe(response => {
      console.log(form.value);
      console.log(response);
      load.dismiss();
      
      if(sessionStorage.length < 1){
        //@ts-ignore
        this.data=response.body;
        sessionStorage.setItem('data', this.data);
        this.navCtrl.push(ListPage);
      }else{
        sessionStorage.clear();
        //@ts-ignore
        this.data=response.body;
        sessionStorage.setItem('data', this.data);
        this.navCtrl.push(ListPage);
      }
    },
      (error) => console.log('Problem accuired during login.'));
    } 

    showHelpAlert() {
      const helpAlert = this.alertCtrl.create({
        title: 'Help!',
        subTitle: `Can't sign in? Register on our Website or contact Support.`,
        buttons: ['OK']
      });
      helpAlert.present();
    }
}
