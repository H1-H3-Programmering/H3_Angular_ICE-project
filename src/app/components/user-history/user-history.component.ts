import { Component } from '@angular/core';
import { UserHistory } from '../../models/UserHistory';
import { ICEServiceService } from '../../services/ice-service.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.css',
})
export class UserHistoryComponent {
  userHistoryList: UserHistory[] = [];

  ngOnInit(): void {
    this.service.getAllUserHistory().subscribe((data) => {
      this.userHistoryList = data;
      console.log(data);
    });
  }

  constructor(private service: ICEServiceService) {}
}
