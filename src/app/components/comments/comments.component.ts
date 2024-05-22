import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICEServiceService } from '../../services/ice-service.service';
import { Comments } from '../../models/Comments';
import { Category } from '../../models/Category'; // Import Category type

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent {
  commentsList: Comments[] = [];
  filteredComments: Comments[] = [];
  commentsForm: FormGroup;
  editingComment: Comments | null = null;
  isFormVisible: boolean = false;
  searchText: string = '';

  constructor(private service: ICEServiceService<Comments>) {
    this.commentsForm = new FormGroup({
      userId: new FormControl(null, [Validators.required]),
      recipeId: new FormControl(null, [Validators.required]),
      text: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  ngOnInit(): void {
    this.getAllComments();
  }

  getAllComments(): void {
    this.service.getAllComments().subscribe((data) => {
      this.commentsList = data;
      this.filteredComments = [...this.commentsList]; // Initialize filteredComments with all comments
      // Remove the searchComments() call from here
    });
  }

  create(): void {
    if (this.commentsForm.valid) {
      this.service
        .createComment(this.commentsForm.value)
        .subscribe((response) => {
          this.getAllComments(); // Refresh comment list
          this.commentsForm.reset(); // Clear form
        });
    }
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.cancelEdit(); // Reset form if hiding the form
    }
  }

  deleteComment(commentId: number | undefined): void {
    if (commentId !== undefined) {
      this.service.deleteByCommentId(commentId).subscribe(() => {
        this.getAllComments(); // Refresh comment list
        this.cancelEdit();
      });
    } else {
      console.error('Invalid comment ID');
    }
  }

  editComment(comment: Comments): void {
    this.editingComment = comment;
    this.commentsForm.patchValue({
      userId: comment.userId,
      recipeId: comment.recipeId,
      text: comment.text,
    });
    this.isFormVisible = true; // Show the form
  }

  saveComment(): void {
    if (this.commentsForm.valid) {
      const userId = this.commentsForm.value.userId;
      const recipeId = this.commentsForm.value.recipeId;
      const text = this.commentsForm.value.text;

      if (this.editingComment) {
        const updatedComment: Comments = {
          ...this.editingComment,
          userId: userId,
          recipeId: recipeId,
          text: text,
        };

        // Call the service's updateComment method
        this.service.updateComment(updatedComment).subscribe(() => {
          this.getAllComments(); // Refresh comment list
          this.cancelEdit();
        });
      } else {
        this.create(); // Call the create method for new comment
      }
    }
  }

  cancelEdit(): void {
    this.editingComment = null;
    this.commentsForm.reset();
    this.isFormVisible = false; // Close the form
  }

  searchComments(): void {
    this.filteredComments = this.commentsList.filter(
      (comment) =>
        comment.text &&
        comment.text.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
