import { Component } from '@angular/core';
import { Countries } from '../../models/Countries';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css',
})
export class CountriesComponent {
  countriesList: Countries[] = [];
  countryForm: FormGroup;

  constructor(private service: ICEServiceService<Countries>) {
    this.countryForm = new FormGroup({
      countryName: new FormControl(''),
      continent: new FormControl(''),
    });
  }

  create(): void {
    console.log(this.countryForm.value);
    console.log(this.countryForm.value.countries);
    this.service.createCountry(this.countryForm.value).subscribe((response) => {
      console.log('Country created successfully:', response);
      this.getAllCountries();
    });
  }

  getAllCountries(): void {
    this.service.getAllCountries().subscribe((data) => {
      this.countriesList = data;
      console.log('All countries:', data);
    });
  }

  ngOnInit(): void {
    this.service.getAllCountries().subscribe((data) => {
      this.countriesList = data;
      console.log(data);
    });
  }
}
