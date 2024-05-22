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
  filteredUsers: Users[] = [];
  userForm: FormGroup;
  editingUser: Users | null = null;
  isFormVisible: boolean = false;
  searchText: string = '';

  constructor(private service: ICEServiceService<Users>) {
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
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

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.cancelEdit(); // Reset form if hiding the form
    }
  }

  create(): void {
    if (this.userForm.valid) {
      this.service.createUser(this.userForm.value).subscribe((response) => {
        this.getAllUsers(); // Refresh user list
        this.userForm.reset(); // Clear form
      });
    }
  }

  deleteUser(userId: number | undefined): void {
    if (userId !== undefined) {
      this.service.deleteByUsersId(userId).subscribe(() => {
        this.getAllUsers(); // Refresh user list
        this.cancelEdit();
      });
    } else {
      console.error('Invalid user ID');
    }
  }

  editUser(user: Users): void {
    this.editingUser = user;
    this.userForm.patchValue({
      username: user.username,
      email: user.email,
      password: user.password,
    });
    this.isFormVisible = true; // Show the form
  }

  saveUser(): void {
    if (this.userForm.valid) {
      const username = this.userForm.value.username;
      const email = this.userForm.value.email;
      const password = this.userForm.value.password;

      if (this.editingUser) {
        const updatedUser: Users = {
          ...this.editingUser,
          username: username,
          email: email,
          password: password,
        };

        // Call the service's updateUser method
        this.service.updateUser(updatedUser).subscribe(() => {
          this.getAllUsers(); // Refresh user list
          this.cancelEdit();
        });
      } else {
        this.create(); // Call the create method for new user
      }
    }
  }

  cancelEdit(): void {
    this.editingUser = null;
    this.userForm.reset();
    this.isFormVisible = false; // Close the form
  }

  searchUsers(): void {
    this.filteredUsers = this.usersList.filter(
      (user) =>
        user.username &&
        user.username.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
