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
import { Comments } from '../models/Comments';
import { Countries } from '../models/Countries';
import { DietaryPreferences } from '../models/DietaryPreferences';
import { Language } from '../models/Language';
import { RecipesTag } from '../models/RecipesTag';
import { Regions } from '../models/Regions';
import { UserHistory } from '../models/UserHistory';
import { UserPreferences } from '../models/UserPreferences';

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
  urlComment: string = 'https://localhost:7266/api/Comment';
  urlCountry: string = 'https://localhost:7266/api/Country';
  urlDietaryPreference: string = 'https://localhost:7266/api/DietaryPreference';
  urlLanguage: string = 'https://localhost:7266/api/Language';
  urlRecipeTag: string = 'https://localhost:7266/api/RecipeTag';
  urlRegion: string = 'https://localhost:7266/api/Region';
  urlUserHistory: string = 'https://localhost:7266/api/UserHistory';
  urlUserPreference: string = 'https://localhost:7266/api/UserPreference';

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

  getAllComments(): Observable<Comments[]> {
    return this.http.get<Comments[]>(this.urlComment);
  }

  getAllCountries(): Observable<Countries[]> {
    return this.http.get<Countries[]>(this.urlCountry);
  }

  getAllDietaryPreferences(): Observable<DietaryPreferences[]> {
    return this.http.get<DietaryPreferences[]>(this.urlDietaryPreference);
  }

  getAllLanguage(): Observable<Language[]> {
    return this.http.get<Language[]>(this.urlLanguage);
  }

  getAllRecipesTag(): Observable<RecipesTag[]> {
    return this.http.get<RecipesTag[]>(this.urlRecipeTag);
  }

  getAllRegions(): Observable<Regions[]> {
    return this.http.get<Regions[]>(this.urlRegion);
  }

  getAllUserHistory(): Observable<UserHistory[]> {
    return this.http.get<UserHistory[]>(this.urlUserHistory);
  }

  getAllUserPreferences(): Observable<UserPreferences[]> {
    return this.http.get<UserPreferences[]>(this.urlUserPreference);
  }
}
