import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupObj:any={
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
  }
  validationError:any={};

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  signup(){
    let userObject:any={
      name:this.signupObj.name,
      email:this.signupObj.email,
      password:this.signupObj.password,
    }
    this.authService.signup(userObject).subscribe(
      (res:any)=>{
        this.router.navigate(['/login',{signup:"successful"}]);
        console.log(res);
        
      },
      errorResponse=>{
        console.log(errorResponse);        
      }
    );

  }

  validate(){
    this.validationError={
      name:"",
      email:"",
      password:"",
      confirmPassword:"",
      passwordMismatch:"",
      emailFormat:""
    };
    
    let valid:Boolean=true;
    if(this.signupObj.name==""){
      this.validationError.name="*Username cannot be empty";
      valid=false;
    }
    if(this.signupObj.email==""){
      this.validationError.email="*Email cannot be empty.";
      valid=false;

    }
    if(this.signupObj.password==""){
      this.validationError.password="*Password cannot be empty";
      valid=false;

    }
    if(this.signupObj.confirmPassword==""){
      this.validationError.confirmPassword="*Enter the password again to confirm.";
      valid=false;

    }    
    if(this.signupObj.password!=this.signupObj.confirmPassword){
      this.validationError.passwordMismatch="*Passwords donot match";
      valid=false;

    }
    if(this.signupObj.email.length!=0){        
    if(!this.signupObj.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      this.validationError.emailFormat="*Email Format is not correct";
      valid=false;

    }
  }
    
   if(valid)
    this.signup();
  }

}
