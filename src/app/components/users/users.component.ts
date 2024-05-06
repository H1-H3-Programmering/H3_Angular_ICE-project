import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/Users';
import { ICEServiceService } from '../../services/ice-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usersList: Users[] = [];
  filteredUsers: Users[] = [];
  selectedUserIds: number[] = [];
  searchText: string = '';

  constructor(private service: ICEServiceService<Users>) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.service.getAllUsers().subscribe((data) => {
      this.usersList = data;
      this.filteredUsers = [...this.usersList];
    });
  }

  searchUsers(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchText = target.value.trim().toLowerCase();
    this.filteredUsers = this.usersList.filter(
      (user) =>
        user.username && user.username.toLowerCase().includes(this.searchText)
    );
  }

  toggleSelection(userId: number | undefined): void {
    if (userId !== undefined) {
      const index = this.selectedUserIds.indexOf(userId);
      if (index === -1) {
        this.selectedUserIds.push(userId);
      } else {
        this.selectedUserIds.splice(index, 1);
      }
    }
  }

  deleteSelectedUsers(): void {
    if (confirm('Are you sure you want to delete selected users?')) {
      this.selectedUserIds.forEach((userId) => {
        this.service.deleteByUsersId(userId).subscribe(() => {
          this.usersList = this.usersList.filter(
            (user) => user.userId !== userId
          );
          this.filteredUsers = this.filteredUsers.filter(
            (user) => user.userId !== userId
          );
        });
      });
      this.selectedUserIds = [];
    }
  }
}
