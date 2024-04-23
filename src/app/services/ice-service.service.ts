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
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ICEServiceService<ICEentity> {
  urlCategory: string = environment.apiUrl + 'Category';
  urlIngredient: string = environment.apiUrl + 'Ingredient';
  urlKitchen: string = environment.apiUrl + 'Kitchen';
  urlRecipe: string = environment.apiUrl + 'Recipe';
  urlReview: string = environment.apiUrl + 'Review';
  urlUserFavorite: string = environment.apiUrl + 'UserFavorite';
  urlUsers: string = environment.apiUrl + 'Users';
  urlComment: string = environment.apiUrl + 'Comment';
  urlCountry: string = environment.apiUrl + 'Country';
  urlDietaryPreference: string = environment.apiUrl + 'DietaryPreference';
  urlLanguage: string = environment.apiUrl + 'Language';
  urlRecipeTag: string = environment.apiUrl + 'RecipeTag';
  urlRegion: string = environment.apiUrl + 'Region';
  urlUserHistory: string = environment.apiUrl + 'UserHistory';
  urlUserPreference: string = environment.apiUrl + 'UserPreference';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ICEentity[]> {
    return this.http.get<ICEentity[]>(this.urlCategory);
  }

  // deleteById(name: string = 'Category', entityToDelete: number = 1): boolean {
  //   this.http.delete(this.urlCategory);
  //   this.http.delete(
  //     'https://localhost:7266/api/' + name + '/' + entityToDelete
  //   );
  //   return true;
  // }

  deleteById(entityId: number = 1): Observable<any> {
    const url = `${environment.apiUrl}Category/${entityId}`;
    return this.http.delete(url);
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
