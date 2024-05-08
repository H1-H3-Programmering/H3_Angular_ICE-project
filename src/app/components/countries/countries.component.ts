import { Component } from '@angular/core';
import { Countries } from '../../models/Countries';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent {
  countriesList: Countries[] = [];
  filteredCountries: Countries[] = [];
  countryForm: FormGroup;
  editingCountry: Countries | null = null;
  isFormVisible: boolean = false;
  searchText: string = '';

  constructor(private service: ICEServiceService<Countries>) {
    this.countryForm = new FormGroup({
      countryName: new FormControl('', [Validators.required]),
      continent: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllCountries();
  }

  getAllCountries(): void {
    this.service.getAllCountries().subscribe((data) => {
      this.countriesList = data;
      this.filteredCountries = [...this.countriesList]; // Initialize filteredCountries with all countries
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.cancelEdit(); // Reset form if hiding the form
    }
  }

  create(): void {
    if (this.countryForm.valid) {
      this.service
        .createCountry(this.countryForm.value)
        .subscribe((response) => {
          this.getAllCountries(); // Refresh country list
          this.countryForm.reset(); // Clear form
        });
    }
  }

  deleteCountry(countryId: number | undefined): void {
    if (countryId !== undefined) {
      this.service.deleteByCountryId(countryId).subscribe(() => {
        this.getAllCountries(); // Refresh country list
        this.cancelEdit();
      });
    } else {
      console.error('Invalid country ID');
    }
  }

  editCountry(country: Countries): void {
    this.editingCountry = country;
    this.countryForm.patchValue({
      countryName: country.countryName,
      continent: country.continent,
    });
    this.isFormVisible = true; // Show the form
  }

  saveCountry(): void {
    if (this.countryForm.valid) {
      const countryName = this.countryForm.value.countryName;
      const continent = this.countryForm.value.continent;

      if (this.editingCountry) {
        const updatedCountry: Countries = {
          ...this.editingCountry,
          countryName: countryName,
          continent: continent,
        };

        // Call the service's updateCountry method
        this.service.updateCountry(updatedCountry).subscribe(() => {
          this.getAllCountries(); // Refresh country list
          this.cancelEdit();
        });
      } else {
        this.create(); // Call the create method for new country
      }
    }
  }

  cancelEdit(): void {
    this.editingCountry = null;
    this.countryForm.reset();
    this.isFormVisible = false; // Close the form
  }

  searchCountries(): void {
    this.filteredCountries = this.countriesList.filter(
      (country) =>
        country.countryName &&
        country.countryName
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
    );
  }
}
