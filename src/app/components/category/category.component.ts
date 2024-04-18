import { Component } from '@angular/core';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  category: Category = {};

  categoryList: Category[] = [];

  //Version 2
  categoryList2: Category[] = [
    { CategoryId: 1, Name: 'Hans' },
    { CategoryId: 2, Name: 'Jens' },
    { CategoryId: 3, Name: 'Peter' },
  ];

  ngOnInit(): void {
    // this.category = {
    //   CategoryId: 1,
    //   Name: 'Hans',
    // };
    //version 1
    // this.categoryList = [
    //   {CategoryId:1, Name:'Hans'},
    //   {CategoryId:2, Name:'Jens'},
    //   {CategoryId:3, Name:'Peter'}
    // ];
    // console.log(this.categoryList2);

    // //version 3
    // this.categoryList = this.service.getAll();
    // console.log(this.categoryList)

    //Version 4
    this.service.getAll().subscribe(data => {
      this.categoryList = data;
      console.log(data)
      console.log(this.categoryList);

    });

  } //End of ngOnInit

  constructor(private service: CategoryService) {


  }

  getAll(): void {
    console.log(this.categoryList2);
  } //End getAll

  getAll3(): void {this.service}
}
