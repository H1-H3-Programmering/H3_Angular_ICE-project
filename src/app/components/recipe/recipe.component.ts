import { Component } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent {
  recipeList: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  recipeForm: FormGroup;
  editingRecipe: Recipe | null = null;
  isFormVisible: boolean = false;
  searchText: string = '';

  constructor(private service: ICEServiceService<Recipe>) {
    this.recipeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      origin: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      instructions: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      difficulty: new FormControl(null, [
        Validators.required,
        Validators.maxLength(5),
      ]),
      preparationTime: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllRecipes();
  }

  getAllRecipes(): void {
    this.service.getAllRecipes().subscribe((data) => {
      this.recipeList = data;
      this.filteredRecipes = [...this.recipeList];
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.cancelEdit();
    }
  }

  create(): void {
    if (this.recipeForm.valid) {
      this.service.createRecipe(this.recipeForm.value).subscribe(() => {
        this.getAllRecipes();
        this.recipeForm.reset();
      });
    }
  }

  confirmDelete(recipeId: number | undefined): void {
    if (recipeId !== undefined) {
      this.service.deleteByRecipeId(recipeId).subscribe(() => {
        this.getAllRecipes();
        this.cancelEdit();
      });
    } else {
      console.error('Invalid recipe ID');
    }
  }

  editRecipe(recipe: Recipe): void {
    this.editingRecipe = recipe;
    this.recipeForm.patchValue({
      name: recipe.name,
      description: recipe.description,
      origin: recipe.origin,
      instructions: recipe.instructions,
      difficulty: recipe.difficulty,
      preparationTime: recipe.preperationTime,
    });
    this.isFormVisible = true;
  }

  saveRecipe(): void {
    if (this.recipeForm.valid) {
      const name = this.recipeForm.value.name;
      const description = this.recipeForm.value.description;
      const origin = this.recipeForm.value.origin;
      const instructions = this.recipeForm.value.instructions;
      const difficulty = this.recipeForm.value.difficulty;
      const preparationTime = this.recipeForm.value.preparationTime;

      if (this.editingRecipe) {
        const updatedRecipe: Recipe = {
          ...this.editingRecipe,
          name: name,
          description: description,
          origin: origin,
          instructions: instructions,
          difficulty: difficulty,
          preperationTime: preparationTime,
        };

        this.service.updateRecipe(updatedRecipe).subscribe(() => {
          this.getAllRecipes();
          this.cancelEdit();
        });
      } else {
        this.create();
      }
    }
  }

  cancelEdit(): void {
    this.editingRecipe = null;
    this.recipeForm.reset();
    this.isFormVisible = false;
  }

  searchRecipes(): void {
    this.filteredRecipes = this.recipeList.filter((recipe) =>
      recipe.name?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
