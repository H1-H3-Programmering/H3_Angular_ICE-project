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

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.urlCategory);
  }

  deleteByCategoryId(categoryId: number): Observable<any> {
    const url = `${this.urlCategory}/${categoryId}`;
    return this.http.delete(url);
  }

  createCategory(category: Category): Observable<any> {
    return this.http.post<any>(this.urlCategory, category);
  }

  updateCategory(category: Category): Observable<any> {
    const url = `${this.urlCategory}/${category.categoryId}`;
    return this.http.put(url, category);
  }

  updateComment(comment: Comments): Observable<any> {
    const url = `${this.urlComment}/${comment.commentId}`;
    return this.http.put(url, comment);
  }

  updateCountry(countries: Countries): Observable<any> {
    const url = `${this.urlCountry}/${countries.countryId}`;
    return this.http.put(url, countries);
  }

  updateDietaryPreference(
    dietaryPreference: DietaryPreferences
  ): Observable<any> {
    const url = `${this.urlDietaryPreference}/${dietaryPreference.dietaryPreferenceId}`;
    return this.http.put(url, dietaryPreference);
  }

  updateIngredient(ingredients: Ingredient): Observable<any> {
    const url = `${this.urlIngredient}/${ingredients.ingredientsId}`;
    return this.http.put(url, ingredients);
  }

  updateKitchen(kitchen: Kitchen): Observable<any> {
    const url = `${this.urlKitchen}/${kitchen.kitchenId}`;
    return this.http.put(url, kitchen);
  }

  updateLanguage(language: Language): Observable<any> {
    const url = `${this.urlLanguage}/${language.languageId}`;
    return this.http.put(url, language);
  }

  updateRecipe(recipe: Recipe): Observable<any> {
    const url = `${this.urlRecipe}/${recipe.recipeId}`;
    return this.http.put(url, recipe);
  }

  updateRecipeTag(recipeTag: RecipesTag): Observable<any> {
    const url = `${this.urlRecipeTag}/${recipeTag.recipeTagId}`;
    return this.http.put(url, recipeTag);
  }

  updateRegion(region: Regions): Observable<any> {
    const url = `${this.urlRegion}/${region.regionId}`;
    return this.http.put(url, region);
  }

  updateReview(review: Review): Observable<any> {
    const url = `${this.urlReview}/${review.reviewId}`;
    return this.http.put(url, review);
  }

  updateUserFavorite(UserFavorite: UserFavorite): Observable<any> {
    const url = `${this.urlUserFavorite}/${UserFavorite.userFavoriteId}`;
    return this.http.put(url, UserFavorite);
  }

  updateUserHistory(userHistory: UserHistory): Observable<any> {
    const url = `${this.urlUserHistory}/${userHistory.userHistoryId}`;
    return this.http.put(url, userHistory);
  }

  updateUserPreference(userPreferences: UserPreferences): Observable<any> {
    const url = `${this.urlUserPreference}/${userPreferences.preferenceId}`;
    return this.http.put(url, userPreferences);
  }

  updateUser(user: Users): Observable<any> {
    const url = `${this.urlUsers}/${user.userId}`;
    return this.http.put(url, user);
  }

  getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.urlIngredient);
  }

  deleteByIngredientId(entityId: number = 1): Observable<any> {
    const url = `${environment.apiUrl}Ingredient/${entityId}`;
    return this.http.delete(url);
  }

  createIngredient(ingredient: Ingredient): Observable<any> {
    // Assuming your API endpoint for creating a user is POST /users
    return this.http.post<any>(this.urlIngredient, ingredient);
  }

  getAllKitchens(): Observable<Kitchen[]> {
    return this.http.get<Kitchen[]>(this.urlKitchen);
  }

  deleteByKitchenId(entityId: number = 1): Observable<any> {
    const url = `${environment.apiUrl}Kitchen/${entityId}`;
    return this.http.delete(url);
  }

  createKitchen(kitchen: Kitchen): Observable<any> {
    // Assuming your API endpoint for creating a user is POST /users
    return this.http.post<any>(this.urlKitchen, kitchen);
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.urlRecipe);
  }

  deleteByRecipeId(entityId: number = 1): Observable<any> {
    const url = `${environment.apiUrl}Recipe/${entityId}`;
    return this.http.delete(url);
  }

  createRecipe(recipe: Recipe): Observable<any> {
    // Assuming your API endpoint for creating a user is POST /users
    return this.http.post<any>(this.urlRecipe, recipe);
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.urlReview);
  }

  deleteByReviewId(entityId: number = 1): Observable<any> {
    const url = `${environment.apiUrl}Review/${entityId}`;
    return this.http.delete(url);
  }

  createReview(review: Review): Observable<any> {
    // Assuming your API endpoint for creating a user is POST /users
    return this.http.post<any>(this.urlReview, review);
  }

  getAllUserFavorites(): Observable<UserFavorite[]> {
    return this.http.get<UserFavorite[]>(this.urlUserFavorite);
  }

  deleteByUserFavoriteId(entityId: number = 1): Observable<any> {
    const url = `${environment.apiUrl}UserFavorite/${entityId}`;
    return this.http.delete(url);
  }

  createUserFavorite(userFavorite: UserFavorite): Observable<any> {
    // Assuming your API endpoint for creating a user is POST /users
    return this.http.post<any>(this.urlUserFavorite, userFavorite);
  }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.urlUsers);
  }

  deleteByUsersId(entityId: number = 1): Observable<any> {
    const url = `${environment.apiUrl}Users/${entityId}`;
    return this.http.delete(url);
  }

  createUser(user: Users): Observable<any> {
    // Assuming your API endpoint for creating a user is POST /users
    return this.http.post<any>(this.urlUsers, user);
  }

  getAllComments(): Observable<Comments[]> {
    return this.http.get<Comments[]>(this.urlComment);
  }

  deleteByCommentId(entityId: number = 1): Observable<any> {
    const url = `${environment.apiUrl}Comment/${entityId}`;
    return this.http.delete(url);
  }

  createComment(comment: Comments): Observable<any> {
    // Assuming your API endpoint for creating a user is POST /users
    return this.http.post<any>(this.urlComment, comment);
  }

  getAllCountries(): Observable<Countries[]> {
    return this.http.get<Countries[]>(this.urlCountry);
  }

  deleteByCountryId(entityId: number = 1): Observable<any> {
    const url = `${environment.apiUrl}Country/${entityId}`;
    return this.http.delete(url);
  }

  createCountry(country: Countries): Observable<any> {
    // Assuming your API endpoint for creating a user is POST /users
    return this.http.post<any>(this.urlCountry, country);
  }

  getAllDietaryPreferences(): Observable<DietaryPreferences[]> {
    return this.http.get<DietaryPreferences[]>(this.urlDietaryPreference);
  }

  deleteByDietaryPreferenceId(entityId: number = 1): Observable<any> {
    const url = `${environment.apiUrl}DietaryPreference/${entityId}`;
    return this.http.delete(url);
  }

  createDietaryPreference(
    dietaryPreference: DietaryPreferences
  ): Observable<any> {
    // Assuming your API endpoint for creating a user is POST /users
    return this.http.post<any>(this.urlDietaryPreference, dietaryPreference);
  }

  getAllLanguage(): Observable<Language[]> {
    return this.http.get<Language[]>(this.urlLanguage);
  }

  deleteByLanguageId(entityId: number = 1): Observable<any> {
    const url = `${environment.apiUrl}Language/${entityId}`;
    return this.http.delete(url);
  }

  createLanguage(language: Language): Observable<any> {
    // Assuming your API endpoint for creating a user is POST /users
    return this.http.post<any>(this.urlLanguage, language);
  }

  getAllRecipesTag(): Observable<RecipesTag[]> {
    return this.http.get<RecipesTag[]>(this.urlRecipeTag);
  }

  deleteByRecipeTagId(entityId: number = 1): Observable<any> {
    const url = `${environment.apiUrl}RecipeTag/${entityId}`;
    return this.http.delete(url);
  }

  createRecipeTag(recipeTag: RecipesTag): Observable<any> {
    return this.http.post<any>(this.urlRecipeTag, recipeTag);
  }

  getAllRegions(): Observable<Regions[]> {
    return this.http.get<Regions[]>(this.urlRegion);
  }

  deleteByRegionId(entityId: number = 1): Observable<any> {
    const url = `${environment.apiUrl}Region/${entityId}`;
    return this.http.delete(url);
  }

  createRegion(region: Regions): Observable<any> {
    // Assuming your API endpoint for creating a user is POST /users
    return this.http.post<any>(this.urlRegion, region);
  }

  getAllUserHistory(): Observable<UserHistory[]> {
    return this.http.get<UserHistory[]>(this.urlUserHistory);
  }

  deleteByUserHistoryId(entityId: number = 1): Observable<any> {
    const url = `${environment.apiUrl}UserHistory/${entityId}`;
    return this.http.delete(url);
  }

  createUserHistory(userHistory: UserHistory): Observable<any> {
    // Assuming your API endpoint for creating a user is POST /users
    return this.http.post<any>(this.urlUserHistory, userHistory);
  }

  getAllUserPreferences(): Observable<UserPreferences[]> {
    return this.http.get<UserPreferences[]>(this.urlUserPreference);
  }

  deleteByUserPreferenceId(entityId: number = 1): Observable<any> {
    const url = `${environment.apiUrl}UserPreference/${entityId}`;
    return this.http.delete(url);
  }

  createUserPreference(userPreference: UserPreferences): Observable<any> {
    // Assuming your API endpoint for creating a user is POST /users
    return this.http.post<any>(this.urlUserPreference, userPreference);
  }
}
