import { Component } from '@angular/core';
import { UserHistory } from '../../models/UserHistory';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.css',
})
export class UserHistoryComponent {
  userHistoryList: UserHistory[] = [];
  userHistoryForm: FormGroup;
  selectedEntityId: number | null = null; // Property to store the selected entity ID
  showCommentsBtn: boolean = false;

  constructor(private service: ICEServiceService<UserHistory>) {
    this.userHistoryForm = new FormGroup({
      userId: new FormControl(null, [Validators.required]),
      recipeId: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllUserHistories();
  }

  getAllUserHistories(): void {
    this.service.getAllUserHistory().subscribe((data) => {
      this.userHistoryList = data;
      console.log(data);
    });
  }

  create(): void {
    console.log(this.userHistoryForm.value);
    // Call the service method to create a user
    this.service
      .createUserHistory(this.userHistoryForm.value)
      .subscribe((response) => {
        console.log('User History created successfully:', response);
        // Optionally, you can refresh the user list after creation
        this.getAllUserHistories();
      });
  }

  confirmDelete(): void {
    if (this.selectedEntityId !== null) {
      // Call the deleteById method with the selectedEntityId
      this.service.deleteByUserHistoryId(this.selectedEntityId).subscribe(
        () => {
          console.log('Entity deleted successfully');
          this.getAllUserHistories();
          // Optionally, update the categoryList after deletion
          this.userHistoryList = this.userHistoryList.filter(
            (userhistories) => userhistories.userHistoryId !== this.selectedEntityId
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
