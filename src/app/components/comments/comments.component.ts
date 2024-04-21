import { Component } from '@angular/core';
import { Comments } from '../../models/Comments';
import { ICEServiceService } from '../../services/ice-service.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  commentsList: Comments[] = [];

  ngOnInit(): void {
    this.service.getAllComments().subscribe((data) => {
      this.commentsList = data;
      console.log(data);
    });
  }

  constructor(private service: ICEServiceService) {}
}
