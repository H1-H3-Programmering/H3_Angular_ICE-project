export class Recipe
{
  RecipeId?:number=0;
  Name?:string='';
  Description?:string='';
  Origin?:string='';
  Instructions?:string='';
  Difficulty?:number=0;
  PreperationTime?:number=0;
// [JsonIgnore]public List<UserFavoriteRecipeJOIN>? UserFavorites { get; set; }
// [JsonIgnore]public List<RecipeTag>? RecipeTag { get; set; }
// [JsonIgnore]public List<Comments>? CommentId { get; set; }
}
