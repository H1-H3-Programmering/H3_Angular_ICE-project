import { Component } from '@angular/core';
import { Ingredient } from '../../models/Ingredient';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css'],
})
export class IngredientComponent {
  ingredientList: Ingredient[] = [];
  filteredIngredients: Ingredient[] = [];
  ingredientForm: FormGroup;
  editingIngredient: Ingredient | null = null;
  isFormVisible: boolean = false;
  searchText: string = '';

  constructor(private service: ICEServiceService<Ingredient>) {
    this.ingredientForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  ngOnInit(): void {
    this.getAllIngredients();
  }

  getAllIngredients(): void {
    this.service.getAllIngredients().subscribe((data) => {
      this.ingredientList = data;
      this.filteredIngredients = [...this.ingredientList]; // Initialize filteredIngredients with all ingredients
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.cancelEdit(); // Reset form if hiding the form
    }
  }

  create(): void {
    if (this.ingredientForm.valid) {
      this.service
        .createIngredient(this.ingredientForm.value)
        .subscribe((response) => {
          this.getAllIngredients(); // Refresh ingredient list
          this.ingredientForm.reset(); // Clear form
        });
    }
  }

  deleteIngredient(ingredientId: number | undefined): void {
    if (ingredientId !== undefined) {
      this.service.deleteByIngredientId(ingredientId).subscribe(() => {
        this.getAllIngredients(); // Refresh ingredient list
        this.cancelEdit();
      });
    } else {
      console.error('Invalid ingredient ID');
    }
  }

  editIngredient(ingredient: Ingredient): void {
    this.editingIngredient = ingredient;
    this.ingredientForm.patchValue({
      name: ingredient.name,
    });
    this.isFormVisible = true; // Show the form
  }

  saveIngredient(): void {
    if (this.ingredientForm.valid) {
      const name = this.ingredientForm.value.name;

      if (this.editingIngredient) {
        const updatedIngredient: Ingredient = {
          ...this.editingIngredient,
          name: name,
        };

        // Call the service's updateIngredient method
        this.service.updateIngredient(updatedIngredient).subscribe(() => {
          this.getAllIngredients(); // Refresh ingredient list
          this.cancelEdit();
        });
      } else {
        this.create(); // Call the create method for new ingredient
      }
    }
  }

  cancelEdit(): void {
    this.editingIngredient = null;
    this.ingredientForm.reset();
    this.isFormVisible = false; // Close the form
  }

  searchIngredients(): void {
    this.filteredIngredients = this.ingredientList.filter(
      (ingredient) =>
        ingredient.name &&
        ingredient.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
