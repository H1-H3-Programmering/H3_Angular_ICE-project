import { Component } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import { ICEServiceService } from '../../services/ice-service.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent {
  recipeList: Recipe[] = [];

  ngOnInit(): void {
    this.service.getAllRecipes().subscribe((data) => {
      this.recipeList = data;
      console.log(data);
    });
  }
  constructor(private service: ICEServiceService) {}
}
