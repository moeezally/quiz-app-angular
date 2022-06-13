import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  type:any="";

  constructor(
    private appService:AppService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.type=this.appService.getToken().type;    
  }

  logout(){    
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
