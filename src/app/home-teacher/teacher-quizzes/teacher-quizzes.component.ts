import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { AttemptService } from 'src/app/utility/attempts/attempt.service';
import { QuizService } from 'src/app/utility/quiz/quiz.service';

@Component({
  selector: 'app-teacher-quizzes',
  templateUrl: './teacher-quizzes.component.html',
  styleUrls: ['./teacher-quizzes.component.css']
})
export class TeacherQuizzesComponent implements OnInit {
  quizzes:any[]=[];
  isLoading=true;
  attempts:any[]=[]

  constructor(
    private quizService:QuizService,
    private appService:AppService,
    private attemptService:AttemptService
  ) { }

  ngOnInit(): void {

    let token=localStorage.getItem('token');
    if(token!=null){
      let parsedToken= JSON.parse(atob(token.split('.')[1]))
      this.quizService.getTeacherQuizzes(parsedToken.id).subscribe(
        (response:any)=>{
          this.quizzes=response.data.quizzes;
          this.isLoading=false;
        }
      );
      this.attemptService.getAll().subscribe(
      (res:any)=>{
        this.attempts=res.data.attempts;
      }
      )
    }
  }

  deleteQuiz(id:any){
    this.quizService.delete(id).subscribe(
      (res:any)=>{
        console.log(res);
        this.quizzes=this.quizzes.filter((item:any)=>item.id!=id)
      },
      errorResponse=>{
        console.log(errorResponse);
        
      }
    )
  }

  setModalData(id:any){

    let quiz=this.quizzes.find((quiz)=>quiz.id==id)

    let quizAttempts=this.attempts.filter((attempt)=>{
        if(attempt.quiz_id.id==quiz.id)
        return attempt;
      })
    

    console.log(quizAttempts);
    
    let outputHTML:String[]=[];

    quizAttempts.forEach((attempt)=>{
      outputHTML.push(
        '<tr><td id="attempt_name" style="color: black;">'
        +attempt.user_id.name+
        '</td>'+
        '<td id="attempt_status" style="color: black;">'
        + attempt.status 
        +'</td>'
        +'<td id="attempt_score" style="color: black;">'
        +attempt.score
        +'</td>'
        +'<td id="attempt_on" style="color: black;">'
        +attempt.taken_on
        +'</td></tr>'
      )
    })

    if(quizAttempts.length==0)
    outputHTML.push(
      "0 Attempts"
    )

    console.log(outputHTML.join(''));
    
    let tbody=document.getElementById("attempt_table_body");
    if(tbody!=null)
    tbody.innerHTML=outputHTML.join('');

  }

}
