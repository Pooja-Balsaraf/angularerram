import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient,private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  registerUser(user: NgForm){
  //  console.log('Register data', user.value);
   this.http.post('http://localhost:3000/register',{
    username: user.value.username,
    password: user.value.password,
    email: user.value.email,
   }).subscribe(data =>{
     console.log(data);
     this.toaster.success('Register Successfully');
     user.reset();
   }, err=>{
     console.log(err);
   })
  }

}
