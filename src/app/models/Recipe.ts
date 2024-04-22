export class Recipe
{
  recipeId?:number=0;
  name?:string='';
  description?:string='';
  origin?:string='';
  instructions?:string='';
  difficulty?:number=0;
  preperationTime?:number=0;
// [JsonIgnore]public List<UserFavoriteRecipeJOIN>? UserFavorites { get; set; }
// [JsonIgnore]public List<RecipeTag>? RecipeTag { get; set; }
// [JsonIgnore]public List<Comments>? CommentId { get; set; }
}
