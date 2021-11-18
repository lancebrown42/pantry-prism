import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserCrudService } from '../services/user-crud.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User;
  constructor(private formBuilder: FormBuilder, private userService: UserCrudService,private router: Router) { }

  ngOnInit() {
  }
  onSubmit(){
    this.user={
      intUserId: -1,
      strFirstName: 'PLACEHOLDER',
      strLastName: 'PLACEHOLDER',
      strAddress: 'PLACEHOLDER',
      dtmDateOfBirth: new Date(),
      strEmailAddress: 'PLACEHOLDER',
      strGender: 'PLACEHOLDER',
      strPassword: 'PLACEHOLDER',
    };
    sessionStorage.setItem('user', JSON.stringify(this.user));
    this.router.navigateByUrl('/home');
  }

}
