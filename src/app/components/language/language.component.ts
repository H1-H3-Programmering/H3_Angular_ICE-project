import { Component } from '@angular/core';
import { Language } from '../../models/Language';
import { ICEServiceService } from '../../services/ice-service.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrl: './language.component.css',
})
export class LanguageComponent {
  languageList: Language[] = [];

  ngOnInit(): void {
    this.service.getAllLanguage().subscribe((data) => {
      this.languageList = data;
      console.log(data);
    });
  }

  constructor(private service: ICEServiceService<Language>) {}
}
