import { Component } from '@angular/core';
import { Review } from '../../models/Review';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  reviewList: Review[] = [];
  reviewForm: FormGroup;
  selectedEntityId: number | null = null; // Property to store the selected entity ID
  showCommentsBtn: boolean = false;

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
      console.log(data);
    });
  }

  create(): void {
    console.log(this.reviewForm.value);
    // Call the service method to create a user
    this.service.createReview(this.reviewForm.value).subscribe((response) => {
      console.log('Review created successfully:', response);
      // Optionally, you can refresh the user list after creation
      this.getAllReviews();
    });
  }

  confirmDelete(): void {
    if (this.selectedEntityId !== null) {
      // Call the deleteById method with the selectedEntityId
      this.service.deleteByReviewId(this.selectedEntityId).subscribe(
        () => {
          console.log('Entity deleted successfully');
          this.getAllReviews();
          // Optionally, update the categoryList after deletion
          this.reviewList = this.reviewList.filter(
            (reviews) => reviews.reviewId !== this.selectedEntityId
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
