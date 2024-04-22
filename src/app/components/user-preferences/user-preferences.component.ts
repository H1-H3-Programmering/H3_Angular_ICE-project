import { Component } from '@angular/core';
import { UserPreferences } from '../../models/UserPreferences';
import { ICEServiceService } from '../../services/ice-service.service';

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrl: './user-preferences.component.css',
})
export class UserPreferencesComponent {
  userPreferencesList: UserPreferences[] = [];

  ngOnInit(): void {
    this.service.getAllUserPreferences().subscribe((data) => {
      this.userPreferencesList = data;
      console.log(data);
    });
  }

  constructor(private service: ICEServiceService<UserPreferences>) {}
}
