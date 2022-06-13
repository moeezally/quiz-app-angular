import { Component, OnInit } from '@angular/core';
import { AttemptService } from 'src/app/utility/attempts/attempt.service';
import { QuizService } from 'src/app/utility/quiz/quiz.service';
import { UserService } from 'src/app/utility/user/user.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students:any=[];
  isLoading=true;
  studentError:any={}
  student:any={
    name:"",
    email:"",
    password:"123456"
  };
  defaultPassword=true;
  attempts:any[]=[];


  constructor(
    private quizService:QuizService,
    private userService:UserService,
    private attemptService:AttemptService
  ) { }

  ngOnInit(): void {

    let token=localStorage.getItem('token');
    if(token!=null){
      this.userService.getAllStudents().subscribe(
        (response:any)=>{
          this.students=response.data.students;
          this.isLoading=false;
        }
      );
      this.attemptService.getAll().subscribe(
        (res:any)=>{
          console.log(res);
          
          this.attempts=res.data.attempts;
        }
        );
      

    }
  }

  validate(){
    let valid=true;
    this.studentError={
      name:"",
      email:"",
      password:""
    }
    if(this.student.name==null||this.student.name==""){
      this.studentError.name="*Name cannot be empty";
      valid=false;
    }
    if(this.student.password==null||this.student.password==""){
      this.studentError.password="*Password cannot be empty";
      valid=false;
    }
    if(this.student.email==null||this.student.email==""){
    this.studentError.email="*Email cannot be empty"
      valid=false;
    }
    else if(!this.student.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
     this.studentError.email="*Email Format not correct";
     valid=false; 
    }

    if(valid)
    this.save();

  }

  save(){
    console.log(this.student);
    let btn=document.getElementById("AddStudent");
    btn?.setAttribute("data-dismiss","modal");
    this.userService.addStudent(this.student).subscribe(
      (res:any)=>{
        console.log(res);
        this.students.push(res.data.student);
        alert("Student Added Successfully")

      },
      errorResponse =>{
        alert(errorResponse.error.message);
      }
    );
  }

  setPassword(){
    this.defaultPassword=!this.defaultPassword;
  }

  delete(id:any){
    this.userService.deleteStudent(id).subscribe(
      (res:any)=>{
        console.log(res);
        this.students=this.students.filter((item:any)=>item.id!=id)
      },
      errorResponse=>{
        console.log(errorResponse);
        
      }
    )
  }

  setModalData(id:any){

    let attempts=this.attempts.filter((attempt)=>attempt.user_id.id==id)

    
    

    console.log(attempts);
    
    let outputHTML:String[]=[];

    attempts.forEach((attempt)=>{
      outputHTML.push(
        '<tr><td id="attempt_name" style="color: black;">'
        +attempt.quiz_id.name+
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

    
    if(attempts.length==0)
    outputHTML.push(
      "0 Quiz Attempted"
    )

    
    let tbody=document.getElementById("attempt_table_body");
    if(tbody!=null)
    tbody.innerHTML=outputHTML.join('');

  }

}
