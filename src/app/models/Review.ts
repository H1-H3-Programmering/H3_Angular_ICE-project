export class Review
{
ReviewId?:number=0;
Rating?:number=0;
Comment?:string='';
UserId?:number=0;
// [JsonIgnore] public Users? User { get; set; }
RecipeId?:number=0;
// [JsonIgnore] public Recipe? Recipe { get; set; }
}
