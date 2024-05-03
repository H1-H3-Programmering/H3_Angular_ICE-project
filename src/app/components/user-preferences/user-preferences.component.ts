import { Component } from '@angular/core';
import { UserPreferences } from '../../models/UserPreferences';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrl: './user-preferences.component.css',
})
export class UserPreferencesComponent {
  userPreferencesList: UserPreferences[] = [];
  userPreferenceForm: FormGroup;
  selectedEntityId: number | null = null; // Property to store the selected entity ID
  showCommentsBtn: boolean = false;

  constructor(private service: ICEServiceService<UserPreferences>) {
    this.userPreferenceForm = new FormGroup({
      preferenceId: new FormControl(null, [Validators.required]),
      preferenceType: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      preferenceDisription: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  ngOnInit(): void {
    this.getAllUserPreferences();
  }

  getAllUserPreferences(): void {
    this.service.getAllUserPreferences().subscribe((data) => {
      this.userPreferencesList = data;
      console.log(data);
    });
  }

  create(): void {
    console.log(this.userPreferenceForm.value);
    // Call the service method to create a user
    this.service
      .createUserPreference(this.userPreferenceForm.value)
      .subscribe((response) => {
        console.log('User Preference created successfully:', response);
        // Optionally, you can refresh the user list after creation
        this.getAllUserPreferences();
      });
  }

  confirmDelete(): void {
    if (this.selectedEntityId !== null) {
      // Call the deleteById method with the selectedEntityId
      this.service.deleteByUserPreferenceId(this.selectedEntityId).subscribe(
        () => {
          console.log('Entity deleted successfully');
          this.getAllUserPreferences();
          // Optionally, update the categoryList after deletion
          this.userPreferencesList = this.userPreferencesList.filter(
            (userpreferences) => userpreferences.preferenceId !== this.selectedEntityId
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
