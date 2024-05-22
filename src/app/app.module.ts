import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './components/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { ReviewComponent } from './components/review/review.component';
import { UserFavoriteComponent } from './components/user-favorite/user-favorite.component';
import { UsersComponent } from './components/users/users.component';
import { provideHttpClient } from '@angular/common/http';
import { CommentsComponent } from './components/comments/comments.component';
import { CountriesComponent } from './components/countries/countries.component';
import { DietaryPreferencesComponent } from './components/dietary-preferences/dietary-preferences.component';
import { LanguageComponent } from './components/language/language.component';
import { RegionsComponent } from './components/regions/regions.component';
import { RecipesTagComponent } from './components/recipes-tag/recipes-tag.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { UserPreferencesComponent } from './components/user-preferences/user-preferences.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    CategoryComponent,
    IngredientComponent,
    KitchenComponent,
    RecipeComponent,
    ReviewComponent,
    UserFavoriteComponent,
    UsersComponent,
    CommentsComponent,
    CountriesComponent,
    DietaryPreferencesComponent,
    LanguageComponent,
    RecipesTagComponent,
    RegionsComponent,
    UserHistoryComponent,
    UserPreferencesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
