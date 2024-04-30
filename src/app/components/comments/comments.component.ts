import { Component } from '@angular/core';
import { Comments } from '../../models/Comments';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  commentsList: Comments[] = [];
  commentsForm: FormGroup;
  selectedEntityId: number | null = null; // Property to store the selected entity ID
  showCommentsBtn: boolean = false;

  constructor(private service: ICEServiceService<Comments>) {
    this.commentsForm = new FormGroup({
      recipeId: new FormControl(null,[Validators.required]),
      text: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  ngOnInit(): void {
    this.service.getAllComments().subscribe((data) => {
      this.commentsList = data;
      console.log(data);
    });
  }

}
