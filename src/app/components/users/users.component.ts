// users.component.ts

import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/Users';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usersList: Users[] = [];
  usersForm: FormGroup;
  selectedEntityId: number | null = null;
  filteredUsers: Users[] = []; // Array to store filtered users


  constructor(private service: ICEServiceService<Users>) {
    this.usersForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.service.getAllUsers().subscribe((data) => {
      this.usersList = data;
      this.filteredUsers = [...this.usersList]; // Initialize filteredUsers with all users
    });
  }

  create(): void {
    this.service.createUser(this.usersForm.value).subscribe((response) => {
      this.getAllUsers();
    });
  }

  deleteUser(userId: number): void {
    this.service.deleteByUsersId(userId).subscribe(
      () => {
        this.getAllUsers();
        this.usersList = this.usersList.filter(
          (user) => user.userId !== userId
        );
        this.selectedEntityId = null;
      },
      (error) => {
        console.error('Error deleting entity:', error);
      }
    );
  }

  edit(user: Users): void {
    // Implement edit functionality here
  }

  // Method to filter users based on search query
  searchUsers(event: Event): void {
    const target = event.target as HTMLInputElement;
    const query = target ? target.value?.trim() : '';

    if (query === '') {
      // If the query is empty, show all users
      this.filteredUsers = [...this.usersList];
    } else {
      // Otherwise, filter users based on the query
      this.filteredUsers = this.usersList.filter((user) => {
        // Perform null check before accessing the username property
        if (user.username) {
          return user.username.toLowerCase().includes(query.toLowerCase());
        }
        return false; // Return false if username is undefined
      });
    }
  }
}
