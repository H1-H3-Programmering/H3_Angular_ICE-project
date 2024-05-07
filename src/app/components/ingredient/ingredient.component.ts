import { Component } from '@angular/core';
import { Ingredient } from '../../models/Ingredient';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.css',
})
export class IngredientComponent {
  ingredientList: Ingredient[] = [];
  ingredientForm: FormGroup;
  selectedEntityId: number | null = null; // Property to store the selected entity ID
  showCommentsBtn: boolean = false;

  constructor(private service: ICEServiceService<Ingredient>) {
    this.ingredientForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(0)])
    });
  }

  ngOnInit(): void {
    this.getAllIngredients();
    console.log(this.getAllIngredients());
  }

  getAllIngredients(): void {
    this.service.getAllIngredients().subscribe((data) => {
      this.ingredientList = data;
      console.log(data);
    });
  }

  create(): void {
    console.log(this.ingredientForm.value);
    // Call the service method to create a user
    this.service
      .createIngredient(this.ingredientForm.value)
      .subscribe((response) => {
        console.log('Ingredient created successfully:', response);
        // Optionally, you can refresh the user list after creation
        this.getAllIngredients();
      });
  }

  confirmDelete(): void {
    if (this.selectedEntityId !== null) {
      // Call the deleteById method with the selectedEntityId
      this.service.deleteByIngredientId(this.selectedEntityId).subscribe(
        () => {
          console.log('Entity deleted successfully');
          this.getAllIngredients();
          // Optionally, update the categoryList after deletion
          this.ingredientList = this.ingredientList.filter(
            (ingredient) => ingredient.ingredientsId !== this.selectedEntityId
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
