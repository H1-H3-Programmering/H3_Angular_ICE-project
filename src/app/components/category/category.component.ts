import { Component } from '@angular/core';
import { Category } from '../../models/Category';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  categoryList: Category[] = [];
  categoryForm: FormGroup;
  selectedEntityId: number | null = null; // Property to store the selected entity ID

  constructor(private service: ICEServiceService<Category>) {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  ngOnInit(): void {
    this.getAllCategory();
    console.log(this.getAllCategory);
  } //End of ngOnInit

  getAllCategory(): void {
    this.service.getAllCategory().subscribe((data) => {
      this.categoryList = data;
      console.log(data);
    });
  } //End getAll

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

  create(): void {
    console.log(this.categoryForm.value);
    // Call the service method to create a user
    this.service
      .createCategory(this.categoryForm.value)
      .subscribe((response) => {
        console.log('Category created successfully:', response);
        // Optionally, you can refresh the user list after creation
        this.getAllCategory();
      });
  }
}
