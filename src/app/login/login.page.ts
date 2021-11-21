import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserCrudService } from '../services/user-crud.service';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User;
  loginForm = this.formBuilder.group({
    email:new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    password:new FormControl('', Validators.required),
  });
  wrongCreds = false;
  loginErr = false;
  errorContent: string;
  passFocused= false;
  // fieldsComplete=false;
  emailFilled=false;
  passFilled=false;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  validation_messages={
    email:[
      {type: 'required', message: 'Email is required.'},
      {type: 'pattern', message: 'Invalid email.'}
    ],
    password:[
      {type: 'required', message: 'Password is required.'}
    ],
  };


  constructor(private formBuilder: FormBuilder, private userService: UserCrudService,private router: Router) { }

  ngOnInit() {
  }
  onSubmit(){
    this.wrongCreds = false;
    this.loginErr = false;
    this.userService.getByCredentials(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe(res=>{
      console.log(res);
      if(res.intUserId > 0){
        this.user = res;
      }else{
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
      }
      sessionStorage.setItem('user', JSON.stringify(this.user));
      this.router.navigateByUrl('/home');
    },
    err=>{
      console.log(err);
      console.log(typeof(err));
      console.log(err.status);
      if(err.status.toString() === '403'){
        this.wrongCreds = true;
        this.errorContent = err.error.error;
      }
      else if(err.status.toString() === '500'){
        this.wrongCreds = true;
        this.errorContent = 'Invalid email/password combination';
      }
    });
    }
    checkFocus(el){
      if(el.el.id==='password'){
        this.passFocused = true;
      }
      // console.log(thing);
    }
    checkBlur(el){
      if(el.el.id==='password'){
        this.passFocused = false;
      }
      // console.log(thing);
    }
  }
