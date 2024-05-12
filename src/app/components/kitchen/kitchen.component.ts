import { Component, OnInit } from '@angular/core';
import { Kitchen } from '../../models/Kitchen';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css'],
})
export class KitchenComponent implements OnInit {
  kitchenList: Kitchen[] = [];
  filteredKitchens: Kitchen[] = [];
  kitchenForm: FormGroup;
  editingKitchen: Kitchen | null = null;
  isFormVisible: boolean = false;
  searchText: string = '';

  constructor(private service: ICEServiceService<Kitchen>) {
    this.kitchenForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      countryId: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllKitchens();
  }

  getAllKitchens(): void {
    this.service.getAllKitchens().subscribe((data) => {
      this.kitchenList = data;
      this.filteredKitchens = [...this.kitchenList]; // Initialize filteredKitchens with all kitchens
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.cancelEdit(); // Reset form if hiding the form
    }
  }

  create(): void {
    if (this.kitchenForm.valid) {
      this.service
        .createKitchen(this.kitchenForm.value)
        .subscribe((response) => {
          this.getAllKitchens(); // Refresh kitchen list
          this.kitchenForm.reset(); // Clear form
        });
    }
  }

  deleteKitchen(kitchenId: number | null): void {
    if (kitchenId !== null) {
      this.service.deleteByKitchenId(kitchenId).subscribe(() => {
        this.getAllKitchens(); // Refresh kitchen list
        this.cancelEdit();
      });
    } else {
      console.error('Invalid kitchen ID');
    }
  }

  editKitchen(kitchen: Kitchen): void {
    this.editingKitchen = kitchen;
    this.kitchenForm.patchValue({
      name: kitchen.name,
      countryId: kitchen.countryId,
    });
    this.isFormVisible = true; // Show the form
  }

  saveKitchen(): void {
    if (this.kitchenForm.valid) {
      const name = this.kitchenForm.value.name;
      const countryId = this.kitchenForm.value.countryId;

      if (this.editingKitchen) {
        const updatedKitchen: Kitchen = {
          ...this.editingKitchen,
          name: name,
          countryId: countryId,
        };

        // Call the service's updateKitchen method
        this.service.updateKitchen(updatedKitchen).subscribe(() => {
          this.getAllKitchens(); // Refresh kitchen list
          this.cancelEdit();
        });
      } else {
        this.create(); // Call the create method for new kitchen
      }
    }
  }

  cancelEdit(): void {
    this.editingKitchen = null;
    this.kitchenForm.reset();
    this.isFormVisible = false; // Close the form
  }

  searchKitchens(): void {
    this.filteredKitchens = this.kitchenList.filter(
      (kitchen) =>
        kitchen.name &&
        kitchen.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
