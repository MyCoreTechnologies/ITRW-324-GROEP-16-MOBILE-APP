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
  constructor(public navCtrl: NavController, private submitService: SubmitService) {

  }

  postSignIn(form: NgForm ) {
    console.log(form.value);
    this.submitService.postloginData(form.value)
    .subscribe(response => {
      console.log(response);
      if(sessionStorage.length < 0){
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
}
