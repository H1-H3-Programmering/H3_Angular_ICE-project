import { Component } from '@angular/core';
import { DietaryPreferences } from '../../models/DietaryPreferences';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dietary-preferences',
  templateUrl: './dietary-preferences.component.html',
  styleUrl: './dietary-preferences.component.css',
})
export class DietaryPreferencesComponent {
  dietaryPreferencesList: DietaryPreferences[] = [];
  dietaryPreferencesForm: FormGroup;
  selectedEntityId: number | null = null; // Property to store the selected entity ID
  showCommentsBtn: boolean = false;

  constructor(private service: ICEServiceService<DietaryPreferences>) {
    this.dietaryPreferencesForm = new FormGroup({
      preferenceId: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllDietaryPreferences();
    console.log(this.getAllDietaryPreferences);
  }

  getAllDietaryPreferences(): void {
    this.service.getAllDietaryPreferences().subscribe((data) => {
      this.dietaryPreferencesList = data;
      console.log(data);
    });
  }

  create(): void {
    console.log(this.dietaryPreferencesForm.value);
    // Call the service method to create a user
    this.service
      .createDietaryPreference(this.dietaryPreferencesForm.value)
      .subscribe((response) => {
        console.log('Dietary Preference created successfully:', response);
        // Optionally, you can refresh the user list after creation
        this.getAllDietaryPreferences();
      });
  }

  confirmDelete(): void {
    if (this.selectedEntityId !== null) {
      // Call the deleteById method with the selectedEntityId
      this.service.deleteByDietaryPreferenceId(this.selectedEntityId).subscribe(
        () => {
          console.log('Entity deleted successfully');
          this.getAllDietaryPreferences();
          // Optionally, update the categoryList after deletion
          this.dietaryPreferencesList = this.dietaryPreferencesList.filter(
            (dietaryPreference) =>
              dietaryPreference.dietaryPreferenceId !== this.selectedEntityId
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
