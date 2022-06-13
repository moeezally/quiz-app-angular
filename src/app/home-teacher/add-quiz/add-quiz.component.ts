import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { QuizService } from 'src/app/utility/quiz/quiz.service';
import { UserService } from 'src/app/utility/user/user.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  id:any=null;
  quiz:any={};
  questions:any[]=[
    
  ];
  isActive=false;
  validationError:any={};


  constructor(
    private appService:AppService,
    private quizService:QuizService,
    private router:Router,
    private userService:UserService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['id']){
      this.id=this.activatedRoute.snapshot.params['id']
      this.quizService.getQuizById(this.id).subscribe(
        (res:any)=>{
          console.log(res);
          
          this.quiz=res.data.quiz;
          this.questions=res.data.quiz.questions;
        },
        errorResponse=>{
          console.log(errorResponse);
          
        }

      )
    }
  }

  addQuestion(){
    this.questions.push({
      id:this.questions.length,
      quiz_id:'',      
      statement:'',
      optionA:'',
      optionB:'',
      optionC:'',
      optionD:'',
      answer:''
    },  )
  }

  save(){
    this.quiz.questions=this.questions;
    
    let token=this.appService.getToken();
    this.quiz.is_Active=this.isActive;
    console.log(this.quiz);
    this.userService.getTeacher(token.id).subscribe(
      (res:any)=>{
        this.quiz.created_by=res.data.teacher;
        this.quizService.addQuiz(this.quiz).subscribe(
          (res:any)=>{
            console.log(res);
            this.router.navigate(['/loggedIn/teacher'])
          }
        )   
      }
    )
     
  }

  validate(){
    this.validationError={
      name:"",      
    };

    if(this.quiz.name==""||this.quiz.name==null){
      this.validationError.name="*Name cannot be empty";
      return;
    }

    this.save();
  }


  deleteQuestion(i:any){
    console.log(i);
    let index=0;
    this.questions=this.questions.filter(
      (q)=>{
        if(index!=i){
          console.log(index+","+i);
          index++;
        return q;}
        index++;
    })
  }

  selectAnswer(i:any){
    
    let select:any = document.getElementById(""+i);
    let value = select.options[select.selectedIndex].value;  
    
    this.questions[i].answer=value;
  }

  setActive(){
    console.log(this.isActive);
    
    this.isActive=!this.isActive;
  }

}
