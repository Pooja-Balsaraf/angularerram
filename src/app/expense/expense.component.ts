import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';

export interface PeriodicElement {
  SrNo: string;
  Category: String;
  title: String;
  money: any;
  Date: Date;
  Action: any;
}

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  constructor(private http: HttpClient, private toastService: ToastrService) { }
   Category :any=[];
   Expenses :any =[];
   editform :boolean =false;
   displayColoumns: string[] =["SrNo", "Category", "title","money","Date","Action"];
   ExpenseRecord: any =[];
   title;
   money;
   category;
   EditId;
  ngOnInit() {
    this.getExpense();
    this.getcategory();

  }

  getcategory(){
    return this.http.get('http://localhost:3000/getcategory').subscribe(data =>{
      console.log(data);
      this.Category = data;
    })
  }



  submitexpense(expense: NgForm) {
    this.editform =true;
   console.log(expense.value);
   this.http.post('http://localhost:3000/expense',{
    category: expense.value.category,
    title: expense.value.title,
    money: expense.value.money
   }).subscribe(data =>{
    console.log(data);
    this.Expenses.push({data});
    this.getExpense();
     this.toastService.success("Expense Added SuccessFully");
     expense.reset();
   })
  }

  deleteExpense(expense){
   console.log(expense._id);
  const id =expense._id;
  console.log(id);
    this.http.delete('http://localhost:3000/deleteexpense/' + id).subscribe(data =>{
     console.log(data);
    })
   this.getExpense();
   this.toastService.success('delete Successfully');
  }

  getExpense(){
    return this.http.get('http://localhost:3000/getExpenses').subscribe(data =>{
      console.log(data);
      this.Expenses = data;
    })
  }

  editForm(element){
    console.log(element);
    this.editform =true;
    this.EditId= element._id;
    this.title =element.title;
    this.money =element.money;
    this.category =element.category;
  }

  updateForm(data: NgForm){
   console.log(data.value);
   this.http.put('http://localhost:3000/editexpense/' + this.EditId, {
    category: data.value.category,
    title: data.value.title,
    money: data.value.money
   }).subscribe(data1 =>{
     console.log(data1);
     this.toastService.success('Expense Updated Successfully');
     this.getExpense();
     data.reset();
   })
  }

}
