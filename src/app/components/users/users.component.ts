import { Component } from '@angular/core';
import { Users } from '../../models/Users';
import { ICEServiceService } from '../../services/ice-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  usersList: Users[] = [];

  ngOnInit(): void {
    this.service.getAllUsers().subscribe((data) => {
      this.usersList = data;
      console.log(data);
    });
  }

  constructor(private service: ICEServiceService) {}
}
