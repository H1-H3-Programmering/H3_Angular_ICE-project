import { Component } from '@angular/core';
import { Category } from '../../models/Category';
import { ICEServiceService } from '../../services/ice-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  category: Category = {};

  categoryList: Category[] = [];
  selectedEntityId: number | null = null; // Property to store the selected entity ID

  //Version 2
  categoryList2: Category[] = [
    { categoryId: 1, name: 'Hans' },
    { categoryId: 2, name: 'Jens' },
    { categoryId: 3, name: 'Peter' },
  ];

  ngOnInit(): void {
    //Version 4
    this.service.getAllCategory().subscribe((data) => {
      this.categoryList = data;
      console.log(data);
    });
  } //End of ngOnInit

  constructor(private service: ICEServiceService<Category>) {}

  getAll(): void {
    console.log(this.categoryList2);
  } //End getAll

  getAll3(): void {
    this.service;
  }

  confirmDelete(): void {
    if (this.selectedEntityId !== null) {
      // Call the deleteById method with the selectedEntityId
      this.service.deleteByCategoryId(this.selectedEntityId).subscribe(
        () => {
          console.log('Entity deleted successfully');
          // Optionally, update the categoryList after deletion
          this.categoryList = this.categoryList.filter(
            (category) => category.categoryId !== this.selectedEntityId
          );
          // Reset the selectedEntityId after deletion
          this.selectedEntityId = null;
        },
        (error) => {
          console.error('Error deleting entity:', error);
        }
      );
    } else {
      console.warn('No entity selected for deletion.');
    }
  }
}
