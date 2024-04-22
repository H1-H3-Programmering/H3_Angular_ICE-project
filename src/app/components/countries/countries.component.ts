import { Component } from '@angular/core';
import { Countries } from '../../models/Countries';
import { ICEServiceService } from '../../services/ice-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css',
})
export class CountriesComponent {
  countriesList: Countries[] = [];

  ngOnInit(): void {
    this.service.getAllCountries().subscribe((data) => {
      this.countriesList = data;
      console.log(data);
    });
  }

  constructor(private service: ICEServiceService<Countries>) {}
}
