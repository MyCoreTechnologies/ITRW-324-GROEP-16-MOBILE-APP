import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SubmitService {

  constructor(private httpclient: HttpClient) {
  }

  postloginData(value) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpclient.post('http://192.168.8.104:3000/student/login', value, {headers:header})
  }

  postBookData(value) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    header.append('authentication', 'getToken()' );
    return this.httpclient.post('http://192.168.8.104:3000/book/addBook', value, {headers:header})
  }

  getToken() {
    return sessionStorage.getItem('data');
  }
}