import { Component } from '@angular/core';
import { DietaryPreferences } from '../../models/DietaryPreferences';
import { ICEServiceService } from '../../services/ice-service.service';

@Component({
  selector: 'app-dietary-preferences',
  templateUrl: './dietary-preferences.component.html',
  styleUrl: './dietary-preferences.component.css',
})
export class DietaryPreferencesComponent {
  dietaryPreferencesList: DietaryPreferences[] = [];

  ngOnInit(): void {
    this.service.getAllDietaryPreferences().subscribe((data) => {
      this.dietaryPreferencesList = data;
      console.log(data);
    });
  }

  constructor(private service: ICEServiceService<DietaryPreferences>) {}
}
