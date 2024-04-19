import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
import { Ingredient } from '../models/Ingredient';
import { Kitchen } from '../models/Kitchen';
import { Recipe } from '../models/Recipe';
import { Review } from '../models/Review';
import { UserFavorite } from '../models/UserFavorite';
import { Users } from '../models/Users';

@Injectable({
  providedIn: 'root',
})
export class ICEServiceService {
  urlCategory: string = 'https://localhost:7266/api/Category';
  urlIngredient: string = 'https://localhost:7266/api/Ingredient';
  urlKitchen: string = 'https://localhost:7266/api/Kitchen';
  urlRecipe: string = 'https://localhost:7266/api/Recipe';
  urlReview: string = 'https://localhost:7266/api/Review';
  urlUserFavorite: string = 'https://localhost:7266/api/UserFavorite';
  urlUsers: string = 'https://localhost:7266/api/Users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.urlCategory);
  }

  getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.urlIngredient);
  }

  getAllKitchens(): Observable<Kitchen[]> {
    return this.http.get<Kitchen[]>(this.urlKitchen);
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.urlRecipe);
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.urlReview);
  }

  getAllUserFavorites(): Observable<UserFavorite[]> {
    return this.http.get<UserFavorite[]>(this.urlUserFavorite);
  }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.urlUsers);
  }
}
