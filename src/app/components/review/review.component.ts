import { Component } from '@angular/core';
import { Review } from '../../models/Review';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent {
  reviewList: Review[] = [];
  filteredReviews: Review[] = [];
  reviewForm: FormGroup;
  editingReview: Review | null = null;
  isFormVisible: boolean = false;
  searchText: string = '';

  constructor(private service: ICEServiceService<Review>) {
    this.reviewForm = new FormGroup({
      rating: new FormControl(null, [Validators.required]),
      comment: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      userId: new FormControl(null, [Validators.required]),
      recipeId: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllReviews();
  }

  getAllReviews(): void {
    this.service.getAllReviews().subscribe((data) => {
      this.reviewList = data;
      this.filteredReviews = [...this.reviewList]; // Initialize filteredReviews with all reviews
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.cancelEdit(); // Reset form if hiding the form
    }
  }

  create(): void {
    if (this.reviewForm.valid) {
      this.service.createReview(this.reviewForm.value).subscribe(() => {
        this.getAllReviews(); // Refresh review list
        this.reviewForm.reset(); // Clear form
      });
    }
  }

deleteReview(reviewId: number | undefined): void {
    if (reviewId !== undefined) {
      this.service.deleteByReviewId(reviewId).subscribe(() => {
        this.getAllReviews(); // Refresh review list
        this.cancelEdit();
      });
    } else {
      console.error('Invalid review ID');
    }
}


  editReview(review: Review): void {
    this.editingReview = review;
    this.reviewForm.patchValue({
      rating: review.rating,
      comment: review.comment,
      userId: review.userId,
      recipeId: review.recipeId,
    });
    this.isFormVisible = true; // Show the form
  }

  saveReview(): void {
    if (this.reviewForm.valid) {
      const rating = this.reviewForm.value.rating;
      const comment = this.reviewForm.value.comment;
      const userId = this.reviewForm.value.userId;
      const recipeId = this.reviewForm.value.recipeId;

      if (this.editingReview) {
        const updatedReview: Review = {
          ...this.editingReview,
          rating: rating,
          comment: comment,
          userId: userId,
          recipeId: recipeId,
        };

        // Call the service's updateReview method
        this.service.updateReview(updatedReview).subscribe(() => {
          this.getAllReviews(); // Refresh review list
          this.cancelEdit();
        });
      } else {
        this.create(); // Call the create method for new review
      }
    }
  }

  cancelEdit(): void {
    this.editingReview = null;
    this.reviewForm.reset();
    this.isFormVisible = false; // Close the form
  }

  searchReviews(): void {
    this.filteredReviews = this.reviewList.filter(
      (review) =>
        review.comment &&
        review.comment.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
