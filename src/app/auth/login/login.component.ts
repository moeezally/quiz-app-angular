import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:String="";
  password:String="";
  loginObj:any={};
  loginError:any="";
  signupSuccess:any=""

  constructor(
    private authService:AuthService,
    private router:Router,
    private appService:AppService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['signup'])
    this.signupSuccess=this.activatedRoute.snapshot.params['signup']
  }

  login(){
    this.authService.login(this.loginObj).subscribe(
      (res:any)=>{
        console.log(res);        
        localStorage.setItem('token', res.token);
        let token=JSON.parse(atob(res.token.split('.')[1]))
        if(token.type=="Student"){
          this.router.navigate(['loggedIn/student']);
        }else{
          this.router.navigate(['loggedIn/teacher']);
        } 

      },
      errorResponse => {
        console.log(errorResponse.error.message);
        this.loginError=errorResponse.error.message;
      }
    )

  }

}
