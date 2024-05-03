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
      userId: new FormControl(null, [Validators.required]),
      recipeId: new FormControl(null, [Validators.required]),
      text: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  ngOnInit(): void {
    this.getAllComments();
    console.log(this.getAllComments);
  }

  getAllComments(): void {
    this.service.getAllComments().subscribe((data) => {
      this.commentsList = data;
      console.log(data);
    });
  }

create(): void {
    console.log(this.commentsForm.value);
    // Call the service method to create a user
    this.service.createComment(this.commentsForm.value).subscribe((response) => {
        console.log('Category created successfully:', response);
        // Optionally, you can refresh the user list after creation
        this.getAllComments();
      });
}

  confirmDelete(): void {
    if (this.selectedEntityId !== null) {
      // Call the deleteById method with the selectedEntityId
      this.service.deleteByCommentId(this.selectedEntityId).subscribe(
        () => {
          console.log('Entity deleted successfully');
          this.getAllComments();
          // Optionally, update the categoryList after deletion
          this.commentsList = this.commentsList.filter(
            (comments) => comments.commentId !== this.selectedEntityId
          );
          // Reset the selectedEntityId after deletion
          this.selectedEntityId = null;
        },
        (error) => {
          console.error('Error deleting entity:', error);
        }
      );
    } else {
      console.warn('No entity selected for deletion.');
    }
  }


}
