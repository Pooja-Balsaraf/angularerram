import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Angularerram';
  Record :any =[];

  constructor(private http: HttpClient){

  }

ngOnInit(){
  this.getApi();
}

getApi(){
  this.http.get('http://localhost:3000/api').subscribe(data =>{
      console.log(data);
      this.Record =data;
    })
}
}
