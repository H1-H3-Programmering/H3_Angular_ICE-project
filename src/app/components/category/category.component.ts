import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICEServiceService } from '../../services/ice-service.service';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  categoryList: Category[] = [];
  filteredCategories: Category[] = [];
  categoryForm: FormGroup;
  searchText: string = '';
  editingCategory: Category | null = null;
  isFormVisible: boolean = false;

  constructor(private service: ICEServiceService<Category>) {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory(): void {
    this.service.getAllCategory().subscribe((data) => {
      this.categoryList = data;
      this.filteredCategories = data;
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.cancelEdit(); // Reset form if hiding the form
    }
  }

  create(): void {
    if (this.categoryForm.valid) {
      const categoryName = this.categoryForm.value.name;
      const newCategory: Category = { name: categoryName };
      this.service.createCategory(newCategory).subscribe((response) => {
        this.getAllCategory(); // Refresh category list
        this.categoryForm.reset(); // Clear form
      });
    }
  }

  deleteCategory(categoryId: number | undefined): void {
    if (categoryId !== undefined) {
      this.service.deleteByCategoryId(categoryId).subscribe(() => {
        this.getAllCategory(); // Refresh category list
        this.cancelEdit();
      });
    } else {
      console.error('Invalid category ID');
    }
  }

  editCategory(category: Category): void {
    this.editingCategory = category;
    this.categoryForm.patchValue({
      name: category.name,
    });
    this.isFormVisible = true; // Show the form
  }

  saveCategory(): void {
    if (this.categoryForm.valid) {
      const categoryName = this.categoryForm.value.name;
      if (this.editingCategory) {
        const updatedCategory: Category = {
          ...this.editingCategory,
          name: categoryName,
        };
        this.service.updateCategory(updatedCategory).subscribe(() => {
          this.getAllCategory(); // Refresh category list
          this.cancelEdit();
        });
      } else {
        this.create(); // Call the create method for new category
      }
    }
  }

  cancelEdit(): void {
    this.editingCategory = null;
    this.categoryForm.reset();
    this.isFormVisible = false; // Close the form
  }

  searchCategories(): void {
    this.filteredCategories = this.categoryList.filter(
      (category) =>
        category.name &&
        category.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
