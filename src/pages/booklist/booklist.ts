//booklist.ts Methods

//Imports for booklist.ts
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SubmitService } from '../../posts/app.service';

@IonicPage()
@Component({
  selector: 'page-booklist',
  templateUrl: 'booklist.html',
})

export class BooklistPage {

  //=============================================================================
  // Create Variables:
  // Filter popup open or not = filterRadioOpen
  // The option chosen in the filter popup = filterRadioResult
  // for book list received from the web service = books
  filterRadioOpen: boolean;
  filterRadioResult;
  books;

  // The result choosen at type filter
  // Advertisement = adData
  // Request = reqData
  adData = `{"book_type": "Advertisement"}`;
  reqData = `{"book_type": "Request"}`;
  //=============================================================================

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController, 
              private submitService: SubmitService) {
              this.getBookList();

  }

  ionViewDidLoad() : void{
    console.log('ionViewDidLoad BooklistPage');
  }

  //=============================================================================
  // Method to remove present page; going back to the previous page.
  //=============================================================================
  onGoToMenu(){
    this.navCtrl.pop();
  }

  //=============================================================================
  // Method to show Help alert
  //=============================================================================
  showInvalidSubAlert() {
    const invalidAlert = this.alertCtrl.create({
      title: 'Wrong',
      subTitle: `Subject entered is invalid.`,
      buttons: ['OK']
    });
    invalidAlert.present();
  }

  //=============================================================================
  // Method to show Help alert
  //=============================================================================
  showInvalidPriceAlert() {
    const invalidAlert = this.alertCtrl.create({
      title: 'Wrong',
      subTitle: `Price entered is invalid.`,
      buttons: ['OK']
    });
    invalidAlert.present();
  }

  
  //=============================================================================
  // Method to show Help alert
  //=============================================================================
  showHelpAlert() {
    const helpAlert = this.alertCtrl.create({
      title: 'Help',
      subTitle: `This is a list of all available books on the system. From here you can filter books according to Type, Subject and Price.`,
      buttons: ['OK']
    });
    helpAlert.present();
  }


  //=============================================================================
  // Method to pop up a filter alert
  //=============================================================================
  showFilter(){
    let alertFilter = this.alertCtrl.create();
    alertFilter.setTitle('Select a filter');

    //Filter option Type
    alertFilter.addInput({
      type: 'radio',
      label: 'Type',
      value: 'type',
      checked: false
    });

    //Filter option Subject
    alertFilter.addInput({
      type: 'radio',
      label: 'Subject code',
      value: 'code',
      checked: false
    });

    //Filter option price
    alertFilter.addInput({
      type: 'radio',
      label: 'Price',
      value: 'price',
      checked: false
    });

    // Cancel button will close filter popup
    alertFilter.addButton('Cancel');

    // Ok button will confirm the option selected and value is saved
    alertFilter.addButton({
      text: 'OK',
      // Popup will close and value is saved
      handler: filterData => {
        this.filterRadioOpen = false;
        this.filterRadioResult = filterData;

        // Value of selected option will determine which method is called
        if(filterData === 'type'){
          this.showFilterType();
        } else if(filterData === 'code') {
          this.showFilterSubjectPrompt();
        } else if(filterData === 'price') {
          this.showFilterPricePrompt();
        }

      }
    });
      // Filter popup will show
      alertFilter.present().then(() => {
      this.filterRadioOpen = true;
    });
  }

  //=============================================================================
  // Method for running a Type alert
  //=============================================================================
  showFilterType(){
    const confirmType = this.alertCtrl.create({
      title: "Type Filter",
      message: "Select to view Advertisements or Requests.",
      buttons: [
      {
        // Advertisement Button with value = Advertisement
        text: "Advertisements",
          handler: data => {
            console.log('Advertisement clicked');
            // Value saved and send with the postFilterTypeBook method.
            this.postFilterTypeBook(this.adData);
      }
      },
      {
        // Request Button with value = Request
        text: 'Requests',
          handler: data => {
            console.log('Request clicked');
             // Value saved and send with the postFilterTypeBook method.
            this.postFilterTypeBook(this.reqData);
      }
      }
      ]
    });
    // Filter alert will show.
    confirmType.present();
  }

  //=============================================================================
  // Method for running a Subject alert
  //=============================================================================
  showFilterSubjectPrompt(){
    const filterSprompt = this.alertCtrl.create({
          title: 'Subject Filter',
          message: "Enter the SUBJECT CODE for the textbook you are searching for.",
          inputs: [{
          name: 'subject_code',
          placeholder: 'E.g. ITRW324'
        },],
      buttons: 
      [
        {
          // Cancel button will close the alert
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          // Apply button will save the entered value and send with postFilterSubjectBook method
          text: 'Apply',
          handler: data => {
            console.log('Apply clicked');
            this.postFilterSubjectBook(data);
          }
        }
      ]
    });
    // Alert will show
    filterSprompt.present();
  }

  //=============================================================================
  // Method for running a Price alert
  //=============================================================================
  showFilterPricePrompt(){
    const filterPprompt = this.alertCtrl.create({
          title: 'Price Filter',
          message: "Enter the maximum PRICE of the book that you are searching for.",
          inputs: [{
          name: 'book_price',
          type: 'number',
          placeholder: 'E.g. 350'
        },],
      buttons: 
      [
        {
          // Cancel button will close the alert
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          // Apply button will save the entered value and send with postFilterPriceBook method
          text: 'Apply',
          handler: data => {
            console.log('Apply clicked');
            this.postFilterPriceBook(data);
          }
        }
      ]
    });
    filterPprompt.present();
  }

  //=============================================================================
  // POST method to filter the types of book list
  //=============================================================================
  postFilterTypeBook(data) {
    console.log(data);
    // request send to web service
    this.submitService.postFilterTypeData(data)

    // Web page send the filterd booklist based on the type value
    .subscribe(response => {
      console.log(response);

      // Takes the reponse from webservice and adds them to the books variable
      this.books = response;

    },
      (error) => console.log('Problem accuired during type filter.'));
    } 

  //=============================================================================
  // POST method to filter the subject of book list
  //=============================================================================
  postFilterSubjectBook(data) {
    console.log(data);
    // request send to web service
    this.submitService.postFilterSubjectData(data)

    // Web page send the filterd booklist based on the subject value
    .subscribe(response => {
      console.log(response);

      // Takes the reponse from webservice and adds them to the books variable
      this.books = response;
    },
      (error) => {console.log('Problem accuired during subject filter.');
                  this.showInvalidSubAlert()});
    } 

  //=============================================================================  
  // POST method to filter the price of book list  
  //=============================================================================
  postFilterPriceBook(data) {
    console.log(data);
    // request send to web service
    this.submitService.postFilterPriceData(data)

    // Web page send the filterd booklist based on the price value
    .subscribe(response => {
      console.log(response);

      // Takes the reponse from webservice and adds them to the books variable
      this.books = response;
    },
      (error) => {console.log('Problem accuired during price fiter.');
                  this.showInvalidPriceAlert()});
  }
  
  //=============================================================================
  // Get method to get list from the web service.
  //=============================================================================
  getBookList(){
    //request send to web service.
    this.submitService.getBookListData()

    //Web service sends book list back to user.
    .subscribe(
    (response) => {
      console.log(response);

      // Takes the reponse from webservice and adds them to the books variable
      this.books = response;
    },
    (error) => console.log('Problem accuired during book retrieval.'));
  }

}

