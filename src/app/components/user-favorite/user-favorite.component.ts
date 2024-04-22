import { Component } from '@angular/core';
import { UserFavorite } from '../../models/UserFavorite';
import { ICEServiceService } from '../../services/ice-service.service';

@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrl: './user-favorite.component.css',
})
export class UserFavoriteComponent {
  userFavoriteList: UserFavorite[] = [];

  ngOnInit(): void {
    this.service.getAllUserFavorites().subscribe((data) => {
      this.userFavoriteList = data;
      console.log(data);
    });
  }

  constructor(private service: ICEServiceService<UserFavorite>) {}
}
