import { InterceptorService } from './../posts/app.interceptor';
import { HttpClientModule} from '@angular/common/http';
import { SubmitService } from './../posts/app.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MybookPage } from '../pages/mybook/mybook';
import { AddbookPage } from './../pages/addbook/addbook';
import { BooklistPage } from './../pages/booklist/booklist';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MybookPage,
    BooklistPage,
    AddbookPage
  ],
  imports: [
    BrowserModule,
    NgxDatatableModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MybookPage,
    BooklistPage,
    AddbookPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SubmitService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: InterceptorService, 
      multi: true
    }
  ]
})
export class AppModule {}
