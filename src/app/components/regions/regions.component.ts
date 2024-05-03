import { Component } from '@angular/core';
import { Regions } from '../../models/Regions';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrl: './regions.component.css',
})
export class RegionsComponent {
  regionsList: Regions[] = [];
  regionForm: FormGroup;
  selectedEntityId: number | null = null; // Property to store the selected entity ID
  showCommentsBtn: boolean = false;

  constructor(private service: ICEServiceService<Regions>) {
    this.regionForm = new FormGroup({
      regionName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      countryId: new FormControl(null, [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.getAllRegions();
  }

  getAllRegions(): void {
    this.service.getAllRegions().subscribe((data) => {
      this.regionsList = data;
      console.log(data);
    });
  }

  create(): void {
    console.log(this.regionForm.value);
    // Call the service method to create a user
    this.service.createRegion(this.regionForm.value).subscribe((response) => {
      console.log('Region created successfully:', response);
      // Optionally, you can refresh the user list after creation
      this.getAllRegions();
    });
  }

  confirmDelete(): void {
    if (this.selectedEntityId !== null) {
      // Call the deleteById method with the selectedEntityId
      this.service.deleteByRegionId(this.selectedEntityId).subscribe(
        () => {
          console.log('Entity deleted successfully');
          this.getAllRegions();
          // Optionally, update the categoryList after deletion
          this.regionsList = this.regionsList.filter(
            (regions) => regions.regionId !== this.selectedEntityId
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
