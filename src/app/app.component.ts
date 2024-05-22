// app.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedCategory: string = ''; // Initialize selectedCategory

  // Method to show the selected category component
  showCategory(category: string): void {
    this.selectedCategory = category;
  }
}
