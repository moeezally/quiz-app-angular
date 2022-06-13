import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-not-allowed',
  templateUrl: './not-allowed.component.html',
  styleUrls: ['./not-allowed.component.css'],
})
export class NotAllowedComponent implements OnInit {
  type: any;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.type = this.appService.getToken().type.toLowerCase();
  }
}
