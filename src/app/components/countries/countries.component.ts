import { Component } from '@angular/core';
import { Countries } from '../../models/Countries';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css',
})
export class CountriesComponent {
  countriesList: Countries[] = [];
  countryForm: FormGroup;
  selectedEntityId: number | null = null; // Property to store the selected entity ID
  showCommentsBtn: boolean = false;

  constructor(private service: ICEServiceService<Countries>) {
    this.countryForm = new FormGroup({
      countryName: new FormControl('', [Validators.required]),
      continent: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllCountries();
    console.log(this.getAllCountries());
  } // End of ngOnInit

  getAllCountries(): void {
    this.service.getAllCountries().subscribe((data) => {
      this.countriesList = data;
      console.log(data);
    });
  }

  create(): void {
    console.log(this.countryForm.value);
    // Call the service method to create a user
    this.service.createCountry(this.countryForm.value).subscribe((response) => {
      console.log('Country created successfully:', response);
      // Optionally, you can refresh the user list after creation
      this.getAllCountries();
    });
  }

  confirmDelete(): void {
    if (this.selectedEntityId !== null) {
      // Call the deleteById method with the selectedEntityId
      this.service.deleteByCommentId(this.selectedEntityId).subscribe(
        () => {
          console.log('Entity deleted successfully');
          this.getAllCountries();
          // Optionally, update the categoryList after deletion
          this.countriesList = this.countriesList.filter(
            (countries) => countries.countryId !== this.selectedEntityId
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
