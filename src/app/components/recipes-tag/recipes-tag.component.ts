import { Component } from '@angular/core';
import { RecipesTag } from '../../models/RecipesTag';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipes-tag',
  templateUrl: './recipes-tag.component.html',
  styleUrl: './recipes-tag.component.css',
})
export class RecipesTagComponent {
  recipesTagList: RecipesTag[] = [];
  recipeTagForm: FormGroup;
  selectedEntityId: number | null = null; // Property to store the selected entity ID
  showCommentsBtn: boolean = false;

  constructor(private service: ICEServiceService<RecipesTag>) {
    this.recipeTagForm = new FormGroup({
      recipeId: new FormControl(null, [Validators.required]),
      tag: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  ngOnInit(): void {
    this.getAllRecipeTags();
  }

  getAllRecipeTags(): void {
    this.service.getAllRecipesTag().subscribe((data) => {
      this.recipesTagList = data;
      console.log(data);
    });
  }

  create(): void {
    console.log(this.recipeTagForm.value);
    // Call the service method to create a user
    this.service
      .createRecipeTag(this.recipeTagForm.value)
      .subscribe((response) => {
        console.log('Recipe Tag created successfully:', response);
        // Optionally, you can refresh the user list after creation
        this.getAllRecipeTags();
      });
  }

  confirmDelete(): void {
    if (this.selectedEntityId !== null) {
      // Call the deleteById method with the selectedEntityId
      this.service.deleteByRecipeTagId(this.selectedEntityId).subscribe(
        () => {
          console.log('Entity deleted successfully');
          this.getAllRecipeTags();
          // Optionally, update the categoryList after deletion
          this.recipesTagList = this.recipesTagList.filter(
            (recipeTags) => recipeTags.recipeTagId !== this.selectedEntityId
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
