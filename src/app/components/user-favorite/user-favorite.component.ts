import { Component } from '@angular/core';
import { UserFavorite } from '../../models/UserFavorite';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrl: './user-favorite.component.css',
})
export class UserFavoriteComponent {
  userFavoriteList: UserFavorite[] = [];
  userFavoriteForm: FormGroup;
  selectedEntityId: number | null = null; // Property to store the selected entity ID
  showCommentsBtn: boolean = false;

  constructor(private service: ICEServiceService<UserFavorite>) {
    this.userFavoriteForm = new FormGroup({
      userId: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllUserFavorites();
  }

  getAllUserFavorites(): void {
    this.service.getAllUserFavorites().subscribe((data) => {
      this.userFavoriteList = data;
      console.log(data);
    });
  }

  create(): void {
    console.log(this.userFavoriteForm.value);
    // Call the service method to create a user
    this.service
      .createComment(this.userFavoriteForm.value)
      .subscribe((response) => {
        console.log('User Favorite created successfully:', response);
        // Optionally, you can refresh the user list after creation
        this.getAllUserFavorites();
      });
  }

  confirmDelete(): void {
    if (this.selectedEntityId !== null) {
      // Call the deleteById method with the selectedEntityId
      this.service.deleteByUserFavoriteId(this.selectedEntityId).subscribe(
        () => {
          console.log('Entity deleted successfully');
          this.getAllUserFavorites();
          // Optionally, update the categoryList after deletion
          this.userFavoriteList = this.userFavoriteList.filter(
            (userFavorites) => userFavorites.userFavoriteId !== this.selectedEntityId
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
