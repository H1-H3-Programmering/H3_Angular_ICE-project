import { Component } from '@angular/core';
import { Kitchen } from '../../models/Kitchen';
import { ICEServiceService } from '../../services/ice-service.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css',
})
export class KitchenComponent {
  kitchenList: Kitchen[] = [];

  ngOnInit(): void {

    this.service.getAllKitchens().subscribe(data=>{
      this.kitchenList=data;
      console.log(data)
    });
  }

  constructor(private service: ICEServiceService) {}
}
