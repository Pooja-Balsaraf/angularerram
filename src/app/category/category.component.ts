import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


export interface PeriodicElement {
  SrNo: string;
  Category: String;
  Date: Date;
  action: any
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  title;
  title1;
  editform =false;
  editId;
 displayColoumns: string[] =["SrNo", "Category", "Date","action"];
 CategoryRecord :any =[];
  constructor(private http: HttpClient, private toaster: ToastrService) { }
   Categories : any=[];
  ngOnInit(): void {
    this.getcategory();
  }

  addcategory(category: NgForm){
  console.log(category.value);
  this.http.post('http://localhost:3000/category',{
    title: category.value.title
  }).subscribe(data =>{
    console.log(data);
    this.CategoryRecord = data;
    this.Categories.push({data});
    this.getcategory();
    this.toaster.success('Catagory Successfully');
    category.reset();
  }, err =>{
    console.log(err);
  })
  }

  getcategory(){
   this.http.get('http://localhost:3000/getcategory').subscribe(data =>{
     this.Categories = data;
     console.log('categories',this.Categories);
   })
  }

  deleteRecord(row){
   console.log(row);
   const id=row._id;
   console.log(id);
  //  this.Categories.splice(i,1);
  //  console.log(this.Categories);
  //  this.getcategory();
  this.http.delete('http://localhost:3000/deleteCategory/' + id).subscribe(data =>{
    console.log(data);
    this.getcategory();
  })
  }

  editRecord(row){
    console.log(row);
    this.editform = true;
    this.editId =row._id;
    if(this.editform){
      const id= row._id;
      console.log(id);
      this.title = row.title;
    }
}

  update(category: NgForm){
  console.log(category.value.title);
  this.http.put('http://localhost:3000/editcategory/' + this.editId, {
    title: category.value.title
  }).subscribe(data =>{
        console.log(data);
        this.getcategory();
         category.reset();
      })
  }

}
