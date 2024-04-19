import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  urlCategory: string = 'https://localhost:7266/api/Category';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.urlCategory);
  }

  //Version 3
  // getAll(): Category[] {
  //   return [
  //     { CategoryId: 1, Name: 'Hans' },
  //     { CategoryId: 2, Name: 'Jens' },
  //     { CategoryId: 3, Name: 'Peter' },
  //   ];
  // }
}
