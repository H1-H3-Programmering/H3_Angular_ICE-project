import { Component } from '@angular/core';
import { Kitchen } from '../../models/Kitchen';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css',
})
export class KitchenComponent {
  kitchenList: Kitchen[] = [];
  kitchenForm: FormGroup;
  selectedEntityId: number | null = null; // Property to store the selected entity ID
  showCommentsBtn: boolean = false;

  constructor(private service: ICEServiceService<Kitchen>) {
    this.kitchenForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      countryId: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllKitchens();
    console.log(this.getAllKitchens);
  }

  getAllKitchens(): void {
    this.service.getAllKitchens().subscribe((data) => {
      this.kitchenList = data;
      console.log(data);
    });
  }

  create(): void {
    console.log(this.kitchenForm.value);
    // Call the service method to create a user
    this.service.createKitchen(this.kitchenForm.value).subscribe((response) => {
      console.log('Comment created successfully:', response);
      // Optionally, you can refresh the user list after creation
      this.getAllKitchens();
    });
  }

  confirmDelete(): void {
    if (this.selectedEntityId !== null) {
      // Call the deleteById method with the selectedEntityId
      this.service.deleteByKitchenId(this.selectedEntityId).subscribe(
        () => {
          console.log('Entity deleted successfully');
          this.getAllKitchens();
          // Optionally, update the categoryList after deletion
          this.kitchenList = this.kitchenList.filter(
            (kitchen) => kitchen.kitchenId !== this.selectedEntityId
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
