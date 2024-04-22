import { Component } from '@angular/core';
import { Ingredient } from '../../models/Ingredient';
import { ICEServiceService } from '../../services/ice-service.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.css'
})
export class IngredientComponent {

  ingredientList:Ingredient[]=[];

  ngOnInit():void{


    this.service.getAllIngredients().subscribe(data=>{
      this.ingredientList=data;
      console.log(data)
    });

  }

  constructor(private service: ICEServiceService<Ingredient>){}


}
