import { Component } from '@angular/core';
import { UserFavorite } from '../../models/UserFavorite';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrls: ['./user-favorite.component.css'],
})
export class UserFavoriteComponent {
  userFavoriteList: UserFavorite[] = [];
  filteredUserFavorites: UserFavorite[] = [];
  userFavoriteForm: FormGroup;
  editingUserFavorite: UserFavorite | null = null;
  isFormVisible: boolean = false;
  searchText: string = '';

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
      this.filteredUserFavorites = [...this.userFavoriteList]; // Initialize filteredUserFavorites with all user favorites
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.cancelEdit(); // Reset form if hiding the form
    }
  }

  create(): void {
    if (this.userFavoriteForm.valid) {
      this.service
        .createComment(this.userFavoriteForm.value)
        .subscribe((response) => {
          this.getAllUserFavorites(); // Refresh user favorite list
          this.userFavoriteForm.reset(); // Clear form
        });
    }
  }

  confirmDelete(userFavoriteId: number | undefined): void {
    if (userFavoriteId !== undefined) {
      this.service.deleteByUserFavoriteId(userFavoriteId).subscribe(() => {
        this.getAllUserFavorites(); // Refresh user favorite list
        this.cancelEdit();
      });
    } else {
      console.error('Invalid user favorite ID');
    }
  }

  editUserFavorite(userFavorite: UserFavorite): void {
    this.editingUserFavorite = userFavorite;
    this.userFavoriteForm.patchValue({
      userId: userFavorite.userId,
    });
    this.isFormVisible = true; // Show the form
  }

  saveUserFavorite(): void {
    if (this.userFavoriteForm.valid) {
      const userId = this.userFavoriteForm.value.userId;

      if (this.editingUserFavorite) {
        const updatedUserFavorite: UserFavorite = {
          ...this.editingUserFavorite,
          userId: userId,
        };

        // Call the service's updateUserFavorite method
        this.service.updateUserFavorite(updatedUserFavorite).subscribe(() => {
          this.getAllUserFavorites(); // Refresh user favorite list
          this.cancelEdit();
        });
      } else {
        this.create(); // Call the create method for new user favorite
      }
    }
  }

  cancelEdit(): void {
    this.editingUserFavorite = null;
    this.userFavoriteForm.reset();
    this.isFormVisible = false; // Close the form
  }

  searchUserFavorites(): void {
    this.filteredUserFavorites = this.userFavoriteList.filter(
      (userFavorite) =>
        userFavorite.userId &&
        userFavorite.userId
          .toString()
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
    );
  }
}
