import { Component } from '@angular/core';
import { RecipesTag } from '../../models/RecipesTag';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipes-tag',
  templateUrl: './recipes-tag.component.html',
  styleUrls: ['./recipes-tag.component.css'],
})
export class RecipesTagComponent {
  recipesTagList: RecipesTag[] = [];
  filteredRecipesTags: RecipesTag[] = [];
  recipeTagForm: FormGroup;
  editingRecipeTag: RecipesTag | null = null;
  isFormVisible: boolean = false;
  searchText: string = '';

  constructor(private service: ICEServiceService<RecipesTag>) {
    this.recipeTagForm = new FormGroup({
      tag: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  ngOnInit(): void {
    this.getAllRecipeTags();
  }

  getAllRecipeTags(): void {
    this.service.getAllRecipesTag().subscribe((data) => {
      this.recipesTagList = data;
      this.filteredRecipesTags = [...this.recipesTagList]; // Initialize filteredRecipesTags with all tags
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.cancelEdit(); // Reset form if hiding the form
    }
  }

  create(): void {
    if (this.recipeTagForm.valid) {
      this.service.createRecipeTag(this.recipeTagForm.value).subscribe(() => {
        this.getAllRecipeTags(); // Refresh tags list
        this.recipeTagForm.reset(); // Clear form
      });
    }
  }

  deleteRecipeTag(recipeTagId: number | undefined): void {
    if (recipeTagId !== undefined) {
      this.service.deleteByRecipeTagId(recipeTagId).subscribe(() => {
        this.getAllRecipeTags(); // Refresh tags list
        this.cancelEdit();
      });
    } else {
      console.error('Invalid tag ID');
    }
  }

  editRecipeTag(recipeTag: RecipesTag): void {
    this.editingRecipeTag = recipeTag;
    this.recipeTagForm.patchValue({
      tag: recipeTag.tag,
    });
    this.isFormVisible = true; // Show the form
  }

  saveRecipeTag(): void {
    if (this.recipeTagForm.valid) {
      const tag = this.recipeTagForm.value.tag;

      if (this.editingRecipeTag) {
        const updatedRecipeTag: RecipesTag = {
          ...this.editingRecipeTag,
          tag: tag,
        };

        // Call the service's updateRecipeTag method
        this.service.updateRecipeTag(updatedRecipeTag).subscribe(() => {
          this.getAllRecipeTags(); // Refresh tags list
          this.cancelEdit();
        });
      } else {
        this.create(); // Call the create method for new tag
      }
    }
  }

  cancelEdit(): void {
    this.editingRecipeTag = null;
    this.recipeTagForm.reset();
    this.isFormVisible = false; // Close the form
  }

  searchRecipesTags(): void {
    this.filteredRecipesTags = this.recipesTagList.filter(
      (recipeTag) =>
        recipeTag.tag &&
        recipeTag.tag.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
