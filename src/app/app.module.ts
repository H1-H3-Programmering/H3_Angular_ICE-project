import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './components/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { ReviewComponent } from './components/review/review.component';
import { UserFavoriteComponent } from './components/user-favorite/user-favorite.component';
import { UsersComponent } from './components/users/users.component';

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
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
