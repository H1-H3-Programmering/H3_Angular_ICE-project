import { Component } from '@angular/core';
import { Regions } from '../../models/Regions';
import { ICEServiceService } from '../../services/ice-service.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrl: './regions.component.css',
})
export class RegionsComponent {
  regionsList: Regions[] = [];

  ngOnInit(): void {
    this.service.getAllRegions().subscribe((data) => {
      this.regionsList = data;
      console.log(data);
    });
  }

  constructor(private service: ICEServiceService<Regions>) {}
}
