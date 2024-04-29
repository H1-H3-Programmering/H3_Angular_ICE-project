import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/Users';
import { ICEServiceService } from '../../services/ice-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  usersList: Users[] = [];
  usersForm: FormGroup;

  ngOnInit(): void {
    this.service.getAllUsers().subscribe((data) => {
      this.usersList = data;
      console.log(data);
    });
  }

  create(): void {
    console.log(this.usersForm.value);
    console.log(this.usersForm.value.username);
    // Call the service method to create a user
    this.service.createUser(this.usersForm.value).subscribe((response) => {
      console.log('User created successfully:', response);
      // Optionally, you can refresh the user list after creation
      this.service.getAllUsers();
    });
  }

  constructor(private service: ICEServiceService<Users>) {

    this.usersForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
}
