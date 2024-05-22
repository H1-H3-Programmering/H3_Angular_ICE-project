import { Component } from '@angular/core';
import { Regions } from '../../models/Regions';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css'],
})
export class RegionsComponent {
  regionsList: Regions[] = [];
  filteredRegions: Regions[] = [];
  regionForm: FormGroup;
  editingRegion: Regions | null = null;
  isFormVisible: boolean = false;
  searchText: string = '';

  constructor(private service: ICEServiceService<Regions>) {
    this.regionForm = new FormGroup({
      regionName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
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
      this.filteredRegions = [...this.regionsList];
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.cancelEdit();
    }
  }

  create(): void {
    if (this.regionForm.valid) {
      this.service.createRegion(this.regionForm.value).subscribe(() => {
        this.getAllRegions();
        this.regionForm.reset();
      });
    }
  }

  confirmDelete(regionId: number | undefined): void {
    if (regionId !== undefined) {
      this.service.deleteByRegionId(regionId).subscribe(() => {
        this.getAllRegions();
        this.cancelEdit();
      });
    } else {
      console.error('Invalid region ID');
    }
  }

  editRegion(region: Regions): void {
    this.editingRegion = region;
    this.regionForm.patchValue({
      regionName: region.regionName,
      countryId: region.countryId,
    });
    this.isFormVisible = true;
  }

  saveRegion(): void {
    if (this.regionForm.valid) {
      const regionName = this.regionForm.value.regionName;
      const countryId = this.regionForm.value.countryId;

      if (this.editingRegion) {
        const updatedRegion: Regions = {
          ...this.editingRegion,
          regionName: regionName,
          countryId: countryId,
        };

        this.service.updateRegion(updatedRegion).subscribe(() => {
          this.getAllRegions();
          this.cancelEdit();
        });
      } else {
        this.create();
      }
    }
  }

  cancelEdit(): void {
    this.editingRegion = null;
    this.regionForm.reset();
    this.isFormVisible = false;
  }

  searchRegions(): void {
    this.filteredRegions = this.regionsList.filter((region) =>
      region.regionName?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
