import { Component } from '@angular/core';
import { Review } from '../../models/Review';
import { ICEServiceService } from '../../services/ice-service.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  reviewList: Review[] = [];

  ngOnInit(): void {
    this.service.getAllReviews().subscribe((data) => {
      this.reviewList = data;
      console.log(data);
    });
  }

  constructor(private service: ICEServiceService) {}
}
