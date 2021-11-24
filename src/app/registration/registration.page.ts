import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserCrudService } from '../services/user-crud.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  user: User;
  registerForm = this.formBuilder.group({
    email:'',
    password:'',
    firstName:'',
    lastName:'',
    address:'',
    dob: new Date(),
    gender: '',
  });
  constructor(private formBuilder: FormBuilder, private userService: UserCrudService,private router: Router) { }

  ngOnInit() {
  }
  onSubmit(){
    this.user={
      intUserId: null,
      strFirstName: this.registerForm.value.firstName,
      strLastName: this.registerForm.value.lastName,
      strAddress: this.registerForm.value.address,
      dtmDateOfBirth: this.registerForm.value.dob,
      strEmailAddress: this.registerForm.value.email,
      strGender: this.registerForm.value.gender,
      strPassword: this.registerForm.value.password,
    };
    this.userService.register(this.user).subscribe(res=>{
      console.log(res);
      console.log(res.user);
      if(res.user){
        //success
        console.log('yay');
        this.registerForm.reset();
        sessionStorage.setItem('user', JSON.stringify(res.user));
      }else{
        console.error('Idk man');
      }
      this.router.navigateByUrl('/tabs');
    });
  }
}
