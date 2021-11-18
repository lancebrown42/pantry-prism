import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loggedIn = Boolean(sessionStorage.getItem('user'));
  constructor() { }

  ngOnInit() {
    // console.log(this.loggedIn);
  }
  ionViewDidEnter(){
    this.loggedIn = Boolean(sessionStorage.getItem('user'));
    console.log('viewWillEnter');
    console.log(this.loggedIn);
  }
  logout(){
    console.log('LOGOUT');
    sessionStorage.removeItem('user');
    // console.log(sessionStorage.getItem('user'));
    this.loggedIn = false;
  }

}
