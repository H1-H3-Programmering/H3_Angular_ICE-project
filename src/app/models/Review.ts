export class Review
{
reviewId?:number=0;
rating?:number=0;
comment?:string='';
userId?:number=0;
// [JsonIgnore] public Users? User { get; set; }
recipeId?:number=0;
// [JsonIgnore] public Recipe? Recipe { get; set; }
}
