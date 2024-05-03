import { Component } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent {
  recipeList: Recipe[] = [];
  recipeForm: FormGroup;
  selectedEntityId: number | null = null; // Property to store the selected entity ID
  showCommentsBtn: boolean = false;

  constructor(private service: ICEServiceService<Recipe>) {
    this.recipeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      origin: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      instructions: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      difficulty: new FormControl(null, [Validators.required]),
      preperationTime: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllRecipes();
  }

  getAllRecipes(): void {
    this.service.getAllRecipes().subscribe((data) => {
      this.recipeList = data;
      console.log(data);
    });
  }

  create(): void {
    console.log(this.recipeForm.value);
    // Call the service method to create a user
    this.service.createRecipe(this.recipeForm.value).subscribe((response) => {
      console.log('Comment created successfully:', response);
      // Optionally, you can refresh the user list after creation
      this.getAllRecipes();
    });
  }

  confirmDelete(): void {
    if (this.selectedEntityId !== null) {
      // Call the deleteById method with the selectedEntityId
      this.service.deleteByRecipeId(this.selectedEntityId).subscribe(
        () => {
          console.log('Entity deleted successfully');
          this.getAllRecipes();
          // Optionally, update the categoryList after deletion
          this.recipeList = this.recipeList.filter(
            (recipes) => recipes.recipeId !== this.selectedEntityId
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
