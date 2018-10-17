// mybook.ts Methods

// Imports for mybook.ts
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

  //=============================================================================
  // Create Variable:
  // for book list received from the web service = books
  books;
  //=============================================================================

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController, 
              private submitService: SubmitService) {
              this.getMyBookList()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MybookPage');
  }

  //=============================================================================
  // Method for going to AddBookPage
  //=============================================================================
  onToGoAdd(){
    this.navCtrl.push(AddbookPage);
  }

  //=============================================================================
  //Method for displaying a remove prompt
  //=============================================================================
  showRemovePrompt(){
    // Constant variable for prompt alert with all information
    const prompt = this.alertCtrl.create({
          title: 'Remove',
          message: "Enter the NUMBER of the book that you want to remove.",
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

  //=============================================================================
  // Method for removing the present page; going to the previous page.
  //=============================================================================
  onGoToMenu(){
     this.navCtrl.pop();
  }

  //=============================================================================
  // Method for displaying the help alert message.
  //=============================================================================
  showHelpAlert() {
    const helpAlert = this.alertCtrl.create({
      title: 'Help!',
      subTitle: `This is a list of all your books, you can add more or remove books.`,
      buttons: ['OK']
    });
    helpAlert.present();
  }

  //=============================================================================
  // Alert method for displaying a invalid details error.
  //=============================================================================
  showInvalidAlert() {
    const invalidAlert = this.alertCtrl.create({
      title: 'Wrong!',
      subTitle: `Number entered is invalid.`,
      buttons: ['OK']
    });
    invalidAlert.present();
  }

  //=============================================================================
  // POST method to remove a book with the matching book number.
  //=============================================================================
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

  //=============================================================================  
  // get method for getting the MyBook list and displays the list.
  //=============================================================================
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