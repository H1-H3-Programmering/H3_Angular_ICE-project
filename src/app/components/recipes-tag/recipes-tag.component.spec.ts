import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesTagComponent } from './recipes-tag.component';

describe('RecipesTagComponent', () => {
  let component: RecipesTagComponent;
  let fixture: ComponentFixture<RecipesTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipesTagComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
