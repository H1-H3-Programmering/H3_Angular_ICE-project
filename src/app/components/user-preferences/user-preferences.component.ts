import { Component } from '@angular/core';
import { UserPreferences } from '../../models/UserPreferences';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css'],
})
export class UserPreferencesComponent {
  userPreferencesList: UserPreferences[] = [];
  filteredUserPreferences: UserPreferences[] = [];
  userPreferenceForm: FormGroup;
  editingUserPreference: UserPreferences | null = null;
  isFormVisible: boolean = false;
  searchText: string = '';

  constructor(private service: ICEServiceService<UserPreferences>) {
    this.userPreferenceForm = new FormGroup({
      preferenceId: new FormControl(null, [Validators.required]),
      preferenceType: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      preferenceDescription: new FormControl('', [
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
      this.filteredUserPreferences = [...this.userPreferencesList]; // Initialize filteredUserPreferences with all user preferences
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.cancelEdit(); // Reset form if hiding the form
    }
  }

  create(): void {
    if (this.userPreferenceForm.valid) {
      this.service
        .createUserPreference(this.userPreferenceForm.value)
        .subscribe(() => {
          this.getAllUserPreferences(); // Refresh user preferences list
          this.userPreferenceForm.reset(); // Clear form
        });
    }
  }

  deletePreference(preferenceId: number | undefined): void {
    if (preferenceId !== undefined) {
      this.service.deleteByUserPreferenceId(preferenceId).subscribe(() => {
        this.getAllUserPreferences();
        this.cancelEdit();
      });
    } else {
      console.error('Invalid preference ID');
    }
  }

  editPreference(preference: UserPreferences): void {
    this.editingUserPreference = preference;
    this.userPreferenceForm.patchValue({
      preferenceId: preference.preferenceId,
      preferenceType: preference.preferenceType,
      preferenceDescription: preference.preferenceDisription,
    });
    this.isFormVisible = true;
  }

  savePreference(): void {
    if (this.userPreferenceForm.valid) {
      const preferenceId = this.userPreferenceForm.value.preferenceId;
      const preferenceType = this.userPreferenceForm.value.preferenceType;
      const preferenceDescription =
        this.userPreferenceForm.value.preferenceDescription;

      if (this.editingUserPreference) {
        const updatedPreference: UserPreferences = {
          ...this.editingUserPreference,
          preferenceId: preferenceId,
          preferenceType: preferenceType,
          preferenceDisription: preferenceDescription,
        };

        this.service.updateUserPreference(updatedPreference).subscribe(() => {
          this.getAllUserPreferences();
          this.cancelEdit();
        });
      } else {
        this.create();
      }
    }
  }

  cancelEdit(): void {
    this.editingUserPreference = null;
    this.userPreferenceForm.reset();
    this.isFormVisible = false; // Close the form
  }

  searchPreferences(): void {
    this.filteredUserPreferences = this.userPreferencesList.filter(
      (preference) =>
        preference.preferenceType &&
        preference.preferenceType
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
    );
  }
}
