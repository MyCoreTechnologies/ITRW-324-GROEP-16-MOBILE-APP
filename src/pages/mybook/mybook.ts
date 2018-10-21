//This file is used to store all methods and functionality that is used on 
//the MyBook page of the mobile application.

//Imports that this page requires to operate correctly
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddbookPage } from '../addbook/addbook';
import { AlertController } from 'ionic-angular';
import { SubmitService } from '../../posts/app.service';


@IonicPage()
@Component({
  selector: 'page-mybook',
  templateUrl: 'mybook.html',
})

export class MybookPage {

  ///////////////////////////////////////////////////////////////////////////////
  // Create Variable:
  // for book list received from the web service = books
  books;
  ///////////////////////////////////////////////////////////////////////////////

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController, 
              private submitService: SubmitService) {
              this.getMyBookList()
  }
  ///////////////////////////////////////////////////////////////////////////////
  // Method for displaying if page is loaded
  /////////////////////////////////////////////////////////////////////////////// 
  ionViewDidLoad() {
    console.log('ionViewDidLoad MybookPage');
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Method for going to AddBookPage
  ///////////////////////////////////////////////////////////////////////////////
  onToGoAdd(){
    this.navCtrl.push(AddbookPage);
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Method for displaying a prompt to enter book number to remove book.
  ///////////////////////////////////////////////////////////////////////////////
  showRemovePrompt(){
    // Constant variable for prompt alert with all information
    const prompt = this.alertCtrl.create({
          title: 'Remove',
          message: "Enter the BOOK NUMBER of the book you want to remove from your profile.",
          inputs: [{
          name: 'book_number',
          type: "number",
          placeholder: 'E.g. 35'
          },],
      //Two buttons with two funtions
      buttons: 
      [
        {
          // Cancel button: When pressed, just close window
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          // Remove button: When pressed run the postRemoveBook Method
          // with the entered data.
          text: 'Remove',
          handler: data => {
            console.log('Removed clicked');
            this.postRemoveBook(data);
          }
        }
      ]
    });
    prompt.present();
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Method for removing the present page; going to the previous page.
  ///////////////////////////////////////////////////////////////////////////////
  onGoToMenu(){
     this.navCtrl.pop();
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Alert Method for displaying the help alert message for myBooks.
  ///////////////////////////////////////////////////////////////////////////////
  showHelpAlert() {
    const helpAlert = this.alertCtrl.create({
      title: 'Help',
      subTitle: `These are the books that belong to you. You can add or remove books from your profile.`,
      buttons: ['OK']
    });
    helpAlert.present();
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Alert method for displaying a message if book number is invalid
  ///////////////////////////////////////////////////////////////////////////////
  showInvalidAlert() {
    const invalidAlert = this.alertCtrl.create({
      title: 'Wrong',
      subTitle: `Number entered is invalid.`,
      buttons: ['OK']
    });
    invalidAlert.present();
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Removing book method
  // POST method to remove a book with the matching book number.
  // Data send: Book number
  // Data received: Successful or Unsuccessful
  ///////////////////////////////////////////////////////////////////////////////
  postRemoveBook(data) {
    console.log(data);

    // Request is send to web service with the book number entered by the student.
    this.submitService.postDeleteBookData(data)

    // Web service gets the request and removes the book
    .subscribe(response => {
      console.log(response);

    },
      (error) => {console.log('Problem accuired during book remove.');
                  this.showInvalidAlert()});
    } 

  ///////////////////////////////////////////////////////////////////////////////  
  // Displaying user books method
  // Get method for getting the MyBook list and displays the list.
  // Data send: Valid Token
  // Data received: Book information
  ///////////////////////////////////////////////////////////////////////////////
  getMyBookList(){

    //Request is send to web service
    this.submitService.getMyBookData()

    // Service sends the book list
    .subscribe(response => {
      console.log(response);

      // Takes the reponse from webservice and adds them to the books variable
      this.books = response;

    },
    (error) => console.log('Problem accuired during book retrieval.'));
  }  

}