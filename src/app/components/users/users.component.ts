import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/Users';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  usersList: Users[] = [];
  usersForm: FormGroup;
  selectedEntityId: number | null = null;

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
      console.log(data);
    });
    };

  create(): void {
    console.log(this.usersForm.value);
    console.log(this.usersForm.value.username);
    // Call the service method to create a user
    this.service.createUser(this.usersForm.value).subscribe((response) => {
      console.log('User created successfully:', response);
      // Optionally, you can refresh the user list after creation
      this.getAllUsers();
    });
  }

  confirmDelete(): void {
    if (this.selectedEntityId !== null) {
      // Call the deleteById method with the selectedEntityId
      this.service.deleteByUsersId(this.selectedEntityId).subscribe(
        () => {
          console.log('Entity deleted successfully');
          this.getAllUsers();
          // Optionally, update the categoryList after deletion
          this.usersList = this.usersList.filter(
            (user) => user.userId !== this.selectedEntityId
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
