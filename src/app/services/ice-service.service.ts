import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
import { Ingredient } from '../models/Ingredient';

@Injectable({
  providedIn: 'root',
})
export class ICEServiceService {
  urlIngredient: string = 'https://localhost:7266/api/Ingredient';

  constructor(private http: HttpClient) {}

  getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.urlIngredient);
  }


}
