import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(login: NgForm){
  console.log(login.value);
  this.http.post('http://localhost:3000/login',{
    email: login.value.email,
    password: login.value.password
  }).subscribe(data =>{
    console.log(data);
    this.toastr.success('Login SuccessFully');
    login.reset();
    this.router.navigate(['/category']);
  })
  }

}
