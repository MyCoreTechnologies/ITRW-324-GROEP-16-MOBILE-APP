import { AlertController } from 'ionic-angular';
import { SubmitService } from '../../posts/app.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loginData = {};
  data;
  constructor(public navCtrl: NavController, private submitService: SubmitService, public alertCtrl: AlertController) {

  }

  postSignIn(form: NgForm ) {
    console.log(form.value);
    this.submitService.postloginData(form.value)
    .subscribe(response => {
      console.log(form.value);
      console.log(response);
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

    onTempList(){
      this.navCtrl.push(ListPage);
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
