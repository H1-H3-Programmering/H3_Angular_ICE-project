import { Component } from '@angular/core';
import { Language } from '../../models/Language';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrl: './language.component.css',
})
export class LanguageComponent {
  languageList: Language[] = [];
  languageForm: FormGroup;
  selectedEntityId: number | null = null; // Property to store the selected entity ID
  showCommentsBtn: boolean = false;

  constructor(private service: ICEServiceService<Language>) {
    this.languageForm = new FormGroup({
      languageName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  ngOnInit(): void {
    this.getAllLanguages();
  }

  getAllLanguages(): void {
    this.service.getAllLanguage().subscribe((data) => {
      this.languageList = data;
      console.log(data);
    });
  }

  create(): void {
    console.log(this.languageForm.value);
    // Call the service method to create a user
    this.service
      .createLanguage(this.languageForm.value)
      .subscribe((response) => {
        console.log('Language created successfully:', response);
        // Optionally, you can refresh the user list after creation
        this.getAllLanguages();
      });
  }

  confirmDelete(): void {
    if (this.selectedEntityId !== null) {
      // Call the deleteById method with the selectedEntityId
      this.service.deleteByLanguageId(this.selectedEntityId).subscribe(
        () => {
          console.log('Entity deleted successfully');
          this.getAllLanguages();
          // Optionally, update the categoryList after deletion
          this.languageList = this.languageList.filter(
            (language) => language.languageId !== this.selectedEntityId
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
