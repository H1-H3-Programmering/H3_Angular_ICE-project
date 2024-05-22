import { Component } from '@angular/core';
import { Language } from '../../models/Language';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
})
export class LanguageComponent {
  languageList: Language[] = [];
  filteredLanguages: Language[] = [];
  languageForm: FormGroup;
  editingLanguage: Language | null = null;
  isFormVisible: boolean = false;
  searchText: string = '';

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
      this.filteredLanguages = [...this.languageList]; // Initialize filteredLanguages with all languages
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.cancelEdit(); // Reset form if hiding the form
    }
  }

  create(): void {
    if (this.languageForm.valid) {
      this.service.createLanguage(this.languageForm.value).subscribe(() => {
        this.getAllLanguages(); // Refresh language list
        this.languageForm.reset(); // Clear form
      });
    }
  }

  confirmDelete(languageId: number | undefined): void {
    if (languageId !== undefined) {
      this.service.deleteByLanguageId(languageId).subscribe(() => {
        this.getAllLanguages(); // Refresh language list
        this.cancelEdit();
      });
    } else {
      console.error('Invalid language ID');
    }
  }

  editLanguage(language: Language): void {
    this.editingLanguage = language;
    this.languageForm.patchValue({
      languageName: language.languageName,
    });
    this.isFormVisible = true; // Show the form
  }

  saveLanguage(): void {
    if (this.languageForm.valid) {
      const languageName = this.languageForm.value.languageName;

      if (this.editingLanguage) {
        const updatedLanguage: Language = {
          ...this.editingLanguage,
          languageName: languageName,
        };

        // Call the service's updateLanguage method
        this.service.updateLanguage(updatedLanguage).subscribe(() => {
          this.getAllLanguages(); // Refresh language list
          this.cancelEdit();
        });
      } else {
        this.create(); // Call the create method for new language
      }
    }
  }

  cancelEdit(): void {
    this.editingLanguage = null;
    this.languageForm.reset();
    this.isFormVisible = false; // Close the form
  }

  searchLanguages(): void {
    this.filteredLanguages = this.languageList.filter(
      (language) =>
        language.languageName &&
        language.languageName
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
    );
  }
}
