import { Component } from '@angular/core';
import { UserHistory } from '../../models/UserHistory';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css'],
})
export class UserHistoryComponent {
  userHistoryList: UserHistory[] = [];
  filteredUserHistory: UserHistory[] = [];
  userHistoryForm: FormGroup;
  editingUserHistory: UserHistory | null = null;
  isFormVisible: boolean = false;
  searchText: string = '';

  constructor(private service: ICEServiceService<UserHistory>) {
    this.userHistoryForm = new FormGroup({
      userId: new FormControl(null, [Validators.required]),
      recipeId: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllUserHistories();
  }

  getAllUserHistories(): void {
    this.service.getAllUserHistory().subscribe((data) => {
      this.userHistoryList = data;
      this.filteredUserHistory = [...this.userHistoryList];
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.cancelEdit();
    }
  }

  create(): void {
    if (this.userHistoryForm.valid) {
      this.service
        .createUserHistory(this.userHistoryForm.value)
        .subscribe((response) => {
          this.getAllUserHistories();
          this.userHistoryForm.reset();
        });
    }
  }

  deleteHistory(historyId: number | undefined): void {
    if (historyId !== undefined) {
      this.service.deleteByUserHistoryId(historyId).subscribe(() => {
        this.getAllUserHistories();
        this.cancelEdit();
      });
    } else {
      console.error('Invalid history ID');
    }
  }

  editHistory(history: UserHistory): void {
    this.editingUserHistory = history;
    this.userHistoryForm.patchValue({
      userId: history.userId,
      recipeId: history.recipeId,
    });
    this.isFormVisible = true;
  }

  saveHistory(): void {
    if (this.userHistoryForm.valid) {
      const userId = this.userHistoryForm.value.userId;
      const recipeId = this.userHistoryForm.value.recipeId;

      if (this.editingUserHistory) {
        const updatedHistory: UserHistory = {
          ...this.editingUserHistory,
          userId: userId,
          recipeId: recipeId,
        };

        this.service.updateUserHistory(updatedHistory).subscribe(() => {
          this.getAllUserHistories();
          this.cancelEdit();
        });
      } else {
        this.create();
      }
    }
  }

  cancelEdit(): void {
    this.editingUserHistory = null;
    this.userHistoryForm.reset();
    this.isFormVisible = false;
  }

  searchHistory(): void {
    this.filteredUserHistory = this.userHistoryList.filter(
      (history) =>
        history.userId &&
        history.userId.toString().includes(this.searchText.toLowerCase())
    );
  }
}
