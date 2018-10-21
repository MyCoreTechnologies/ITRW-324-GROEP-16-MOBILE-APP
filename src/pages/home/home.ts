//This file is used to store all methods and functionality that is used on 
//the Home page of the mobile application.

//Imports that this page requires to operate correctly
import { AlertController } from 'ionic-angular';
import { SubmitService } from '../../posts/app.service';
import { Component } from '@angular/core';
import { NavController, Platform  } from 'ionic-angular';
import { ListPage } from '../list/list';
import { NgForm } from '@angular/forms';
import { LoadingController } from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

//Start of Class: HomePage
export class HomePage {

  ///////////////////////////////////////////////////////////////////////////////
  // Creating variables:
  // entered student login details to send to Webservice = loginData
  // For saving token to session storages = data
  loginData = {};
  data;
  ///////////////////////////////////////////////////////////////////////////////
  
  constructor(public navCtrl: NavController,
              private submitService: SubmitService,
              public alertCtrl: AlertController, 
              public loadingCtrl: LoadingController,
              private platform: Platform) {

  }

  ///////////////////////////////////////////////////////////////////////////////
  // Method for exiting application
  ///////////////////////////////////////////////////////////////////////////////
  onExit(){
    this.platform.exitApp();
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Method for creating a Timout alert if server is not responding
  ///////////////////////////////////////////////////////////////////////////////
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

  ///////////////////////////////////////////////////////////////////////////////
  // Method for creating a Login alert if login details are incorrect
  ///////////////////////////////////////////////////////////////////////////////
  loginAlert(){
    const loginAlert = this.alertCtrl.create({
      title: `Can't Login!`,
      subTitle: `Student Number/Password do not match.`,
      cssClass: 'loginAlert',
      buttons: ['OK']
      });
      loginAlert.present();
      console.log('Invalid login details.')
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Login method
  // POST method for sending login details of student to web service.
  // Data send: Student Number
  //            Password
  // Data Received: Successful - Token
  //                Unsuccessful - Not found
  ///////////////////////////////////////////////////////////////////////////////
  postSignIn(form: NgForm ) {
    console.log(form.value);

    // Created constant variable for loading screen
    const load = this.loadingCtrl.create({
      content: 'Signing In...'
    })

    // Displays login screen
    load.present();

    // Calls Timeout alert when Token is not received before 15 sec
    // and closes loading screen
    setTimeout(() => { 
      if(sessionStorage.length < 1){
      load.dismiss();
      this.timeOut();
      } else {
      load.dismiss();
      }
    }, 15000);
    
    // Login details is received
    // and sends the details to the web service
    this.submitService.postloginData(form.value)
    .subscribe(response => {
      console.log(form.value);
      //Prints the token that is received from web service
      console.log(response);
      load.dismiss();
      
      // If the student did not receive a token
      // the student will then receive a token and
      // proceed to the next page.
      if(sessionStorage.length < 1){
        //@ts-ignore
        this.data=response.body;
        sessionStorage.setItem('data', this.data);
        this.navCtrl.push(ListPage);

      // if there is a token already assigned the token
      // will be cleared and the new one will be saved
      // and the student will proceed to the next page
      }else{
        sessionStorage.clear();
        //@ts-ignore
        this.data=response.body;
        sessionStorage.setItem('data', this.data);
        this.navCtrl.push(ListPage);
      }
    },
      // Error message in log and displays login alert
      (error) => {console.log('Problem accuired during login.');
                  load.dismiss(); this.loginAlert()});
  } 
  
  ///////////////////////////////////////////////////////////////////////////////
  // Create a method for displaying a help message.
  ///////////////////////////////////////////////////////////////////////////////
  showHelpAlert() {
    const helpAlert = this.alertCtrl.create({
      title: 'Help',
      subTitle: `Can't sign in? Register on the Selit Website or contact Support.`,
      buttons: ['OK']
    });
    helpAlert.present();
  }
}
