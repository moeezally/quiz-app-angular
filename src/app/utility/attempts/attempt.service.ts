import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class AttemptService {

  constructor(
    private http:HttpClient,
    private appService:AppService
  ) { }

  getAll(){
    return this.http.get(this.appService.getApiUrl()+"api/attempt");
  }

  getQuizAttempts(id:any){
    return this.http.get(this.appService.getApiUrl()+"api/attempt/quiz/"+id);
  }

  getStudentAttempts(id:any){    
    return this.http.get(this.appService.getApiUrl()+"api/attempt/student/"+id)
  }

  addAttempt(attempt:any){
    return this.http.post(this.appService.getApiUrl()+"api/attempt",attempt);
  }

}
