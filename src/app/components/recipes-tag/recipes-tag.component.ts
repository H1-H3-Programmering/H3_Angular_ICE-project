import { Component } from '@angular/core';
import { RecipesTag } from '../../models/RecipesTag';
import { ICEServiceService } from '../../services/ice-service.service';

@Component({
  selector: 'app-recipes-tag',
  templateUrl: './recipes-tag.component.html',
  styleUrl: './recipes-tag.component.css',
})
export class RecipesTagComponent {
  recipesTagList: RecipesTag[] = [];

  ngOnInit(): void {
    this.service.getAllRecipesTag().subscribe((data) => {
      this.recipesTagList = data;
      console.log(data);
    });
  }

  constructor(private service: ICEServiceService) {}
}
