import { Component } from '@angular/core';
import { DietaryPreferences } from '../../models/DietaryPreferences';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dietary-preferences',
  templateUrl: './dietary-preferences.component.html',
  styleUrls: ['./dietary-preferences.component.css'],
})
export class DietaryPreferencesComponent {
  dietaryPreferencesList: DietaryPreferences[] = [];
  filteredDietaryPreferences: DietaryPreferences[] = [];
  dietaryPreferencesForm: FormGroup;
  editingDietaryPreference: DietaryPreferences | null = null;
  isFormVisible: boolean = false;
  searchText: string = '';

  constructor(private service: ICEServiceService<DietaryPreferences>) {
    this.dietaryPreferencesForm = new FormGroup({
      preferenceId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllDietaryPreferences();
  }

  getAllDietaryPreferences(): void {
    this.service.getAllDietaryPreferences().subscribe((data) => {
      this.dietaryPreferencesList = data;
      this.filteredDietaryPreferences = [...this.dietaryPreferencesList]; // Initialize filteredDietaryPreferences with all dietary preferences
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.cancelEdit(); // Reset form if hiding the form
    }
  }

  create(): void {
    if (this.dietaryPreferencesForm.valid) {
      this.service
        .createDietaryPreference(this.dietaryPreferencesForm.value)
        .subscribe((response) => {
          this.getAllDietaryPreferences(); // Refresh dietary preferences list
          this.dietaryPreferencesForm.reset(); // Clear form
        });
    }
  }

  confirmDelete(): void {
    if (this.editingDietaryPreference?.preferenceId !== undefined) {
      this.service
        .deleteByDietaryPreferenceId(
          this.editingDietaryPreference?.preferenceId
        )
        .subscribe(() => {
          this.getAllDietaryPreferences(); // Refresh dietary preferences list
          this.cancelEdit();
        });
    } else {
      console.error('Invalid dietary preference ID');
    }
  }

  editDietaryPreference(dietaryPreference: DietaryPreferences): void {
    this.editingDietaryPreference = dietaryPreference;
    this.dietaryPreferencesForm.patchValue({
      preferenceId: dietaryPreference.preferenceId,
    });
    this.isFormVisible = true; // Show the form
  }

  saveDietaryPreference(): void {
    if (this.dietaryPreferencesForm.valid) {
      const preferenceId = this.dietaryPreferencesForm.value.preferenceId;

      if (this.editingDietaryPreference) {
        const updatedDietaryPreference: DietaryPreferences = {
          ...this.editingDietaryPreference,
          preferenceId: preferenceId,
        };

        // Call the service's updateDietaryPreference method
        this.service
          .updateDietaryPreference(updatedDietaryPreference)
          .subscribe(() => {
            this.getAllDietaryPreferences(); // Refresh dietary preferences list
            this.cancelEdit();
          });
      } else {
        this.create(); // Call the create method for new dietary preference
      }
    }
  }

  cancelEdit(): void {
    this.editingDietaryPreference = null;
    this.dietaryPreferencesForm.reset();
    this.isFormVisible = false; // Close the form
  }

  searchDietaryPreferences(): void {
    this.filteredDietaryPreferences = this.dietaryPreferencesList.filter(
      (dietaryPreference) =>
        dietaryPreference.preferenceId &&
        dietaryPreference.preferenceId
          .toString()
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
    );
  }
}
